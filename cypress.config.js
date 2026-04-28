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
    openMode: 2,
  },
  chromeWebSecurity: false,
  video: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/*.cy.js',
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 25,
    supportFile: 'cypress/support/e2e.js',
    env: {
        // While 'grepFilterSpecs' gives performance boost by preventing the load of specs,
        // it's not compatible with the exclusion pattern 'inverted filters' (see cypress grep docs for more info) 
        //grepFilterSpecs: true,
        grepOmitFiltered: true
    }
  },
})