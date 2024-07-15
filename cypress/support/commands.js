import '@testing-library/cypress/add-commands';
import 'cypress-axe'
import 'cypress-audit/commands'
import "cypress-localstorage-commands"

Cypress.Commands.add('login', () => {
    const gssoTestKey = Cypress.config("gssoTestKey")
    cy.getCookies().should('be.empty')
    cy.setCookie('hackneyToken', gssoTestKey)
    cy.getCookie('hackneyToken').should('have.property', 'value', gssoTestKey)
    cy.log(Cypress.config("featureToggles"))
    window.localStorage.setItem(
        "features",
        JSON.stringify(Cypress.config("featureToggles"))
    );
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
