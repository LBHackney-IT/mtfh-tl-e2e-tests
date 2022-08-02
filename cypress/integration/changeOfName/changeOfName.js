import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import ChangeOfNamePageObjects from '../../pageObjects/changeOfNamePage';
import homePage from "../../pageObjects/homePage";
import {searchPersonResults} from "../../support/searchPersonResults";
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";
import TenureReviewDocsPageObjects from "../../pageObjects/tenureReviewDocumentsPage";
const changeOfName = new ChangeOfNamePageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();
const tenureReviewDocsPage = new TenureReviewDocsPageObjects();

Given("I am on the MMH home page", () => {
    changeOfName.visitHomePage();
    //cy.visit("https://manage-my-home-staging.hackney.gov.uk");
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
Then("I am on the Person search results page for {string}", (personSearch) => {
    cy.findAllByText('Search Results').should('exist');
    searchPersonResults(personSearch);
});

When("I select person", () => {
    cy.get('@searchPersonResult').then(res => {
            for (let i = 0; i < res.results.persons.length; i++) {
                let person = res.results.persons[i];
                if (person.tenures[0].type === "Secure" && person.tenures[0].isActive === true) {
                    cy.log(person.firstname);
                    let title;
                    if(person.title === 'Ms' || person.title === 'Mrs')
                    {
                        title = person.title + "."
                    }
                    else title = person.title;
                    let fullname = title + " " + person.firstname + " " + person.surname;
                    cy.findByRole('link', {name:fullname}).click();
                    break;
                } else {
                    i++;
                }
            }
    });

})


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
When("I select Request Documents electronically and click on Next button", () => {
    tenureReqDocsPage.requestDocsElectronically().click();
    cy.contains('Next').click();
});
When("I select 'I have made an appointment to check supporting documents' and click on Next button", () => {
    tenureReqDocsPage.makeAnAppointToCheckSuppDocs().click();
    tenureReqDocsPage.day().type('31');
    tenureReqDocsPage.month().type('12');
    tenureReqDocsPage.year().type('2023')
    tenureReqDocsPage.hour().type('11');
    tenureReqDocsPage.minute().type('20');
    tenureReqDocsPage.ampm().select('AM');
    cy.contains('Next').click();
})
Then("Status Stepper is at {string}", (status) => {
    changeOfName.statusActiveCheck().should('be.visible');
    changeOfName.statusActiveCheck().should('contain.text', status);
})
When('I enter Title only', () => {
    changeOfName.personTitle().select('Mr');
});
Then("a validation error message for 'First name' and 'Last name' are displayed", () => {
    changeOfName.personFNameError().should('contain.text', 'You must enter a first name for this person');
    changeOfName.personLNameError().should('contain.text', 'You must enter a last name for this person');
});
When("I enter 'Title' and 'First name' only", () => {
    changeOfName.personTitle().select('Mr');
    changeOfName.personFirstName().clear().type('Automation update First Name');
});
Then("a validation error message for 'Last name' is displayed", () => {
    changeOfName.personLNameError().should('contain', 'You must enter a last name for this person');
});
When("I enter 'Title' and 'Last name' only", () => {
    changeOfName.personTitle().select('Mr');
    changeOfName.personLastName().clear().type('Automation update Last Name');
    changeOfName.personFirstName().clear();
});
Then("a validation error message for 'First name' is displayed", () => {
    changeOfName.personFNameError().should('contain.text', 'You must enter a first name for this person');
});
When("I enter 'First name' and 'Last name' only", () => {
    changeOfName.personTitle().select('Select a title');
    changeOfName.personFirstName().clear().type('Automation update First Name');
    changeOfName.personLastName().clear().type('Automation update Last Name');
});
Then("a validation error message for 'Title' is displayed", () => {
    changeOfName.personTitleError().should('contain.text', 'You must select a title to proceed');
});
Then("'Review Documents' page is displayed", () => {
    cy.contains('Use the form below to record the documents you have checked:');
});
Then("'Office appointment scheduled' message box is displayed", () => {
    cy.contains('Office appointment scheduled');
    cy.contains('Date:');
    cy.contains('Time:');
});
