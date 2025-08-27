import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'tests/cypress/e2e/**/*.cy.js',
    fixturesFolder: 'tests/cypress/fixtures',
    supportFile: 'tests/cypress/support/e2e.ts',
    videosFolder: 'tests/cypress/videos',
    screenshotsFolder: 'tests/cypress/screenshots',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
