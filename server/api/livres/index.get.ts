export default defineEventHandler(async (event) => {

  const sql = usePostgres()

  const books = await sql
  `
  SELECT
      l.*,
      (SELECT
          array_agg(a.nom)
          FROM auteurs a
          LEFT JOIN livres_auteurs la ON a.id = la.id_auteur
          WHERE la.id_livre = l.id
       ) as auteurs,
      f.format
  FROM livres l
  LEFT JOIN formats f ON l.format_id = f.id
  ORDER BY l.id
  `

  event.waitUntil(sql.end())
  return books
})