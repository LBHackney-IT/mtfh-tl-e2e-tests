import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import ActivityHistoryPageObjects from '../../pageObjects/activityHistoryPersonPage'

const activityHistory = new ActivityHistoryPageObjects()

Given('I go to the activity history for {string}', (person) => {
    cy.log(Cypress.env('CONTACT_DETAILS_API_URL'))
    cy.wait(30000)
    activityHistory.visit(person)
})

Then('the activity history is displayed', () => {
    activityHistory.activityTable().should('exist')
})

Then('I click close activity history', () => {
    activityHistory.closeActivityHistory().click()
})