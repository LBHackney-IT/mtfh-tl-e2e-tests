import { Given,Then, When } from "cypress-cucumber-preprocessor/steps";
import PersonPageObjects from '../../pageObjects/personPage'

const personPage = new PersonPageObjects()

Given('I have loaded a Person record', (record) => {
    personPage.visit(record)
})

Given('I have loaded an invalid person record {string}', (record) => {
    personPage.visit(record)
})

Then('The person you\'ve requested does not exist error message appears', () => {
    personPage.feedbackMessageContainer().should('be.visible')
    personPage.feedbackMessageContainer().contains('The person you\'ve requested does not exist')
})

Then('the header Person details are displayed', () => {
    personPage.headerPersonalDetailsAreDisplayed()
})

When('I am using a mobile viewport {string}', (device) => {
    cy.viewport(`${device}`)
})

When('I click on the expand all sections button', () => {
    personPage.expandPersonalDetails().click()
})

Then('the body Person details are displayed', () => {
    personPage.bodyPersonalDeatailsAreDisplayed()
})