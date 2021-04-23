import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import SearchPageObjects from '../../pageObjects/searchPage';

const searchPage = new SearchPageObjects
const searchTerms = ["Something", "Something else"]

Given('I am on the search page', () => {
    searchPage.visit();
    searchPage.iAmOnTheSearchPage();
})

When('I enter a search term', () => {
    searchPage.searchContainer().type(searchTerms[0])
})

And('I click on the search button', () => {
    searchPage.searchButton().click()
})

Then('it performs a search', () => {
    searchPage.searchConfirmation().contains(searchTerms[0])
})

When('When I enter a list of search terms', (dataTable) => {
    dataTable.hashes().forEach((element) => {
        console.log(element.searchTerm)
        searchPage.searchContainer().type(element.searchTerm)
        searchPage.searchButton().click()
        searchPage.searchConfirmation().contains(element.searchTerm)
        searchPage.searchAgainButton().click()
    });
})