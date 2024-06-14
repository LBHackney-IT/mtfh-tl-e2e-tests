/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { fetchFeatureToggleConfiguration } = require("./feature-toggle-config")
const { setEnvironmentConfig } = require("./environment-config")

module.exports = async (on, config) => {
  config.featureToggles = (await fetchFeatureToggleConfiguration(config.env)) || {};
  config = setEnvironmentConfig(on, config);
  config = require('@cypress/grep/src/plugin')(config);

  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  const bundler = createBundler({
    // any ESBuild options here
    // https://esbuild.github.io/api/
    define: {
        "global": "window"
    },
  })
  on('file:preprocessor', bundler)

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
