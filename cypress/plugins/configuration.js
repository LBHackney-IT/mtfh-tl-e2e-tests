const axios = require("axios");
const url = `https://a9nuohv61k.execute-api.eu-west-2.amazonaws.com/development/api/v1/configuration?types=MMH`;

const getConfiguration = async (env) => {
  let token = env.E2E_ACCESS_TOKEN_LOCAL;

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
