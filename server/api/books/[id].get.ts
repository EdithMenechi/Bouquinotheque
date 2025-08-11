import { defineEventHandler } from 'h3'
import { usePostgres } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
  // 1. Initialisation de la connexion à la BDD
  const sql = usePostgres()
  const { id } = getRouterParams(event)

  // 2. Récupération du livre
  const book = await sql`
  SELECT
    l.id,
    l.titre        AS title,
    l.sous_titre   AS subtitle,
    l.tome         AS volume,
    l.isbn         AS isbn,
    (SELECT array_agg(a.nom)
        FROM auteurs a
        LEFT JOIN livres_auteurs la ON a.id = la.auteur_id
        WHERE la.livre_id = l.id
    )               AS authors,
    f.format        AS format
  FROM livres l
  LEFT JOIN formats f ON l.format_id = f.id
  WHERE l.id = ${id}
  `

  // 3. Fin propre de la connexion
  event.waitUntil(sql.end())

  // 4. Réponse
  return book[0] || null
})
