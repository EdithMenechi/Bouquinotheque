import { defineEventHandler, createError } from 'h3'
import { usePostgres } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
  // 1. Initialisation de la connexion à la BDD
  const sql = usePostgres()

  // 2. Récupération de l'ID du livre à supprimer
  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' })
  }

  // 3. Lecture du corps de la requête
  try {
    // 4. Suppression du livre
    const result = await sql`
        DELETE FROM livres
        WHERE id = ${id}
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
