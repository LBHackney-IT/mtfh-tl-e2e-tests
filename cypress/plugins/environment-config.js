const { fetchCognitoToken, cognitoFlowEnabled } = require("./cognito-helper");
const { resolveLegacyToken } = require("./legacy-auth");

const setEnvironmentConfig = async (on, config) => {
  // setting page paths
  config.searchUrl = "search";
  config.personUrl = "person";
  config.personCommentsUrl = "comment/person";
  config.tenureCommentsUrl = "comment/tenure";
  config.propertyCommentsUrl = "comment/property";
  config.startSoleToJointProcessUrl = "processes/soletojoint/start/tenure";
  config.alertPreviewUrl = "cautionary-alerts/alert";
  config.relatedAssetUrl = "property/related";
  config.tenureUrl = "tenure";
  config.property = "property";

  const environment = config.env.ENVIRONMENT;
  const isCognitoFlow = cognitoFlowEnabled(config.env);
  // Use CYPRESS_E2E_BASE_URL (not reserved CYPRESS_BASE_URL) so the value lands in
  // config.env, then copy it onto Cypress config.baseUrl for cy.visit / cy.request.
  const baseUrl = config.env.E2E_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "E2E_BASE_URL is required. Set CYPRESS_E2E_BASE_URL (e.g. via setEnv.sh / SSM e2e-base-url).",
    );
  }

  console.log(
    `Tests are running using the ${isCognitoFlow ? "Cognito" : "Legacy"} flow.`,
  );

  config.baseUrl = baseUrl;
  config.gssoTestKey = isCognitoFlow
    ? await fetchCognitoToken(config.env)
    : resolveLegacyToken(config.env, environment);
  config.isCognitoFlow = isCognitoFlow;

  return config;
};

module.exports = {
  setEnvironmentConfig,
};
