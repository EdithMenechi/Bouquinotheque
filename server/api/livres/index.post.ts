export default defineEventHandler(async (event) => {

    const sql = usePostgres()
    const body = await readBody(event)
  
    const { titre } = body

    if (!titre) {
        throw createError({ statusCode: 400, statusMessage: "Titre manquant"})
    }
        
    const newBook = await sql
        
    `
    INSERT INTO livres (titre)
    VALUES (${titre})
    RETURNING id
    `
  
    const livreId = newBook[0]?.id

    event.waitUntil(sql.end())
    return { success: true, id: livreId }
  })