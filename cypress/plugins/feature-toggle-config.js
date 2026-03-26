const axios = require("axios");
const { fetchCognitoToken } = require("./cognito-helper");

const fetchFeatureToggleConfiguration = async (config) => {
  const env = config.env;
  console.log(">> Enter 'fetchFeatureToggleConfiguration'.");
  let token = env.E2E_ACCESS_TOKEN_LOCAL;
  const featureToggleEndpoint = env.FEATURE_TOGGLE_ENDPOINT;

  url = `${featureToggleEndpoint}/api/v1/configuration?types=MMH`;
  console.log(`>> Checking feature toggle config at ${url}`)

  if (env.ENVIRONMENT === "development") {
    console.log(">> Old token", token?.slice(0,10) || "null local token");
    token = config.gssoTestKey;
    console.log(">> New token", token.slice(0,10));
  }

  if (env.ENVIRONMENT === "staging") {
    token = env.E2E_ACCESS_TOKEN_STAGING;
  }

  if (env.ENVIRONMENT === "production") {
    token = env.E2E_ACCESS_TOKEN_PRODUCTION;
  }

  console.log(">> Making feature flags fetch request.");
  const response = await axios.get(encodeURI(url), {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-hackney-user": token
    },
  });

  let featureToggleStore = {};

  response.data.forEach(({ type, ...config }) => {
    featureToggleStore = {
      ...featureToggleStore,
      [type]: { ...config },
    };
  });

  console.log('>> Current feature toggle config is set to:', featureToggleStore)
  console.log(">> Exit 'fetchFeatureToggleConfiguration'.");
  return featureToggleStore;
};

module.exports = {
  fetchFeatureToggleConfiguration,
};
