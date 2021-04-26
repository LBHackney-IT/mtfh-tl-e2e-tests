import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import SearchPageObjects from '../../pageObjects/searchPage';

const searchPage = new SearchPageObjects

Given('I am on the search page', () => {
    searchPage.visit();
    searchPage.iAmOnTheSearchPage();
})

When('I enter any of the following criteria with a minimum of 2 characters', (dataTable) => {
    dataTable.hashes().forEach((element) => {
        let trimAsterisk = element.searchTerm.replace(/\*/g, '')
        searchPage.searchContainer().type(element.searchTerm)
        searchPage.searchButton().click()
        searchPage.searchConfirmation().contains(element.searchTerm)
        searchPage.searchResultTitle().contains(trimAsterisk)
        searchPage.searchAgainButton().click()
    })
})

Then('the search results are displayed by best match', () => {
    searchPage.searchResultTitle().should('be.visible')
})

// Waiting on fix for unhandled exception when invalid search is sent
When('I do not enter a minimum of 2 characters into the search', (dataTable) => {
    dataTable.hashes().forEach((element) => {
        searchPage.searchContainer().type(element.searchTerm)
        searchPage.searchButton().click()
        searchPage.searchConfirmation().should('not.exist')
        searchPage.searchContainer().clear()
    })
})

