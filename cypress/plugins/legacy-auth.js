const LEGACY_TOKEN_KEYS = {
  development: 'E2E_ACCESS_TOKEN_DEVELOPMENT',
  staging: 'E2E_ACCESS_TOKEN_STAGING',
  production: 'E2E_ACCESS_TOKEN_PRODUCTION',
};

function resolveLegacyToken(configEnv, environment) {
  const key = LEGACY_TOKEN_KEYS[environment];
  return key ? configEnv[key] : undefined;
}

function legacyTokenEnvVar(environment) {
  const key = LEGACY_TOKEN_KEYS[environment];
  return key ? `CYPRESS_${key}` : undefined;
}

module.exports = {
  LEGACY_TOKEN_KEYS,
  resolveLegacyToken,
  legacyTokenEnvVar,
};
