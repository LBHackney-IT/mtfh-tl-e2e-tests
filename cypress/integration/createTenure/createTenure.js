import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import CreateTenurePageObjects from "../../pageObjects/createTenurePage"

const createTenurePage = new CreateTenurePageObjects()

Then('the new tenure landing page is displayed', () => {
    createTenurePage.addPropertyHeading().should('be.visible')
    createTenurePage.propertyAddress().should('be.visible')
})
    
When('I select a tenure type {string}', (tenureType) => {
    createTenurePage.tenureTypeSelection().select(tenureType)
})

And('I enter a tenure start date {string} {string} {string}', (day, month, year) => {
    createTenurePage.tenureStartDateDayContainer().type(day)
    createTenurePage.tenureStartDateMonthContainer().type(month)
    createTenurePage.tenureStartDateYearContainer().type(year)
})

And('I enter a tenure end date {string} {string} {string}', (day, month, year) => {
    createTenurePage.tenureEndDateDayContainer().type(day)
    createTenurePage.tenureEndDateMonthContainer().type(month)
    createTenurePage.tenureEndDateYearContainer().type(year)
})

And('I click the next button', () => {
    createTenurePage.nextButton().click()
})

And('I click the cancel button', () => {
    createTenurePage.cancelButton().click()
})

Then('a create tenure error is triggered', () => {
    createTenurePage.errorContainer().should('be.visible')
    createTenurePage.errorBody().contains('Start date must occur after the end date of the previous tenure')
})