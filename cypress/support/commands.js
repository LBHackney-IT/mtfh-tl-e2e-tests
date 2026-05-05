import '@testing-library/cypress/add-commands';
import 'cypress-axe'
import 'cypress-audit/commands'
import "cypress-localstorage-commands"

Cypress.Commands.add('login', () => {
    // cy.log("Login start")
    const gssoTestKey = Cypress.config("gssoTestKey")
    const environment = Cypress.env("ENVIRONMENT");
    const cookieName = environment === "development" ? "hackneyCognitoToken" : "hackneyToken";
    cy.getCookies().should('be.empty')
    cy.setCookie(cookieName, gssoTestKey, { 
        domain: Cypress.config("baseUrl"),
    });
    cy.getCookie(cookieName).should('have.property', 'value', gssoTestKey)
    cy.log(Cypress.config("featureToggles"))
    window.localStorage.setItem(
        "features",
        JSON.stringify(Cypress.config("featureToggles"))
    );
    // maybe here?
    // const jwksUrl = "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_hmw0JIXQM/.well-known/jwks.json";
    // cy.intercept('GET', jwksUrl).as('jwksRequest');
    // cy.visit(Cypress.config("baseUrl"));
    // cy.wait('@jwksRequest');
    // cy.wait(5000);
    // cy.log("Login")
})

Cypress.Commands.add('logout', () => {
    cy.clearCookies()
    cy.getCookies().should('be.empty')
})

// Fixture data (json files added to gitignore file)

Cypress.Commands.add('getContactDetailsFixture', () => {
    cy.readFile('cypress/fixtures/ContactDetails.json')
})

Cypress.Commands.add('getPersonFixture', () => {
    cy.readFile('cypress/fixtures/Persons.json')
})

Cypress.Commands.add('getCautionaryAlertFixture', () => {
    cy.readFile('cypress/fixtures/CautionaryAlerts.json');
});

Cypress.Commands.add('getTenureFixture', () => {
    cy.readFile('cypress/fixtures/TenureInformation.json')
})

Cypress.Commands.add('getPatchFixture', () => {
    cy.readFile('cypress/fixtures/PatchesAndAreas.json')
})

Cypress.Commands.add('getAssetFixture', () => {
    cy.readFile('cypress/fixtures/Assets.json')
})

Cypress.Commands.add("getProcessFixture", () => {
    cy.readFile("cypress/fixtures/Processes.json")
})

Cypress.Commands.add("getActivityHistoryPropertyFixture", () => {
    cy.readFile("cypress/fixtures/activity-history-property.json")
})

Cypress.Commands.add("getActivityHistoryPersonFixture", () => {
    cy.readFile("cypress/fixtures/activity-history-person.json")
})

Cypress.Commands.add("getActivityHistoryTenureFixture", () => {
    cy.readFile("cypress/fixtures/activity-history-tenure.json")
})

Cypress.Commands.add('generateCustomTemporaryFixture', (data) => {
    cy.writeFile(`cypress/fixtures/CustomTemporaryFixture.json`, JSON.stringify(data));
});

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err) {
        // tslint:disable: no-console
        console.log('error', err)
        console.log('runnable', runnable)
    }
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('getByTestId', (testName) => {
    cy.get(`[data-testid=${testName}]`)
})
