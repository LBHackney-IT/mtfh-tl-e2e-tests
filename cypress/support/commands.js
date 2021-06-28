import 'cypress-axe'
import 'cypress-audit/commands'

const environmentConfig = require('../../environment-config')

Cypress.Commands.add('login', () => {
    const gssoTestKey = environmentConfig.gssoTestKey
    cy.getCookies().should('be.empty')
    cy.setCookie('hackneyToken', gssoTestKey)
    cy.getCookie('hackneyToken').should('have.property', 'value', gssoTestKey)
})