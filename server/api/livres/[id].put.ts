export default defineEventHandler(async (event) => {
  const sql = usePostgres()
  const body = await readBody(event)
  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' })
  }

  const { titre, sous_titre, tome, isbn } = body

  try {
    const result = await sql`UPDATE livres
       SET titre = ${titre},
          sous_titre = ${sous_titre},
          tome = ${tome},
          isbn = ${isbn}
      WHERE id = ${id}
      RETURNING *
        `

    if (result.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Livre non trouvé' })
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
