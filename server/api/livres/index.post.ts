import { defineEventHandler, getHeader, createError, readBody } from 'h3'
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

  // 3. Lecture du corps de la requête
  const body = await readBody(event)
  const { title } = body

  if (!title) {
    throw createError({ statusCode: 400, statusMessage: 'Titre manquant' })
  }

  // 4. Insertion du livre
  const newBook = await sql`
    INSERT INTO livres (titre)
    VALUES (${title})
    RETURNING id
  `

  const bookId = newBook[0]?.id
  if (!bookId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Échec lors de la création du livre',
    })
  }

  // 5. Insertion dans la table de liaison
  await sql`
    INSERT INTO utilisateurs_livres (utilisateur_id, livre_id)
    VALUES (${userId}, ${bookId})
  `

  // 6. Fin propre de la connexion
  event.waitUntil(sql.end())

  // 7. Réponse
  return { success: true, id: bookId }
})
