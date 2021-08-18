const axios = require("axios");

const getConfiguration = async (env) => {
  let token = env.E2E_ACCESS_TOKEN_LOCAL;
  const featureToggleEndpoint = process.env.FEATURE_TOGGLE_ENDPOINT;

  url = `${featureToggleEndpoint}/configuration?types=MMH`;

  if (env.ENVIRONMENT === "development") {
    token = env.E2E_ACCESS_TOKEN_DEV;
  }

  if (env.ENVIRONMENT === "staging") {
    token = env.E2E_ACCESS_TOKEN_STAGING;
    // url = `https://4arxz3ei3a.execute-api.eu-west-2.amazonaws.com/staging/api/v1/configuration?types=MMH`;
  }

  if (env.ENVIRONMENT === "production") {
    token = env.E2E_ACCESS_TOKEN_PROD;
    // url = `https://a9nuohv61k.execute-api.eu-west-2.amazonaws.com/development/api/v1/configuration?types=MMH`;
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
