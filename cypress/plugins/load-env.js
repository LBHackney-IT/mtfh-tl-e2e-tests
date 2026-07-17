const { cognitoFlowEnabled } = require('./cognito-helper');

const ENDPOINT_KEYS = [
  'ASSET_ENDPOINT',
  'HOUSE_SEARCH_ENDPOINT',
  'CONTACT_DETAILS_ENDPOINT',
  'EQUALITY_DETAILS_ENDPOINT',
  'PERSON_ENDPOINT',
  'TENURE_ENDPOINT',
  'CAUTIONARY_ALERT_ENDPOINT',
  'FEATURE_TOGGLE_ENDPOINT',
  'REFERENCE_DATA_ENDPOINT',
  'COMMENTS_ENDPOINT',
];

const SECRET_KEYS = [
  'E2E_ACCESS_TOKEN_DEVELOPMENT',
  'E2E_ACCESS_TOKEN_STAGING',
  'E2E_ACCESS_TOKEN_PRODUCTION',
  'E2E_CLIENT_ID',
  'E2E_USERNAME',
  'E2E_PASSWORD',
];

function loadEnv(config) {
  config.expose = { ...(config.expose || {}) };

  for (const key of ENDPOINT_KEYS) {
    const value = config.env[key];
    if (value) {
      config.expose[key] = value;
    }
  }

  return config;
}

function validateEnv(config) {
  const environment = config.env.ENVIRONMENT;

  if (!environment) {
    throw new Error(
      'ENVIRONMENT is required. Set CYPRESS_ENVIRONMENT (e.g. via setEnv.sh).',
    );
  }

  if (!config.env.E2E_BASE_URL) {
    throw new Error(
      'E2E_BASE_URL is required. Set CYPRESS_E2E_BASE_URL (e.g. via setEnv.sh / SSM e2e-base-url).',
    );
  }

  const missingEndpoints = ENDPOINT_KEYS.filter(
    (key) => key !== 'REFERENCE_DATA_ENDPOINT' && key !== 'COMMENTS_ENDPOINT' && !config.env[key],
  );

  if (missingEndpoints.length > 0) {
    throw new Error(
      `Missing required API endpoints: ${missingEndpoints.join(', ')}. ` +
        'Set CYPRESS_* environment variables or use setEnv.sh.',
    );
  }

  const hasCognitoCredentials =
    config.env.E2E_CLIENT_ID &&
    config.env.E2E_USERNAME &&
    config.env.E2E_PASSWORD &&
    config.env.AWS_REGION;

  const cognitoEnabled = cognitoFlowEnabled(config.env);

  if (cognitoEnabled && !hasCognitoCredentials) {
    throw new Error(
      'Cognito flow is enabled for this environment but E2E_CLIENT_ID, E2E_USERNAME, E2E_PASSWORD, or AWS_REGION is missing.',
    );
  }

  if (!cognitoEnabled) {
    const tokenKeyByEnvironment = {
      development: 'E2E_ACCESS_TOKEN_DEVELOPMENT',
      staging: 'E2E_ACCESS_TOKEN_STAGING',
      production: 'E2E_ACCESS_TOKEN_PRODUCTION',
    };
    const tokenKey = tokenKeyByEnvironment[environment];

    if (tokenKey && !config.env[tokenKey]) {
      throw new Error(
        `Missing auth token for ${environment}. Set CYPRESS_${tokenKey}.`,
      );
    }
  }

  const hasAwsCredentials =
    process.env.CYPRESS_AWS_ACCESS_KEY_ID &&
    process.env.CYPRESS_AWS_SECRET_ACCESS_KEY;

  if (!hasAwsCredentials) {
    console.warn(
      'AWS credentials not found in CYPRESS_AWS_* environment variables. ' +
        'DynamoDB seeding tasks will fail until credentials are set (e.g. via setEnv.sh).',
    );
  }

  return config;
}

module.exports = {
  ENDPOINT_KEYS,
  SECRET_KEYS,
  loadEnv,
  validateEnv,
};
