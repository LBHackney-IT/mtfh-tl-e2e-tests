import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import SearchPageObjects from '../../pageObjects/searchPage';

const searchPage = new SearchPageObjects()

Given('I want to log in to the search page', () => {
    searchPage.visit()
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

Then('the search again button is displayed', () => {
    searchPage.searchAgainButton().should('be.visible')
})

Then('the search panel is not visible', () => {
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

