/**
 * Shared Cognito/legacy auth helpers for the Cypress support layer.
 *
 * Cold deep-link visits under Cognito can briefly mount the auth MFE, which then
 * history.push("/search") → search Redirects to "/" (worktray). Prefer settling
 * auth on "/" then client-navigating (see visit overwrite in e2e.js).
 */

export const authCookieName = () =>
  Cypress.config("isCognitoFlow") ? "hackneyCognitoToken" : "hackneyToken";

export const authCookieOptions = () => {
  const options = { path: "/" };
  const baseUrl = Cypress.config("baseUrl") || "";
  if (baseUrl.includes("hackney.gov.uk")) {
    options.domain = ".hackney.gov.uk";
  }
  return options;
};

export const ensureAuthCookie = () => {
  const token = Cypress.config("gssoTestKey");
  if (!token) {
    return;
  }
  cy.setCookie(authCookieName(), token, authCookieOptions());
};

export const parseVisitUrl = (url) => {
  if (url == null || url === "") {
    return { pathname: "/", href: "/" };
  }
  if (/^https?:\/\//i.test(url)) {
    const parsed = new URL(url);
    return {
      pathname: parsed.pathname,
      href: `${parsed.pathname}${parsed.search}${parsed.hash}`,
    };
  }
  const href = String(url);
  return { pathname: href.split("?")[0] || "/", href };
};

export const isDeepLinkPath = (pathname) =>
  pathname !== "/" &&
  !pathname.startsWith("/login") &&
  !pathname.startsWith("/search");

export const seedAutStorage = (win, featureToggles) => {
  if (featureToggles) {
    win.localStorage.setItem("features", JSON.stringify(featureToggles));
  }
  // Empty search:last makes /search Redirect to /
  win.sessionStorage.removeItem("search:last");
};

export const awaitAppReady = (options = {}) => {
  if (options.waitForConfiguration !== false) {
    cy.wait("@getFeatureToggles");
  }
  if (options.waitForAuthentication !== false) {
    cy.waitForAuthenticatedApp();
  }
};
