/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

// dotenv.config()

const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });
  on('file:preprocessor', cucumber())
  on('task', {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log(lighthouseReport);
    }),
    pa11y: pa11y((pa11yReport) => {
      console.log(pa11yReport);
    }),
    log(message) {
      console.log(message)

      return null
    },
    table(message) {
      console.table(message)

      return null
    }
  })
  return config
}