import '@testing-library/cypress/add-commands';
import 'cypress-axe'
import 'cypress-audit/commands'

Cypress.Commands.add('login', () => {
    const gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN')
  
    cy.getCookies().should('be.empty')
    cy.setCookie('hackneyToken', gssoTestKey)
    cy.getCookie('hackneyToken').should('have.property', 'value', gssoTestKey)
})

Cypress.Commands.add('logout', () => {
    cy.clearCookies()
})