import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import ActivityHistoryPageObjects from '../../pageObjects/activityHistoryPage'

const activityHistory = new ActivityHistoryPageObjects()

Given('I go to the activity history for {string}', (person) => {
    cy.log(Cypress.env('CONTACT_DETAILS_API_URL'))
    activityHistory.visit(person)
})

Then('the activity history is displayed', () => {
    activityHistory.activityTable().should('be.visible')
})

Then('I click close activity history', () => {
    activityHistory.closeActivityHistory().click()
})