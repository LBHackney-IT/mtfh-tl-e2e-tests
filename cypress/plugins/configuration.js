const axios = require("axios");
let url = "";

const getConfiguration = async (env) => {
  let token = env.E2E_ACCESS_TOKEN_LOCAL;
  url = `https://a9nuohv61k.execute-api.eu-west-2.amazonaws.com/development/api/v1/configuration?types=MMH`;

  if (env.ENVIRONMENT === "development") {
    token = env.E2E_ACCESS_TOKEN_DEV;
  }

  if (env.ENVIRONMENT === "staging") {
    token = env.E2E_ACCESS_TOKEN_STAGING;
    url = `https://4arxz3ei3a.execute-api.eu-west-2.amazonaws.com/staging/api/v1/configuration?types=MMH`;
  }

  if (env.ENVIRONMENT === "production") {
    token = env.E2E_ACCESS_TOKEN_PROD;
    url = `https://ngg28gmp69.execute-api.eu-west-2.amazonaws.com/production/api/v1/configuration?types=MMH`;
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