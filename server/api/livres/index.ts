export default defineEventHandler(async (event) => {

  const sql = usePostgres()

  const books = await sql`SELECT * FROM livres`

  // Ensure the database connection is closed after the request is processed
  event.waitUntil(sql.end())
  return books
})