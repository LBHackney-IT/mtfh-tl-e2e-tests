/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const cucumber = require("cypress-cucumber-preprocessor").default;
const { getConfiguration } = require("./configuration")
const fs = require('fs')


module.exports = async (on, config) => {
  // config.featureToggles = (await getConfiguration(config.env)) || {};
  // on("before:browser:launch", (browser = {}, launchOptions) => {
  // // prepareAudit(launchOptions);
  // });
  on('task', {
    writeTenureTestFile(id) {

      fs.writeFileSync('./cypress/fixtures/tenureTestData.txt', id)
      return null;

      // if (fs.existsSync(id)) {
      //   return fs.writeFileSync('./cypress/fixtures/tenureTestData.txt', id)
      // }

    },
});

  on("file:preprocessor", cucumber());
  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log(lighthouseReport);
    }),
    pa11y: pa11y((pa11yReport) => {
      console.log(pa11yReport);
    }),
    log(message) {
      console.log(message);

      return null;
    },
    table(message) {
      console.table(message);

      return null;
    },
  });
  return config;
};

