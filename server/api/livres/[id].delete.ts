export default defineEventHandler(async (event) => {

    const sql = usePostgres()
    const id = event.context.params?.id
  
    if (!id) {
        throw createError({ statusCode: 400, statusMessage: "ID manquant" })
    }
    
    try {
        const result = await sql`
        DELETE FROM livres
        WHERE id = ${id}
        RETURNING *
      `
        
      if (result.length === 0) {
        throw createError({ statusCode: 404, statusMessage: "Livre non trouvé" })
      }
  
      return { message: 'Livre supprimé avec succès', id: result[0].id }
    } catch (error) {
      console.error(error)
      throw createError({ statusCode: 500, statusMessage: "Erreur lors de la suppression" })
    } finally {
      event.waitUntil(sql.end())
    }
  })