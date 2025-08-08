import { defineEventHandler, createError } from 'h3'
import { usePostgres } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
  // 1. Initialisation de la connexion à la BDD
  const sql = usePostgres()

  // 2. Récupération de l'ID du livre à modifier
  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' })
  }

  // 3. Lecture du corps de la requête
  const body = await readBody(event)
  const { title, subtitle, tome, isbn } = body

  try {
    // 4. Modification du livre
    const result = await sql`UPDATE livres
       SET titre = ${title},
          sous_titre = ${subtitle},
          tome = ${tome},
          isbn = ${isbn}
      WHERE id = ${id}
      RETURNING *
        `

    // 5. Vérification si le livre existait
    if (result.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Livre non trouvé' })
    }

    // 5. Réponse de succès
    return result[0]
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour',
    })
  } finally {
    // 7. Fermeture propre de la connexion
    event.waitUntil(sql.end())
  }
})
