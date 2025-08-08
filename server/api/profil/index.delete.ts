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
    event.node.res.statusCode = 401
    return { error: 'Token d’authentification manquant' }
  }

  const token = authHeader.slice(7)

  let userId: number
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET))
    userId = payload.id as number
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Token invalide' })
  }

  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' })
  }

  try {
    // 3. Suppression de l'utilisateur
    const result = await sql`
        DELETE FROM utilisateurs
        WHERE id = ${userId}
        RETURNING *
      `

    // 4. Vérification si l'utilisateur existait
    if (result.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Profil non trouvé' })
    }

    // 5. Réponse de succès
    return { message: 'Profil supprimé avec succès', id: result[0].id }
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la suppression',
    })
  } finally {
    // 6. Fin propre de la connexion
    event.waitUntil(sql.end())
  }
})
