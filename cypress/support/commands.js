import '@testing-library/cypress/add-commands';
import 'cypress-axe'
import 'cypress-audit/commands'
import "cypress-localstorage-commands"

const environmentConfig = require('../../environment-config')

Cypress.Commands.add('login', () => {
    const gssoTestKey = environmentConfig.gssoTestKey
    cy.log(gssoTestKey)
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

// fixture data

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
