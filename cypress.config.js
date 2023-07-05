const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  lighthouse: {
    performance: 0,
    accessibility: 0,
    'best-practices': 0,
    seo: 0,
    pwa: 0,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  chromeWebSecurity: false,
  video: true,
  projectId: 'fg82nr',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{feature,features}',
  },
})
