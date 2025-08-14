import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', // pour tester le front Vue, sinon 'node' pour backend uniquement
    globals: true,
    setupFiles: './vitest.setup.ts', // si tu as un fichier de setup
  },
})
