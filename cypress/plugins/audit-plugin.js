let auditPlugin;

function getAuditPlugin() {
  if (auditPlugin !== undefined) {
    return auditPlugin;
  }

  try {
    auditPlugin = require('cypress-audit');
  } catch (error) {
    console.warn(
      'cypress-audit is unavailable — skipping lighthouse/pa11y plugin setup.',
      'Install puppeteer@~1.19.0 if you need @GoogleLighthouse or @Accessibility tests.',
      error.message,
    );
    auditPlugin = null;
  }

  return auditPlugin;
}

function registerAuditPlugin(on) {
  const plugin = getAuditPlugin();
  if (!plugin) {
    return;
  }

  const { lighthouse, pa11y, prepareAudit } = plugin;

  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on('task', {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log(lighthouseReport);
    }),
    pa11y: pa11y((pa11yReport) => {
      console.log(pa11yReport);
    }),
  });
}

module.exports = {
  getAuditPlugin,
  registerAuditPlugin,
};
