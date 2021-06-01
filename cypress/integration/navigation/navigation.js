import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import SearchPageObjects from '../../pageObjects/searchPage'
import PersonPageObjects from '../../pageObjects/personPage'
import NavigationObjects from '../../pageObjects/sharedComponents/navigation'
import { is } from "cypress/types/bluebird"
import { should } from "chai"

const searchPage = new SearchPageObjects()
const personPage = new PersonPageObjects()
const navigation = new NavigationObjects()
let searchContext;
let personContext;

Given('I navigate to the search landing page', () => {
    searchPage.visit()
})

Then('I am on the search landing page', () => {
    searchPage.iAmOnTheSearchPage()
})

When('I enter a search term and click search', () => {
    searchPage.searchContainer().type('callum')
    searchContext = cy.intercept('*api/v1/search/persons*')
    searchPage.searchButton().click()
})

Then ('I click on a search result', () => {
    searchPage.moreDetailsForAllSearchResultsInView().click({multiple: false})
    personContext = cy.intercept('*api/v1/contactDetails*')
})

And('I click the back button', () => {
    navigation.backButton().click()
    searchPage.searchResults().should('be.visible')
})

Then('I am returned to the search results page', () => {
    cy.url().contains(searchContext)
})

And('I click add new comment', () => {
    personPage.addCommentButton().click()
})

Then('I am returned to the person page', () => {
    cy.url().contains(personContext)
})

When('I navigate to a person', () => {
    personPage.visit()
})