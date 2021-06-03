import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { readyException } from "cypress/types/jquery";
import SearchPageObjects from '../../pageObjects/searchPage';

const searchPage = new SearchPageObjects()

Given('I am on the search page', () => {
    searchPage.visit()
})

Given('I want to log in to the search page', () => {
    searchPage.visit()
})

When('I enter any of the following criteria {string}', (searchTerm) => {
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

Then('no results are returned', () => {
    searchPage.searchComponent().contains('No results')
})

And ('I click on the search again button', () => {
    searchPage.searchAgainButton().click()
})

When('I set the number of results to {int}', (results) => {
    searchPage.numberOfResultsDisplayed(results)
})

Then('the correct number of {int} are displayed', (results) => {
    searchPage.paginationSummary().contains(results)
    searchPage.filterStatus().contains(results)
})

And('the search again button is displayed', () => {
    searchPage.searchAgainButton().should('be.visible')
})

And('the search panel is not visible', () => {
    searchPage.searchContainer().should('not.exist')
})

And('the search panel is visible', () => {
    searchPage.searchContainer().should('be.visible')
})

And('the close search button is visible', () => {
    searchPage.closeSearchButton().should('be.visible')
})

When('I click on the close search button', () => {
    searchPage.closeSearchButton().click()
})

// Waiting on fix for unhandled exception when invalid search is sent
When('I do not enter a minimum of 2 characters into the search', () => {

})

