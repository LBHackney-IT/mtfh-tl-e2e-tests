/**
 * Ensure @cypress/grep v6 settings are on config.expose before the grep plugin runs.
 *
 * Cypress 15 / @cypress/grep v6 read grepTags from expose (via --expose), not env.
 * This bridges CLI --expose values onto config.expose when Cypress has not already
 * populated them (e.g. npm-script quoting edge cases).
 */
function applyGrepExpose(config) {
  config.expose = {
    grepOmitFiltered: true,
    ...(config.expose || {}),
  };

  const exposeArg = process.argv.find((arg, index) => {
    const flag = process.argv[index - 1];
    return flag === '--expose' || flag === '-x';
  });

  if (exposeArg) {
    // Capture group is the value after grepTags=, up to the next comma.
    // e.g. "grepTags=@SmokeTest+-@ignore,grepFilterSpecs=true" → "@SmokeTest+-@ignore"
    const grepTagsMatch = exposeArg.match(/grepTags=([^,]+)/);

    if (grepTagsMatch && !config.expose.grepTags) {
      config.expose.grepTags = grepTagsMatch[1].trim();
    }

    if (/grepFilterSpecs=true/i.test(exposeArg)) {
      config.expose.grepFilterSpecs = true;
    }
  }

  if (config.expose.grepTags) {
    console.log(`@cypress/grep: configured grepTags="${config.expose.grepTags}"`);
  }

  return config;
}

module.exports = {
  applyGrepExpose,
};
