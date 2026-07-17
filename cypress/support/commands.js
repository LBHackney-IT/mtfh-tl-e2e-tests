import '@testing-library/cypress/add-commands';
import 'cypress-axe';
import "cypress-localstorage-commands";

try {
  require('cypress-audit/commands');
} catch (error) {
  Cypress.Commands.add('lighthouse', () => {
    throw new Error(
      'cypress-audit is unavailable. @GoogleLighthouse tests require puppeteer@~1.19.0 on Node 24.',
    );
  });
  Cypress.Commands.add('pa11y', () => {
    throw new Error(
      'cypress-audit is unavailable. @Accessibility tests require puppeteer@~1.19.0 on Node 24.',
    );
  });
}

Cypress.Commands.add('login', () => {
  const gssoTestKey = Cypress.config("gssoTestKey");
  const cookieName = Cypress.config("isCognitoFlow")
    ? "hackneyCognitoToken"
    : "hackneyToken";

  cy.getCookies().should('be.empty');
  cy.setCookie(cookieName, gssoTestKey, { path: "/" });
  cy.getCookie(cookieName).should('have.property', 'value', gssoTestKey);
  cy.log(Cypress.config("featureToggles"));
  // Feature toggles are seeded into the AUT in the visit overwrite (onBeforeLoad).
});

Cypress.Commands.add('logout', () => {
  cy.clearCookies();
  cy.getCookies().should('be.empty');
});

// Fixture data (json files added to gitignore file)

Cypress.Commands.add('getContactDetailsFixture', () => {
  cy.readFile('cypress/fixtures/ContactDetails.json');
});

Cypress.Commands.add('getPersonFixture', () => {
  cy.readFile('cypress/fixtures/Persons.json');
});

Cypress.Commands.add('getCautionaryAlertFixture', () => {
  cy.readFile('cypress/fixtures/CautionaryAlerts.json');
});

Cypress.Commands.add('getTenureFixture', () => {
  cy.readFile('cypress/fixtures/TenureInformation.json');
});

Cypress.Commands.add('getPatchFixture', () => {
  cy.readFile('cypress/fixtures/PatchesAndAreas.json');
});

Cypress.Commands.add('getAssetFixture', () => {
  cy.readFile('cypress/fixtures/Assets.json');
});

Cypress.Commands.add("getProcessFixture", () => {
  cy.readFile("cypress/fixtures/Processes.json");
});

Cypress.Commands.add("getActivityHistoryPropertyFixture", () => {
  cy.readFile("cypress/fixtures/activity-history-property.json");
});

Cypress.Commands.add("getActivityHistoryPersonFixture", () => {
  cy.readFile("cypress/fixtures/activity-history-person.json");
});

Cypress.Commands.add("getActivityHistoryTenureFixture", () => {
  cy.readFile("cypress/fixtures/activity-history-tenure.json");
});

Cypress.Commands.add('generateCustomTemporaryFixture', (data) => {
  cy.writeFile(`cypress/fixtures/CustomTemporaryFixture.json`, JSON.stringify(data));
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err) {
    // tslint:disable: no-console
    console.log('error', err);
    console.log('runnable', runnable);
  }
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.add('getByTestId', (testName) => {
  cy.get(`[data-testid=${testName}]`);
});
