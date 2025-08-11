import { defineEventHandler, createError } from 'h3'
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
    event.node.res.statusCode = 401
    return { error: 'Token invalide' }
  }

  // 3. Récupération de l'ID du livre à supprimer
  const bookId = event.context.params?.id

  if (!bookId) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' })
  }

  try {
    // 4. Suppression du livre de la table utilisateurs_livres
    const result = await sql`
        DELETE 
        FROM utilisateurs_livres
        WHERE utilisateur_id = ${userId} AND livre_id = ${bookId}
        RETURNING *
      `

    // 5. Vérification si le livre existait
    if (result.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Livre non trouvé' })
    }

    // 6. Réponse de succès
    return { message: 'Livre supprimé avec succès', id: result[0].id }
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la suppression',
    })
  } finally {
    // 7. Fin propre de la connexion
    event.waitUntil(sql.end())
  }
})
