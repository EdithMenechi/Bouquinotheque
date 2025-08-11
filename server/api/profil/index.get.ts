import { defineEventHandler, getHeader, createError } from 'h3'
import { jwtVerify } from 'jose'
import { useRuntimeConfig } from '#imports'
import { usePostgres } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
  // 1. Chargement de la configuration et initialisation de la BDD
  const config = useRuntimeConfig()
  const SECRET = config.JWT_SECRET
  const sql = usePostgres()

  // 2. Authentification
  const authHeader = getHeader(event, 'authorization')
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
    throw createError({ statusCode: 401, statusMessage: 'Token invalide' })
  }

  // 3. Récupération de l'utilisateur
  const profile = await sql`
  SELECT
    id,
    nom   AS name,
    email
  FROM utilisateurs WHERE id = ${userId} LIMIT 1
  `

  if (!profile || profile.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Utilisateur non trouvé',
    })
  }

  // 5. Fin propre de la connexion
  event.waitUntil(sql.end())

  // 6. Réponse
  return profile[0]
})
