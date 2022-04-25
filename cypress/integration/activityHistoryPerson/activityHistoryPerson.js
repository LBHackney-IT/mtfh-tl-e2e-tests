import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import ActivityHistoryPageObjects from '../../pageObjects/activityHistoryPersonPage'
import activityHistoryPersonPage from "../../pageObjects/activityHistoryPersonPage";

const activityHistory = new ActivityHistoryPageObjects()
//const activityHistoryPersonPage = new activityHistoryPersonPage()

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
When('I click the Saving person button', () => {
    activityHistory.savingPerson().click()
})

