import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import ChangeOfNamePageObjects from '../../pageObjects/changeOfNamePage';
import homePage from "../../pageObjects/homePage";
const changeOfName = new ChangeOfNamePageObjects()

Given("I am on the MMH home page", () => {
    changeOfName.visit(homePage);
});
Given("I am on the Person page for {string}", (personId) => {
    changeOfName.visit(personId);
})
When("I enter {string} as search criteria", (personSearch) => {
    changeOfName.textSearch().should('exist');
    changeOfName.searchField().clear().type(personSearch);
});
When("I select 'Person' and click on search button", () => {
    changeOfName.radiobuttonPerson().click();
    changeOfName.searchButton().click();
});
Then("I am on the Person search results page", () => {
    cy.findAllByText('Search Results').should('exist');
});
When("I select person and click on 'New Process' button", () => {
    changeOfName.searchPerson().click();
});
When("I click on 'New Process' button", (personID) => {
    changeOfName.newProcessButton().click();
});
When("I select 'Changes to a tenancy' from the processes menu", () => {
    changeOfName.changeToATenancyLink().click();
});
Then("a further sub menu is expanded into view", () => {
    changeOfName.changeOfNameLink().should('be.visible');
});
When("I select 'Change of Name' to initiate the change of name process for the selected person", () => {
    changeOfName.changeOfNameLink().click();
});
Then("'Change of Name' page is displayed", () => {
    cy.contains('Change of Name').should('be.visible');
});
Then("Start Process button is disabled", () => {
    changeOfName.buttonStartProcess().should('be.disabled');
});
When("I select the checkbox 'I have explained to the tenant'", () => {
    changeOfName.checkBoxTenantInfo().click();
});
Then("Start Process button is enabled", () => {
    changeOfName.buttonStartProcess().should('be.enabled');
});
When("I select the button", () => {
    changeOfName.buttonStartProcess().click();
});
Then("Change of Name edit page is displayed", () => {
    cy.contains("Enter tenant's new name").should('be.visible');
});
Then("Next button is disabled", () => {
    changeOfName.buttonNext().should('be.disabled');
});
Then("Status Stepper is at Tenant's new name step", () => {
    changeOfName.statusActiveCheck().should('be.visible');
    changeOfName.statusActiveCheck().should('contain.text', "Tenant's new name");
});
When("I select Title and enter First and Last name", () => {
    changeOfName.personTitle().select('Mr');
    changeOfName.personFirstName().type('Test Edit First Name');
    changeOfName.personLastName().type('Test Edit Last Name');
});
When("I click on Next button", () => {
    changeOfName.buttonNext().click();
});
Then("I am on the supporting documents page", () => {
    cy.contains('Checking supporting documents');
    changeOfName.statusActiveCheck().should('contain.text', "Request Documents");
});
When('I enter Title only', () => {
    changeOfName.personTitle().select('Mr');
});
Then("a validation error message for 'First name' and 'Last name' are displayed", () => {
    changeOfName.personFNameError().should('contain.text', 'You must enter the tenant\'s first name');
    changeOfName.personLNameError().should('contain.text', 'You must enter the tenant\'s last name');
});
When("I enter 'Title' and 'First name' only", () => {
    changeOfName.personTitle().select('Mr');
    changeOfName.personFirstName().clear().type('Automation update First Name');
});
Then("a validation error message for 'Last name' is displayed", () => {
    changeOfName.personLNameError().should('contain', 'You must enter the tenant\'s last name');
});
When("I enter 'Title' and 'Last name' only", () => {
    changeOfName.personTitle().select('Mr');
    changeOfName.personLastName().clear().type('Automation update Last Name');
    changeOfName.personFirstName().clear();
});
Then("a validation error message for 'First name' is displayed", () => {
    changeOfName.personFNameError().should('contain.text', 'You must enter the tenant\'s first name');
});
When("I enter 'First name' and 'Last name' only", () => {
    changeOfName.personTitle().select('Select a title');
    changeOfName.personFirstName().clear().type('Automation update First Name');
    changeOfName.personLastName().clear().type('Automation update Last Name');
});
Then("a validation error message for 'Title' is displayed", () => {
    changeOfName.personTitleError().should('contain.text', 'You must select a title to proceed');
});