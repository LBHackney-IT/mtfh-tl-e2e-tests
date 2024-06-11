/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const webpack = require("@cypress/webpack-preprocessor");
const { getConfiguration } = require("./configuration")
const fs = require('fs')

module.exports = async (on, config) => {
  // config.featureToggles = (await getConfiguration(config.env)) || {};
  // on("before:browser:launch", (browser = {}, launchOptions) => {
  // // prepareAudit(launchOptions);
  // });

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [],
        },
      },
    })
  );

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
