import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import CreateTenurePageObjects from "../../pageObjects/createTenurePage"
import ModalPageObjects from "../../pageObjects/sharedComponents/modal"

const createTenurePage = new CreateTenurePageObjects()
const modal = new ModalPageObjects()

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

And('the person search is displayed', () => {
    createTenurePage.searchContainer().should('be.visible')
    createTenurePage.searchButton().should('be.visible')
})

And('I click the cancel button', () => {
    createTenurePage.cancelButton().click()
})

Then('the cancel confirmation modal is displayed', () => {
    modal.modalBody().should('be.visible')
})

And('the tenure person search is displayed', () => {
    createTenurePage.searchContainer().should('be.visible')
    createTenurePage.searchButton().should('be.visible')
    createTenurePage.main().contains('Property type')
    createTenurePage.main().contains('UPRN')
    createTenurePage.main().contains('Property reference')
})