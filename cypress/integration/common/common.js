import { Then, And, Given } from 'cypress-cucumber-preprocessor/steps'
import AddPersonPageObjects from '../../pageObjects/addPersonPage'
import FooterPageObjects from '../../pageObjects/sharedComponents/footer'
import HeaderPageObjects from '../../pageObjects/sharedComponents/header'
import ModalPageObjects from '../../pageObjects/sharedComponents/modal'
import PersonCommentsPageObjects from '../../pageObjects/personCommentsPage'
import PersonContactPageObjects from '../../pageObjects/personContactPage'
import PersonPageObjects from '../../pageObjects/personPage'
import SearchPageObjects from '../../pageObjects/searchPage'
import validComment from '../../helpers/personCommentText'
import testGuid from '../../helpers/personCommentText'

const addPersonPage = new AddPersonPageObjects
const footer = new FooterPageObjects
const header = new HeaderPageObjects
const modal = new ModalPageObjects
const personCommentsPage = new PersonCommentsPageObjects
const personContactPage = new PersonContactPageObjects
const personPage = new PersonPageObjects
const searchPage = new SearchPageObjects

Given('I am logged in', () => {
    cy.login()
})

Given('I am logged out', () => {
    cy.logout()
})

    // Page Header shared steps
Then('the page header is visible', () => {
    header.headerIsDisplayed()
})

    // Page Footer shared steps
And('the page footer is visible', () => {
    footer.footerIsDisplayed()
})

Then('the page footer links are visible', () => {
    footer.footerLinksAreDisplayed()
})

And ('the page footer links are correct', () => {
    footer.footerLinksAreCorrect()
})

    // Person Comments shared steps
When ('I enter a valid comment', () => {
    personCommentsPage.commentContainer().type(validComment.validComment)
})

Then('I click the save comment button', () => {
    personCommentsPage.submitCommentButton().click()
})

Then('the comment is submitted', () => {
    personCommentsPage.pageAnnouncementHeader().should('be.visible')
    personCommentsPage.pageAnnouncementHeader().contains('Comment successfully saved')
})

When('I am using a mobile viewport {string}', (device) => {
    cy.viewport(`${device}`)
})

    // Search page shared steps
Given('I am on the search page', () => {
    searchPage.visit()
})

When('I enter any of the following criteria {string}', (searchTerm) => {
    if(searchTerm === 'guid') {
        searchTerm = testGuid.testGuid
    }
    searchPage.searchContainer().type(searchTerm)       
})

And('I click on the search button', () => {
    searchPage.searchButton().click()
})

Then('the search results are displayed by best match {string}', (searchTerm) => {
    if(searchTerm === 'guid') {
        searchTerm = testGuid.testGuid
    }
    searchPage.searchResultPropertiesAreDisplayed()
    searchPage.searchConfirmation().contains(searchTerm)
    searchPage.searchResults().contains(searchTerm.replace(/\*/g, '')) 
})

    // Accessibility
And('have no detectable a11y violations', () => {
    cy.checkA11y(null, null, axeTerminalLog, {skipFailures: true})

    function axeTerminalLog(violations) {
        cy.task(
          'log',
          `${violations.length} accessibility violation${
            violations.length === 1 ? '' : 's'
          } ${violations.length === 1 ? 'was' : 'were'} detected`
        )

        const violationData = violations.map(
          ({ id, impact, description, nodes }) => ({
            id,
            impact,
            description,
            nodes: nodes.length
          })
        )
        cy.task('table', violationData)
    }
})

    // Person-contact
And('I click the done button', () => {
    personContactPage.doneButton().click()
})

And('I click the add email address button', () => {
    personContactPage.addEmailAddressButton().click()
})

And('I enter an email address {string}', (emailAddress) => {
    personContactPage.emailAddressField().type(emailAddress)
})

And('I enter an email description {string}', (emailDescription) => {
    personContactPage.emailAddressDescription().type(emailDescription)
})

And('I click save email address', () => {
    personContactPage.saveEmailAddressButton().click()
})

And('I click the add phone number button', () => {
    personContactPage.addPhoneNumberButton().click()
})

And('I enter a phone number {string}', (phoneNumber) => {
    personContactPage.phoneNumberField().type(phoneNumber)
})

And('I select a phone number type {string}', (phoneType) => {
    switch (phoneType) {
        case 'Mobile':
            personContactPage.phoneNumberMobileType().click()
            break;
        
        case 'Work':
            personContactPage.phoneNumberWorkType().click()
            break;
        
        case 'Home':
            personContactPage.phoneNumberHomeType().click()
            break;
        
        case 'Other':
            personContactPage.phoneNumberOtherType().click()
            break;
    
        default:
            cy.log('Please select a valid phone number type')
            break;
    }
})

And('I enter a phone number description {string}', (phoneDescription) =>  {
    personContactPage.phoneNumberDescription().type(phoneDescription)
})

And('I click save phone number', () => {
    personContactPage.savePhoneNumberButton().click()
})

And('the email information is captured {string} {string}', (email, emailDescription) => {
    personContactPage.pageWarning().should('not.exist')
    personContactPage.pageAnnouncementHeader().should('be.visible')
    personContactPage.mainContent().contains('Email address saved')
    personContactPage.fieldsetContent().contains(email)
    personContactPage.fieldsetContent().contains(emailDescription)
})

And('the phone information is captured {string} {string} {string}', (phoneNumber, phoneType, phoneDescription) => {
    personContactPage.pageWarning().should('not.exist')
    personContactPage.pageAnnouncementHeader().should('be.visible')
    personContactPage.mainContent().contains('Phone number saved')
    personContactPage.fieldsetContent().contains(phoneNumber)
    personContactPage.fieldsetContent().contains(phoneType)
    personContactPage.fieldsetContent().contains(phoneDescription)
})

And('I click remove email address', () => {
    personContactPage.removeEmailAddressButton().click()
})

And('the remove email address modal is displayed', () => {
    modal.modalBody().should('be.visible')
})

And('the modal is not displayed', () => {
    modal.modalBody().should('not.exist')
})

And('I click remove phone number', () => {
    personContactPage.removePhoneNumberButton().click()
})

And('the remove phone number modal is displayed', () => {
    modal.modalBody().should('be.visible')
})

        // Person page
And('I click edit person', () => {
    personPage.editPersonButton().click()
})

        // Create/edit person page
And('I click cancel', () => {
    addPersonPage.cancelButton().click()
})