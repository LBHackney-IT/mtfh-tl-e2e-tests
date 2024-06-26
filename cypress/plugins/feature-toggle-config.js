const axios = require("axios");

const fetchFeatureToggleConfiguration = async (env) => {
  let token = env.E2E_ACCESS_TOKEN_LOCAL;
  const featureToggleEndpoint = env.FEATURE_TOGGLE_ENDPOINT;

  url = `${featureToggleEndpoint}/api/v1/configuration?types=MMH`;
  console.log(`Checking feature toggle config at ${url}`)

  if (env.ENVIRONMENT === "development") {
    token = env.E2E_ACCESS_TOKEN_DEV;
  }

  if (env.ENVIRONMENT === "staging") {
    token = env.E2E_ACCESS_TOKEN_STAGING;
  }

  if (env.ENVIRONMENT === "production") {
    token = env.E2E_ACCESS_TOKEN_PROD;
  }

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

  console.log('Current feature toggle config is set to:', featureToggleStore)
  return featureToggleStore;
};

module.exports = {
  fetchFeatureToggleConfiguration,
};
