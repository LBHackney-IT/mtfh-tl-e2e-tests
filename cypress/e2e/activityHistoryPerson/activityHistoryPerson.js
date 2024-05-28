import { And, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import ActivityHistoryPageObjects from '../../pageObjects/activityHistoryPersonPage';

const activityHistoryObjects = new ActivityHistoryPageObjects()

Given('I go to the activity history for the person', () => {
    cy.getPersonFixture().then((person) => {
        activityHistoryObjects.visit(person.id)
        cy.intercept("GET", `*/api/v1/activityhistory?pageSize=5&targetId=${person.id}`, { fixture: "activity-history-person.json" }).as("getActivityHistory")
        cy.wait("@getActivityHistory")
    })
})

Then('table headers should be visible', () => {
    activityHistoryObjects.tableHeaders().forEach(tableHeader => {
        cy.contains(tableHeader).should('be.visible')
    })
})

Then('the name of the person should be visible', () => {
    cy.getPersonFixture().then((person) => {
        cy.contains(person.firstName).should('be.visible')
        cy.contains(person.surname).should('be.visible')
    })
})

Then('the activity history is displayed', () => {
    activityHistoryObjects.activityTable().should('be.visible')
})

When('I click close activity history', () => {
    activityHistoryObjects.closeActivityHistory().click()
})