import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import AddPersonPageObjects from '../../pageObjects/addPersonPage'

const addPersonPage = new AddPersonPageObjects()

Given('I create a person for tenure {string}', (record) => {
    addPersonPage.visit(record)
})

Then('the add a new person tenure page is correct', () => {
    addPersonPage.addPersonPageIsDisplayed()
})

And('I select a title {string}', (title) => {
    addPersonPage.personTitleSelection(title)
})

When('I select person type {string}', (personType) => {
    if(personType === 'Named tenure holder') {
        addPersonPage.tenureHolderRadioButton().click()
    }
    if(personType === 'Household member') {
        addPersonPage.householdMemberRadioButton().click()
    }
})

And('I enter a first name {string}', (firstName) => {
    addPersonPage.firstNameContainer().type(firstName)
})

And('I enter a middle name {string}', (middleName) => {
    addPersonPage.middleNameContainer().type(middleName)
})

And('I enter a last name {string}', (lastName) => {
    addPersonPage.lastNameContainer().type(lastName)
})

And('I enter a date of birth {string} {string} {string}', (day, month, year) => {
    addPersonPage.dateOfBirthDayContainer().type(day)
    addPersonPage.dateOfBirthMonthContainer().type(month)
    addPersonPage.dateOfBirthYearContainer().type(year)
})

And('I enter a reason for creation', () => {
    addPersonPage.reasonForCreationContainer().type('This is a test')
})

And('I click add person', () => {
    addPersonPage.addPersonButton().click()
})

Then('a person is created', () => {
    cy.url().should('include','tenure')
})

Then('the form error container is displayed', () => {
    addPersonPage.addPersonFormErrorContainer().should('be.visible')
    addPersonPage.errorSummaryBody().contains('You must select a person type before proceeding')
})

And('the person type inline error message is displayed', () => {
    addPersonPage.personTypeError().should('be.visible')
    addPersonPage.personTypeError().contains('You must select a person type before proceeding')
})