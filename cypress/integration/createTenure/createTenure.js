import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import CreateTenurePageObjects from "../../pageObjects/createTenurePage"
import ModalPageObjects from "../../pageObjects/sharedComponents/modal"

const createTenurePage = new CreateTenurePageObjects()
const modal = new ModalPageObjects()
const tenure = require('../../../api/tenure')

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
    createTenurePage.cancelButton().click({force: true})
})

Then('a create tenure error is triggered', () => {
    createTenurePage.errorContainer().should('be.visible')
    createTenurePage.errorBody().contains('Start date must occur after the end date of the previous tenure')
})

And('the person search is displayed', () => {
    createTenurePage.searchContainer().should('be.visible')
    createTenurePage.searchButton().should('be.visible')
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

Then('the edit tenure information is displayed', () => {
    createTenurePage.tenureTypeSelection().should('be.visible')
    createTenurePage.tenureStartDateDayContainer().should('be.visible')
    createTenurePage.tenureStartDateMonthContainer().should('be.visible')
    createTenurePage.tenureStartDateYearContainer().should('be.visible')
})

And('I click the done button', () => {
    createTenurePage.doneButton().click()
})

When('I edit a Tenure {string}', (tenureId) => {
    createTenurePage.editTenure(tenureId)
})

Then('the tenure cannot be edited warning message is displayed', () => {
    createTenurePage.errorMessageContainer().should('be.visible')
    createTenurePage.errorMessageContainer().contains('This tenure is no longer active and cannot be edited.')
})

When('I add {int} named tenure holder', (tenureHolders) => {
    for(let i = 0; i < tenureHolders; i++) {
        createTenurePage.addAsNamedTenureHolderButton().eq(i).click()
    }
})

Then('the person is added to the tenure', () => {
    createTenurePage.pageAnnouncementContainer().should('be.visible')
    createTenurePage.pageAnnouncementContainer().contains('Person added to tenure')
})

Then('the person is not added to the tenure', () => {
    createTenurePage.pageAnnouncementContainer().should('be.visible')
    createTenurePage.pageAnnouncementContainer().contains('Person added to tenure')
})

When('I add {int} household member', (householdMembers) => {
    for(let i = 0; i < householdMembers; i++) {
        createTenurePage.addAsHousholdMember().eq(i).click()
    }
})

Then('a new tenure error message appears {string}', (error) => {
    createTenurePage.pageAnnouncementContainer.should('be.visible')
    createTenurePage.pageAnnouncementContainer().contains(error)
})

And('the create new person button is not enabled', () => {
    createTenurePage.createNewPersonButton().should('have.attr', 'aria-disabled').and('equal', 'true')
})

And('I click create new person', () => {
    createTenurePage.createNewPersonButton().click()
})

And('I am on the create new person for a new tenure page', () => {
    cy.url().should('include', '/person/new/')
})

Then('I am on the create contact for a new tenure page', () => {
    cy.url().should('include', '/person/new/add/')
    cy.url().should('include', '/contact')
})

And('the person is added to the list of tenures {string} {string} {string} {string} {string} {string}', (title, firstName, lastName, day, month, year) => {
    createTenurePage.addAsHousholdMember().contains(`${title} ${firstName} ${lastName}`)
    createTenurePage.addAsHousholdMember().contains(`${day}/${month}/${year},`)
})

When('I navigate to a create person for new tenure {string} {string}', (property, tenure) => {
    createTenurePage.createNewPerson(property, tenure)
})

Given('I delete all existing persons from the new tenure {string}', async (tenureId) => {
    // GET the list of people from the tenure
    const getResponse = await tenure.getTenure(tenureId)
    cy.log(`Status code ${getResponse.status} returned`)
    assert.deepEqual(getResponse.status, 200)

    const householdMembers = getResponse.data.householdMembers;

    // DELETE any existing person from the tenure
    for(let i = 0; i < householdMembers.length; i++) {
        const deleteResponse = await tenure.deleteTenure(tenureId, householdMembers[i].id)
        cy.log(`Status code ${deleteResponse.status} returned`)
        assert.deepEqual(deleteResponse.status, 204)
    }
    cy.log(`${householdMembers.length} person records deleted`)
})

And('I click remove person', () => {
    createTenurePage.confirmRemovePersonButton().click()
})

Then('the edit tenure information is displayed {string}', (tenureId) => {
    cy.url().should('include', `tenure/${tenureId}/edit`)
})