import { Given, And, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import CautionaryAlertsPageObjects from '../../pageObjects/cautionaryAlertsPage'
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage"

const cautionaryAlertPO = new CautionaryAlertsPageObjects();
const tenureReqDocsPO = new TenureRequestDocsPageObjects();

When("I click on Add cautionary alert link", () => {
    cautionaryAlertPO.addCautionaryAlertLink().click();
});
Then("I am taken to the Add cautionary alert page", () => {
    cautionaryAlertPO.pageHeaderCautionaryAlert().should('contain', 'Add cautionary alert for')
});
When("I enter Assure reference", () => {
    cautionaryAlertPO.assureReference().type('121212');
});
And("I enter Date of Incident as Day Month and Year", () => {
    tenureReqDocsPO.day().clear().type('01');
    tenureReqDocsPO.month().clear().type('12');
    tenureReqDocsPO.year().clear().type('2022');
});
And("select Type of Caution", () => {
    cautionaryAlertPO.typeOfCaution().select('Verbal Abuse');
});
And("I enter Description of Incident", () => {
    cautionaryAlertPO.descriptionOfIncident().clear().type('This is a test incident for verbal abuse happened on the date above')
});
And("I click on Save and Continue button", () => {
    cy.contains('Save and continue').click();
});

Then("Validation error messages is displayed for Assure reference", () => {
    cautionaryAlertPO.assureReferenceFieldErrorMessg().should('contain','Enter an Assure reference');
});
And("Validation error messages is displayed for Date of Incident", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain','Enter date of incident');
});
And("Validation error messages is displayed for Type of Caution", () => {
    cautionaryAlertPO.selectTypeOfCautionFieldErrorMessg().should('contain','Select a type of caution');
});
And("Validation error messages is displayed for Description of Incident", () => {
    cautionaryAlertPO.descriptionOfIncidentFieldErrorMessg().should('contain','Enter description of incident');
});
And("I enter only Day for Date of Incident", () => {
    tenureReqDocsPO.day().clear().type('10');
});
Then("Validation error messages is displayed for Month and Year", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text', 'Date of incident must include a month and year')
});
When("I enter only Day and Month for Date of Incident", () => {
    tenureReqDocsPO.day().clear().type('01');
    tenureReqDocsPO.month().clear().type('12');
    tenureReqDocsPO.year().clear();
});
Then("Validation error messages is displayed for Year", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text','Date of incident must include a year');
});
When("I enter only Day and Year for Date of Incident", () => {
    tenureReqDocsPO.day().clear().type('10');
    tenureReqDocsPO.month().clear();
    tenureReqDocsPO.year().clear().type('2022');
});
Then("Validation error messages is displayed for Month", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text','Date of incident must be a real date');
});
When("I enter only Month and Year for Date of Incident", () => {
    tenureReqDocsPO.day().clear();
    tenureReqDocsPO.month().clear().type('12');
    tenureReqDocsPO.year().clear().type('2022');
});
Then("Validation error messages is displayed for Day", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text','Date of incident must include a day');
});
When("I enter Future date", () => {
    tenureReqDocsPO.day().clear().type('10');
    tenureReqDocsPO.month().clear().type('06');
    tenureReqDocsPO.year().clear().type('2040');
});
Then("Validation error message is displayed", () => {
    cautionaryAlertPO.dateOfIncidentFieldErrorMessg().should('contain.text','Date of incident must be today or in the past');
});
Then("I am on Check and confirm cautionary alert page", () => {
    cautionaryAlertPO.pageHeaderCautionaryAlert().should('contain.text', 'Check and confirm cautionary alert for');
});
And("the Cautionary alert details are displayed", () => {
    cy.contains('Assurance Reference');
    cy.get(':nth-child(1) > .govuk-summary-list__value').should('contain.text',121212);
    cy.contains('Date of incident');
    cy.get(':nth-child(2) > .govuk-summary-list__value').should('contain.text','01 12 2022');
    cy.contains('Type of caution');
    cy.get(':nth-child(3) > .govuk-summary-list__value').should('contain.text','Verbal Abuse');
    cy.contains('Description');
    cy.get(':nth-child(4) > .govuk-summary-list__value').should('contain.text','This is a test incident for verbal abuse happened on the date above');
});
When("I click on Save cautionary alert button", () => {
    cy.contains('Save cautionary alert').click();
});
And("I can see the section Cautionary Alerts with a Red bell icon", () => {
    cautionaryAlertPO.redBellIconAlert().should('exist');
})
And('I can see the Cautionary Alert type', () => {
    cy.contains('Verbal Abuse');
})
