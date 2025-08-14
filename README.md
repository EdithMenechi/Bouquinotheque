# Bouquinothèque
Appli de répertoire de livres et leur rangement

vitest : npm install -D vitest @vue/test-utils @testing-library/vue @testing-library/jest-dom
npm install -D @types/testing-library__jest-dom
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

dans le terminal :
pour lancer tous les tests unitaires : npm run test:unit
pour lancer un fichier test : npm run test:unit:file -- tests/vitest/**.test.ts (chemin relatif du fichier)


cypress : npm install -D cypress

Ensuite :

npx cypress open

dans package.json :  "test:unit": "vitest",
    "test:e2e": "cypress open",
    "stop:cypress": "pkill -f Cypress || true"
