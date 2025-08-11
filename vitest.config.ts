import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // pour tester le front Vue, sinon 'node' pour backend uniquement
    globals: true,
    setupFiles: './vitest.setup.ts', // si tu as un fichier de setup
  },
})
