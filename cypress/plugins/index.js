/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const cucumber = require("cypress-cucumber-preprocessor").default;
const { getConfiguration } = require("./configuration");
const endpoint = Cypress.env('FEATURE_TOGGLE_ENDPOINT')

module.exports = async (on, config) => {
  config.featureToggles = (await getConfiguration(config.env, endpoint)) || {};
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
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
