const axios = require("axios");

const fetchFeatureToggleConfiguration = async (config) => {
  const featureToggleEndpoint = config.env.FEATURE_TOGGLE_ENDPOINT;
  const token = config.gssoTestKey;
  const url = `${featureToggleEndpoint}/api/v1/configuration?types=MMH`;

  console.log(`Checking feature toggle config at ${url}`);

  const response = await axios.get(encodeURI(url), {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-hackney-user": token,
    },
  });

  let featureToggleStore = {};

  response.data.forEach(({ type, ...toggleConfig }) => {
    featureToggleStore = {
      ...featureToggleStore,
      [type]: { ...toggleConfig },
    };
  });

  console.log("Current feature toggle config is set to:", featureToggleStore);
  return featureToggleStore;
};

module.exports = {
  fetchFeatureToggleConfiguration,
};
