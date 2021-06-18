import '@testing-library/cypress/add-commands';
import 'cypress-axe'
import 'cypress-audit/commands'
const gssoTestKey = require('../../environment-config').gssoTestKey

Cypress.Commands.add('login', () => {
    cy.getCookies().should('be.empty')
    cy.setCookie('hackneyToken', gssoTestKey)
    cy.getCookie('hackneyToken').should('have.property', 'value', gssoTestKey)
})

Cypress.Commands.add('logout', () => {
    cy.clearCookies()
    cy.getCookies().should('be.empty')
})