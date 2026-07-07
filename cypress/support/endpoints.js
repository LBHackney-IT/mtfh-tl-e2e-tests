/**
 * Public API gateway URLs exposed via Cypress.expose() in setupNodeEvents.
 * These are not secrets — only explicitly listed keys are available in the browser.
 */
export function endpoint(key) {
  return Cypress.expose(key);
}
