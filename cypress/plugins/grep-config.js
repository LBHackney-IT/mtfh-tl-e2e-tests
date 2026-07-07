/**
 * Normalise @cypress/grep v6 settings onto config.expose before the grep plugin runs.
 *
 * Cypress 15 reads grepTags from expose (not env). CLI/npm quoting can drop or split
 * space-separated tag strings, so we also accept CYPRESS_grepTags and legacy env.grepTags.
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
    const grepTagsMatch = exposeArg.match(/grepTags=([^,]+)/);
    if (grepTagsMatch && !config.expose.grepTags) {
      config.expose.grepTags = grepTagsMatch[1].trim();
    }

    if (/grepFilterSpecs=true/i.test(exposeArg)) {
      config.expose.grepFilterSpecs = true;
    }
  }

  const grepTags =
    config.expose.grepTags ??
    config.expose['grep-tags'] ??
    config.env?.grepTags ??
    process.env.CYPRESS_grepTags;

  if (grepTags) {
    config.expose.grepTags = grepTags;
  }

  if (config.expose.grepTags) {
    console.log(`@cypress/grep: configured grepTags="${config.expose.grepTags}"`);
  }

  return config;
}

module.exports = {
  applyGrepExpose,
};
