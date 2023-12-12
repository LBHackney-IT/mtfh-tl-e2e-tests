import { Given, Then, When, And } from "@badeball/cypress-cucumber-preprocessor"
import PropertyPageObjects from "../../pageObjects/propertyPage";
import ManagePatchesPageObjects from "../../pageObjects/managePatchesPage";
import { faker } from '@faker-js/faker';

const propertyPage = new PropertyPageObjects();
const managePatchesPage = new ManagePatchesPageObjects();

When('I click on the manage patches button', () => {
    propertyPage.managePatchesButton().click();
});

Then('the manage patches page is displayed', () => {
    cy.findByText('Patches and areas').should('be.visible');
});

And('the area dropdown is displayed', () => {
    managePatchesPage.getAreaDropdown().should('be.visible');
});

And('the patches table is displayed', () => {
    var name = 'SN Area';
    managePatchesPage.getPatchRow(name).should('be.visible');
});

When('I visit the manage patches page directly', () => {
    managePatchesPage.visit();
});

Then("I can see a row for patch {string}", (patchName) => {
    managePatchesPage.getPatchRow(patchName).should('be.visible');
});

And("I cannot see a row for patch {string}", (patchName) => {
    if (!patchName) return;
    managePatchesPage.getPatchRow(patchName).should('not.exist');
});

Then("I can see a row for patch {string} with officer name {string} and email address {string}", (patchName, officerName, officerEmail) => {
    var patchRow = managePatchesPage.getPatchRow(patchName);
    patchRow.should('be.visible');
    patchRow.should('contain', officerName);
    patchRow.should('contain', officerEmail);
    if (!officerName && !officerEmail) {
        patchRow.should('not.contain', "@hackney.gov.uk");
    }
});

When("I select {string} from the area dropdown", (areaOption) => {
    managePatchesPage.getAreaDropdown().select(areaOption);
  });

And("I reassign {string} to a new officer with name {string} and email address {string}", (patchName, officerName, officerEmail) => {
    if (!officerName && !officerEmail) {
        managePatchesPage.unassignPatch(patchName);
        return;
    }
    managePatchesPage.reassignPatch(patchName, officerName, officerEmail);
});

And("I click the confirm button on the row", () => {
    managePatchesPage.confirmReassignment();
});

Then("I can see a success message for patch reassignment", () => {
    cy.scrollTo('top');
    managePatchesPage.getSuccessMessage().should('be.visible');
});

When("I click on the back link", () => {
    managePatchesPage.backLink().click();
});

