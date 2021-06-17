import { Then, And, Given } from 'cypress-cucumber-preprocessor/steps'
import FooterPageObjects from '../../pageObjects/sharedComponents/footer'
import HeaderPageObjects from '../../pageObjects/sharedComponents/header'
import PersonCommentsPageObjects from '../../pageObjects/personCommentsPage'
import SearchPageObjects from '../../pageObjects/searchPage'
import validComment from '../../helpers/personCommentText'
import testGuid from '../../helpers/personCommentText'

const footer = new FooterPageObjects
const header = new HeaderPageObjects
const personCommentsPage = new PersonCommentsPageObjects
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