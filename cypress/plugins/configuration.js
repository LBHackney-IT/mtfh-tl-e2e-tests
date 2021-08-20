const axios = require("axios");

const getConfiguration = async (env) => {
  let token = env.E2E_ACCESS_TOKEN_LOCAL;
  const featureToggleEndpoint = process.env.FEATURE_TOGGLE_ENDPOINT;

  url = `${featureToggleEndpoint}/api/v1/configuration?types=MMH`;

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
    },
  });

  let featureToggleStore = {};

  response.data.forEach(({ type, featureToggles }) => {
    featureToggleStore = {
      ...featureToggleStore,
      [type]: { ...featureToggles },
    };
  });

  return featureToggleStore;
};

module.exports = {
  getConfiguration,
};
