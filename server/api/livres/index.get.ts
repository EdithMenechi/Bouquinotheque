import { defineEventHandler, getHeader, H3Event } from 'h3'
import { jwtVerify } from 'jose'
import { usePostgres } from '~/server/utils/postgres'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const SECRET = config.JWT_SECRET
  const authHeader = getRequestHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    event.node.res.statusCode = 401
    return { error: 'Token d’authentification manquant' }
  }

  const token = authHeader.slice(7) // retirer 'Bearer '

  let userId: number
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET))
    userId = payload.id as number
  } catch (err) {
    event.node.res.statusCode = 401
    return { error: 'Token invalide' }
  }

  const sql = usePostgres()

  const books = await sql
  `
  SELECT
      l.*,
      (SELECT
          array_agg(a.nom)
          FROM auteurs a
          LEFT JOIN livres_auteurs la ON a.id = la.auteur_id
          WHERE la.livre_id = l.id
       ) as auteurs,
      f.format
  FROM livres l
  LEFT JOIN formats f ON l.format_id = f.id
  INNER JOIN utilisateurs_livres ul ON ul.livre_id = l.id
  WHERE ul.utilisateur_id = ${userId}
  ORDER BY l.id
  `

  event.waitUntil(sql.end())
  return books
})