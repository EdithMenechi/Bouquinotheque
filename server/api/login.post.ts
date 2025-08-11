import { defineEventHandler, readBody } from 'h3'
import { SignJWT } from 'jose'
import * as bcrypt from 'bcrypt'
import { useRuntimeConfig } from '#imports'
import { usePostgres } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
  // 1. Chargement de la configuration et initialisation de la BDD
  const config = useRuntimeConfig()
  const SECRET = config.JWT_SECRET
  const sql = usePostgres()

  // 2. Lecture du corps de la requête
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email et mot de passe requis',
    })
  }

  // 3. Recherche de l'utilisateur
  const [user] = await sql`
    SELECT 
      id, 
      nom AS name, 
      email, 
      mot_de_passe AS password
    FROM utilisateurs
    WHERE email = ${email}
  `
  await sql.end()

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Utilisateur non trouvé',
    })
  }

  // 4. Vérification du mot de passe
  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Mot de passe incorrect',
    })
  }

  // 5. Génération du token JWT
  const secretKey = new TextEncoder().encode(SECRET)

  const token = await new SignJWT({
    id: user.id,
    nom: user.name,
    email: user.email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secretKey)

  // 6. Réponse avec le token et les infos utilisateur
  return {
    token,
    user: {
      id: user.id,
      nom: user.name,
      email: user.email,
    },
  }
})
