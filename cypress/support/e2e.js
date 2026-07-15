import './commands';
import "cypress-real-events/support";
import 'cypress-axe'
require("cypress-plugin-tab");
require('cypress-xpath');
const { register: registerCypressGrep } = require('@cypress/grep');
import { endpoint } from './endpoints';
import { flushPendingRecordsToDelete } from '../../api/helpers';

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

Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  originalFn(url, {
    ...options,
    onBeforeLoad(win) {
      const featureToggles = Cypress.config("featureToggles");
      if (featureToggles) {
        win.localStorage.setItem("features", JSON.stringify(featureToggles));
      }
      if (typeof options.onBeforeLoad === "function") {
        options.onBeforeLoad(win);
      }
    },
  });

  if (options.waitForConfiguration !== false) {
    cy.wait('@getFeatureToggles');
  }

  cy.wait(1000);
});
