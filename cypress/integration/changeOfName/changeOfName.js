import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import ChangeOfNamePageObjects from '../../pageObjects/changeOfNamePage';
import homePage from "../../pageObjects/homePage";
import {searchPersonResults} from "../../support/searchPersonResults";
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";
import TenureReviewDocsPageObjects from "../../pageObjects/tenureReviewDocumentsPage";
import ReviewApplicationPageObjects from "../../pageObjects/reviewApplicationPage";
import ModalPageObjects from "../../pageObjects/sharedComponents/modal";
const modal = new ModalPageObjects();
const changeOfName = new ChangeOfNamePageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();
const tenureReviewDocsPage = new TenureReviewDocsPageObjects();
const reviewAppPage = new ReviewApplicationPageObjects();


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
    changeOfName.personFirstName().type('Automation Test Edit First Name');
    changeOfName.personLastName().type('Automation Test Edit Last Name');
});
When("I click on Next button", () => {
    changeOfName.buttonNext().click();
});
Then("I am on the supporting documents page", () => {
    cy.contains('Checking supporting documents');
    cy.contains('Tenant declaration');
    cy.get('[data-testid=declaration]');
    changeOfName.statusActiveCheck().should('contain.text', "Request Documents");
});
When("I select Request Documents electronically and click on Next button", () => {
    tenureReqDocsPage.requestDocsElectronically().click();
    changeOfName.checkBoxTenantDeclaration().click();
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
    changeOfName.checkBoxTenantDeclaration().click();
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
    changeOfName.personFNameError().should('contain.text', "You must enter the tenant's first name");
    changeOfName.personLNameError().should('contain.text', "You must enter the tenant's last name");
});
When("I enter 'Title' and 'First name' only", () => {
    changeOfName.personTitle().select('Mr');
    changeOfName.personFirstName().clear().type('Automation update First Name');
});
Then("a validation error message for 'Last name' is displayed", () => {
    changeOfName.personLNameError().should('contain', "You must enter the tenant's last name");
});
When("I enter 'Title' and 'Last name' only", () => {
    changeOfName.personTitle().select('Mr');
    changeOfName.personLastName().clear().type('Automation update Last Name');
    changeOfName.personFirstName().clear();
});
Then("a validation error message for 'First name' is displayed", () => {
    changeOfName.personFNameError().should('contain.text', "You must enter the tenant's first name");
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
When("I select only the first option to confirm I have seen all the documents", () => {
    tenureReviewDocsPage.photoId().click();
});
Then("a validation error message is displayed", () => {
    changeOfName.errorReviewDocuments().should('exist');
});
Then("a validation error message for AHM {string} is displayed", (errorMessg) => {
    changeOfName.errorAreaHousingManagerName().should('exist');
})
When("I select all the checkboxes to confirm I have seen all the documents", () => {
    tenureReviewDocsPage.photoId().uncheck();
    tenureReviewDocsPage.photoId().click();
    tenureReviewDocsPage.secondId().click();
    changeOfName.checkBoxValidExampleOfOne().click();
});
Then("I am on the {string} page", (text) => {
    cy.contains(text);
    cy.contains('Supporting documents approved');
    changeOfName.linkDes().should('exist');
});
When("I select Submit case button", () => {
    changeOfName.buttonSubmitCase().click();
});
Then("I am on the 'Next Steps' page", () => {
    cy.contains('Next Steps:');
});
When("I click on 'Continue' button", () => {
    cy.contains('Continue').click();
})
Then("I am on the Review Application page", () => {
    cy.contains('What is the recommended outcome?*');
});
When("I recommend the outcome as 'Approve'", () => {
    changeOfName.outcomeTenureApprove().click();
});
When("I recommend the outcome as 'Decline'", () => {
    changeOfName.outcomeTenureDecline().click();
});
When("I select 'I confirm that the tenure investigation has been completed'", () => {
    changeOfName.checkboxConfirmTenureInvest().click();
});
When("I click on 'Confirm' button", ()=>{
    cy.contains('Confirm').click();
});
When("I enter Area Housing Manager name as 'Test Housing Manager'", () => {
    changeOfName.ahmNameInput().clear().type('AHM Test Manager');
});
When("I click 'Confirm' button", () => {
    cy.contains('Confirm').click();
});
Then("I am on the HO and AHM approved page", () => {
    cy.contains('Supporting documents approved');
    cy.contains('Tenure investigator recommendation: Approve application');
    cy.contains('Housing Officer reviewed and Area Housing Manager: Approve application');
});
When("I select the option 'I have passed the case to the Area Housing Manager'", () => {
    changeOfName.optionAHMReview().click();
});
When("I select decision as 'Approve'", () => {
    changeOfName.ahmDecisionApprove().click();
});
When("I select decision as 'Decline'", () => {
    changeOfName.ahmDecisionDecline().click();
});
When("I confirm 'I confirm that this is an instruction received by the Area Housing Manager'", () => {
    changeOfName.ahmConfirmBox().click();
});
When("I do not confirm the Tenant declaration checkbox and I click on Next button", () => {
    tenureReqDocsPage.requestDocsElectronically().click();
    changeOfName.buttonNext().click();
});
Then("Tenant declaration validation message is displayed", () => {
    changeOfName.errorTenantDeclaration().should('contain','You must select an option to proceed');
});
Then("a modal dialog box is displayed", () => {
    modal.modalBody().should('be.visible');
    modal.modalBody().should('contain', 'Approve change of name application?');
    modal.modalReason().type('I approve this application because the documents are sufficient');
    reviewAppPage.confirmationModalApprove().click();
});
Then("I am on the HO and AHM Declined page", () => {
    cy.contains('Supporting documents approved');
    cy.contains('Tenure investigator recommendation: Decline application');
    cy.contains('Housing Officer reviewed and Area Housing Manager: Approve application');
    cy.contains('I approve this application because the documents are sufficient');
});
When("I select the Case activity history button", () => {
    cy.contains('Case activity history').click();
});
Then("I can see the Case details recorded", () => {
    cy.contains('Change of Name: Application approved');
});
When("I click Close activity history button", () => {
    cy.contains('Close activity history').click();
});
When("I click on Close Case button", () => {
    cy.contains('Close Case').click();
});
Then("modal dialog is displayed with 'Reason for close case'", () => {
    modal.modalBody().should('be.visible');
    modal.modalBody().should('contain', 'Are you sure you want to close this process? You will have to begin the process from the start.');
});
When("I enter the reason and I click on Close case button", () => {
    modal.modalReasonChangeOfName().type('I Close this application because the documents provided are not sufficient and Tenant is not responding');
    modal.modalCloseCaseChangeOfName().click();
});
Then("'Review Documents' page is displayed with message 'Change of name application will be closed' and reason", () => {
    cy.contains('Change of name application will be closed');
    cy.contains('I Close this application because the documents provided are not sufficient and Tenant is not responding');
});
When("I select checkbox to confirm outcome letter and I click on Confirm button", () => {
    tenureReviewDocsPage.checkboxConfirmOutcomeLetter().click();
    cy.contains('Confirm').click();
});
Then("{string} message is displayed", (text) => {
    cy.contains(text);
});
Then("I can see the Case details recorded for 'Process closed'", () => {
    cy.contains('Change of Name closed:');
})

