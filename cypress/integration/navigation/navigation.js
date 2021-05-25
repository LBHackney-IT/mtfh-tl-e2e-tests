import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import SearchPageObjects from '../../pageObjects/searchPage'
import PersonPageObjects from '../../pageObjects/personPage'

const searchPage = new SearchPageObjects()
const personPage = new PersonPageObjects()
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
})

Then ('I click on a search result', () => {
    searchPage.moreDetailsForAllSearchResultsInView().click({multiple: false})
    personContext = cy.intercept('*api/v1/contactDetails*')
})

And('I click the back button', () => {
    searchPage.iAmOnTheSearchPage()
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