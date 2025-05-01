import { defineEventHandler } from 'h3'
import { getLivres } from '~/server/database/livres'

export default defineEventHandler(async () => {
  const livres = await getLivres()
  return livres
})