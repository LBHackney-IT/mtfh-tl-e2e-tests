import '@testing-library/cypress/add-commands';
import 'cypress-axe'
import 'cypress-audit/commands'
import "cypress-localstorage-commands"

const environmentConfig = require('../../environment-config')

Cypress.Commands.add('login', () => {
    const gssoTestKey = environmentConfig.gssoTestKey

    const keyLength = gssoTestKey.length;

    cy.getCookies().should('be.empty')

    if (keyLength > 0) {
        cy.setCookie('hackneyToken', gssoTestKey)
    }
    else {
        cy.setCookie('hackneyToken', 'test')
    }

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