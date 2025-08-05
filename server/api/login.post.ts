import { defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { SignJWT } from 'jose'
import * as bcrypt from 'bcrypt'
import { usePostgres } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const SECRET = config.JWT_SECRET

    const body = await readBody(event)
    const { email, mot_de_passe } = body

    if (!email || !mot_de_passe) {
      return { error: 'Email et mot de passe requis' }
    }

    const sql = usePostgres()

    const [utilisateur] = await sql`
    SELECT * FROM utilisateurs WHERE email = ${email}
  `
    await sql.end()

    if (!utilisateur) {
      return { error: 'Utilisateur non trouvé' }
    }

    const valid = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe)

    if (!valid) {
      return { error: 'Mot de passe incorrect' }
    }

    const secretKey = new TextEncoder().encode(SECRET)

    const token = await new SignJWT({
      id: utilisateur.id,
      email: utilisateur.email
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secretKey)

    return {
      token,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email
      }
    }
})