import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import SearchPageObjects from "../../pageObjects/searchPage";
const searchPage = new SearchPageObjects();

Given("I want to log in to the search page", () => {
  searchPage.visit();
});

Then("no results are returned", () => {
  searchPage.searchComponent().contains("No matching search results found");
});

And("I click on the search again button", () => {
  searchPage.searchAgainButton().click();
});

Then("the search again button is displayed", () => {
  searchPage.searchAgainButton().should("be.visible");
});

Then("a validation error message is displayed", () => {
  searchPage.searchTermError().should("be.visible");
});

Then("there is no filter option", () => {
  searchPage.sortByOption().should("not.exist");
});

And("tenure search results are prefixed correctly", () => {
  searchPage.searchResults().contains("Tenure payment ref");
});

Then("I can see the options to search in the correct order", () => {
  searchPage.searchRadioButtons().first().contains('Property')
})

And("property search results are prefixed correctly", () => {
  searchPage.searchResults().contains("Property type")
  searchPage.searchResults().contains("Tenure")
  searchPage.searchResults().contains("UPRN")
})

Then('a warning message is displayed for search field', () => {   
  searchPage.searchTermError().contains('You must enter at least 2 characters.')
})