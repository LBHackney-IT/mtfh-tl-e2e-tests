import '@testing-library/cypress/add-commands';
import 'cypress-axe'
import 'cypress-audit/commands'
import "cypress-localstorage-commands"
import * as requests from "../../api/requests/requests"
import DynamoDb from "../e2e/common/DynamoDb";

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

Cypress.Commands.add('getTenureFixture', () => {
    cy.readFile('cypress/fixtures/TenureInformation.json')
})

Cypress.Commands.add('getPropertyFixture', () => {
    cy.readFile('cypress/fixtures/Assets.json')
})

Cypress.Commands.add("getRequest", (endpoint) => {
    return new Cypress.Promise((resolve, reject) => {
         requests.getRequest(endpoint).then((data) => {
             resolve(data);
          })
           .catch(err => {
               resolve(err.response)
           })
    });
})

Cypress.Commands.add("postRequest", (endpoint, payload) => {
    return new Cypress.Promise((resolve, reject) => {
        requests.postRequest(endpoint, payload)
          .then((data) => {
              resolve(data);
          })
    });
})

Cypress.Commands.add("delete", (record) => {
    return new Cypress.Promise((resolve, reject) => {
        DynamoDb.deleteRecordFromDynamoDB(record).then(() => {
            resolve();
        })
    });
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