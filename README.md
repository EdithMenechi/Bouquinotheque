# Bouquinothèque
Appli de répertoire de livres et leur rangement

vitest : npm install -D vitest @vue/test-utils @testing-library/vue @testing-library/jest-dom
Puis dans nuxt.config.ts :

export default defineNuxtConfig({
  test: {
    globals: true, // permet d'utiliser describe, it, expect sans import
    environment: 'jsdom' // simule un navigateur
  }
})

Dans vitest.setup.ts (à créer à la racine du projet) :

import '@testing-library/jest-dom'

Et dans nuxt.config.ts :

test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './vitest.setup.ts'
}


cypress : npm install -D cypress

Ensuite :

npx cypress open

dans package.json :  "test:unit": "vitest",
    "test:e2e": "cypress open",
    "stop:cypress": "pkill -f Cypress || true"
