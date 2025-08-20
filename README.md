# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Bouquinothèque

Appli de répertoire de livres et leur rangement

vitest : npm install -D vitest @vue/test-utils @testing-library/vue @testing-library/jest-dom
npm install -D @types/testing-library\_\_jest-dom
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
pour lancer un fichier test : npm run test:unit:file -- \*\*.test.ts (nom du fichier)

cypress : npm install -D cypress

Ensuite :

npx cypress open

dans package.json : "test:unit": "vitest",
"test:e2e": "cypress open",
"stop:cypress": "pkill -f Cypress || true"

npm install isbn3 : check validité de l'isbn

/!\ ci : push désactivé
