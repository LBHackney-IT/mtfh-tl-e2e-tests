import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import ActivityHistoryPageObjects from '../../pageObjects/activityHistoryPersonPage'

const activityHistory = new ActivityHistoryPageObjects()

Given('I go to the activity history for {string}', (person) => {
    cy.visit('https://www.tesla.com');
    cy.url().should("eq", 'https://www.tesla.com/');
})

Then('the activity history is displayed', () => {
    activityHistory.activityTable().should('be.visible')
})

Then('I click close activity history', () => {
    activityHistory.closeActivityHistory().click()
})