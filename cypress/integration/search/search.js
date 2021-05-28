import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
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
    searchPage.searchConfirmation().should('not.exist')
})

And ('I click on the search again button', () => {
    searchPage.searchAgainButton().click()
})

// // Waiting on fix for unhandled exception when invalid search is sent
// When('I do not enter a minimum of 2 characters into the search', (dataTable) => {
//     dataTable.hashes().forEach((element) => {
//         searchPage.searchContainer().type(element.searchTerm)
//         searchPage.searchButton().click()
//         searchPage.searchConfirmation().should('not.exist')
//         searchPage.searchContainer().clear()
//     })
// })

