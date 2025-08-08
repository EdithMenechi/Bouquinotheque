import { defineEventHandler } from 'h3'
import { jwtVerify } from 'jose'
import { usePostgres } from '~/server/utils/postgres'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const SECRET = config.JWT_SECRET
  const authHeader = getRequestHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    event.node.res.statusCode = 401
    return { error: 'Token d’authentification manquant' }
  }

  const token = authHeader.slice(7)

  const sql = usePostgres()
  const body = await readBody(event)
  let userId: number
  const { nom, email } = body

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET))
    userId = payload.id as number
  } catch (err) {
    event.node.res.statusCode = 401
    return { error: 'Token invalide' }
  }

  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' })
  }

  try {
    const result = await sql`
        UPDATE utilisateurs
            SET nom = ${nom},
                email = ${email}
        WHERE id = ${userId}
        RETURNING *
        `

    if (result.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Profil non trouvé' })
    }

    return result[0]
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour',
    })
  }
})
