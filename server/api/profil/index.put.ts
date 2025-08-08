import { defineEventHandler } from 'h3'
import { jwtVerify } from 'jose'
import { useRuntimeConfig } from '#imports'
import { usePostgres } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
  // 1. Chargement de la configuration et initialisation de la BDD
  const config = useRuntimeConfig()
  const SECRET = config.JWT_SECRET
  const sql = usePostgres()

  // 2. Authentification
  const authHeader = getRequestHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token d’authentification manquant',
    })
  }

  const token = authHeader.slice(7)

  let userId: number
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET))
    userId = payload.id as number
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Token invalide' })
  }

  // 3. Lecture du corps de la requête
  const body = await readBody(event)
  const { name, email } = body

  // 4. Vérification de l’ID
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' })
  }

  try {
    // 5. Mise à jour du profil utilisateur
    const result = await sql`
        UPDATE utilisateurs
            SET nom = ${name},
                email = ${email}
        WHERE id = ${userId}
        RETURNING *
        `

    // 6. Vérification que l'utilisateur existe
    if (result.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Profil non trouvé' })
    }

    // 7. Réponse de succès
    return result[0]
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour',
    })
  } finally {
    // 8. Fin propre de la connexion
    event.waitUntil(sql.end())
  }
})
