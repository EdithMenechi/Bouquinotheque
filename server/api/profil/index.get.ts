import { defineEventHandler, getHeader, createError } from 'h3'
import { jwtVerify } from 'jose'
import { usePostgres } from '~/server/utils/postgres'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const SECRET = config.JWT_SECRET
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

  const sql = usePostgres()

  const profil = await sql`
  SELECT * FROM utilisateurs WHERE id = ${userId} LIMIT 1
  `

  if (!profil || profil.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Utilisateur non trouvé',
    })
  }

  return profil[0]
})
