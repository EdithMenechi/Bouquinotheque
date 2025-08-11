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

  // 3. Récupération des livres
  const books = await sql`
    SELECT
      l.id,
      l.titre        AS title,
      l.sous_titre   AS subtitle,
      l.tome         AS volume,
      (SELECT array_agg(a.nom)
          FROM auteurs a
          LEFT JOIN livres_auteurs la ON a.id = la.auteur_id
          WHERE la.livre_id = l.id
      )               AS authors,
      f.format        AS format,
      ul.utilisateur_id AS user_id
    FROM livres l
    LEFT JOIN formats f ON l.format_id = f.id
    INNER JOIN utilisateurs_livres ul ON ul.livre_id = l.id
    WHERE ul.utilisateur_id = ${userId}
    ORDER BY l.id
    `

  // 4. Fin propre de la connexion
  event.waitUntil(sql.end())

  // 5. Réponse
  return books
})
