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

When("I set the number of results to {int}", (results) => {
  searchPage.numberOfResultsDisplayed(results);
});

Then("the correct number of {int} are displayed", (results) => {
  searchPage.paginationSummary().contains(results);
  searchPage.filterStatus().contains(results);
});

Then("the search again button is displayed", () => {
  searchPage.searchAgainButton().should("be.visible");
});

Then("a validation error message is displayed", () => {
  searchPage.searchTermError().should("be.visible");
});

Then("the default sort option is correct", () => {
  searchPage.sortByOption().contains("Best match");
});

When("I select to sort by {string}", (filter) => {
  searchPage.sortByOption().select(filter);
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