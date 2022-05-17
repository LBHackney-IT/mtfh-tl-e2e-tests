import '@testing-library/cypress/add-commands';
import 'cypress-axe'
import 'cypress-audit/commands'
import "cypress-localstorage-commands"

const environmentConfig = require('../../environment-config')

Cypress.Commands.add('login', () => {
    const gssoTestKey = environmentConfig.gssoTestKey;
    //const gssoTestKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDE5MDA3NzgyMTk3MTQ0MjQyNzgiLCJlbWFpbCI6ImthcnVuYS5rYW51bXVyaUBoYWNrbmV5Lmdvdi51ayIsImlzcyI6IkhhY2tuZXkiLCJuYW1lIjoiS2FydW5hIEthbnVtdXJpIiwiZ3JvdXBzIjpbIm1hbmFnZWFycmVhcnMtaW5jb21lLWNvbGxlY3Rpb24tcmVhZC13cml0ZS1kZXZlbG9wbWVudCIsIm1taC1wcm9qZWN0LXRlYW0iLCJzYW1sLWF3cy1kYXNoYm9hcmQtYWNjZXNzIiwic2FtbC1hd3MtZGV2ZWxvcGVyIiwic2FtbC1hd3MtbXRmaC1kZXZlbG9wZXIiLCJzYW1sLWhvdXNpbmdmaW5hbmNlIl0sImlhdCI6MTY1MDc0MjE0OH0.I4BSj9pXXCSml0Tf6MvEc4vk0mKZewwThWPrw8uCx-4";
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