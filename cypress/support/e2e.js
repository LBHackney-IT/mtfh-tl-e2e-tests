import './commands';
import "cypress-real-events/support";
import 'cypress-axe'
require("cypress-plugin-tab");
require('cypress-xpath');
const { register: registerCypressGrep } = require('@cypress/grep');
import { endpoint } from './endpoints';
import { flushPendingRecordsToDelete } from '../../api/helpers';
import {
  awaitAppReady,
  ensureAuthCookie,
  isDeepLinkPath,
  parseVisitUrl,
  seedAutStorage,
} from './auth';

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

registerCypressGrep();

const clearDatabase = () => {
    const filename = "cypress/fixtures/recordsToDelete.json";
    return flushPendingRecordsToDelete().then(() => {
      return cy.readFile(filename).then((recordsToDelete) => {
        if (recordsToDelete.length) {
          return cy.wrap(recordsToDelete).each((record) => {
            return cy.task('dynamoDb:delete', record);
          }).then(() => {
            cy.writeFile(filename, []);
            cy.log("Test database records cleared!");
          });
        }

        cy.log("No records to delete.");
      });
    });
  };
  

before(() => {
    clearDatabase();
});

afterEach(() => {
    // Persist deletes queued from intercept callbacks (no cy.* there — see api/helpers.js)
    flushPendingRecordsToDelete();
});

after(() => {
    clearDatabase();
});

beforeEach(() => {
  const featureToggleEndpoint = endpoint('FEATURE_TOGGLE_ENDPOINT');
  const url = `${featureToggleEndpoint}/api/v1/configuration?types=MMH`;

  cy.intercept('GET', url).as('getFeatureToggles');
});

const buildVisitOptions = (options = {}) => ({
  ...options,
  onBeforeLoad(win) {
    seedAutStorage(win, Cypress.config("featureToggles"));
    if (typeof options.onBeforeLoad === "function") {
      options.onBeforeLoad(win);
    }
  },
});

const assertStayedOnPath = (pathname, options = {}) => {
  if (
    options.waitForPath === false ||
    !isDeepLinkPath(pathname)
  ) {
    return;
  }
  cy.location("pathname", { timeout: 30000 }).should("eq", pathname);
};

/**
 * Cognito auth MFE can bounce cold deep links: push("/search") → Redirect to "/".
 * Settle on "/" first, then client-navigate so auth never mounts on the target route.
 */
const visitDeepLinkViaAuthWarmup = (originalFn, url, options, { pathname, href }) => {
  const visitOptions = buildVisitOptions(options);

  originalFn("/", visitOptions);
  awaitAppReady(options);

  cy.window().then((win) => {
    win.history.pushState({}, "", href);
    win.dispatchEvent(new PopStateEvent("popstate"));
  });

  assertStayedOnPath(pathname, options);
  // Auth can still redirect shortly after client-nav; confirm we remain on target.
  if (options.waitForPath !== false && isDeepLinkPath(pathname)) {
    cy.wait(1500);
    cy.location("pathname").should("eq", pathname);
    cy.contains(".lbh-header", "Sign out").should("be.visible");
  }
};

Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  const { pathname, href } = parseVisitUrl(url);
  const visitOptions = buildVisitOptions(options);

  // Logged-out visits must not re-seed the auth cookie (home "Sign in" test, etc.)
  if (options.authenticate !== false) {
    ensureAuthCookie();
  }

  const useCognitoDeepLinkWarmup =
    Cypress.config("isCognitoFlow") &&
    options.authWarmup !== false &&
    options.authenticate !== false &&
    isDeepLinkPath(pathname);

  if (useCognitoDeepLinkWarmup) {
    visitDeepLinkViaAuthWarmup(originalFn, url, options, { pathname, href });
    return;
  }

  originalFn(url, visitOptions);
  awaitAppReady(options);
  assertStayedOnPath(pathname, options);
});
