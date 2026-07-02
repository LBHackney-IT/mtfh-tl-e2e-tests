/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { fetchFeatureToggleConfiguration } = require('./feature-toggle-config');
const { setEnvironmentConfig } = require('./environment-config');
const { loadEnv, validateEnv } = require('./load-env');
const { registerDynamoDbTasks } = require('./dynamoDb-tasks');
const { registerAuditPlugin } = require('./audit-plugin');

module.exports = async (on, config) => {
  let runtimeConfig = config;

  config = await setEnvironmentConfig(on, config);
  config = loadEnv(config);
  validateEnv(config);
  runtimeConfig = config;

  registerDynamoDbTasks(on, () => runtimeConfig);

  config.featureToggles = (await fetchFeatureToggleConfiguration(config)) || {};
  const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin');
  config = cypressGrepPlugin(config);

  registerAuditPlugin(on);

  const bundler = createBundler({
    define: {
      global: 'window',
    },
  });
  on('file:preprocessor', bundler);

  on('task', {
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
