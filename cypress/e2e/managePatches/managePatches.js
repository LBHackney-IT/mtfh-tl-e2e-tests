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

Then("I can see a row for patch {string} with a name and email address", (patchName) => {
    var patchRow = managePatchesPage.getPatchRow(patchName);
    patchRow.should('be.visible');
    patchRow.should('contain', "FAKE_");
    patchRow.should('contain', "@hackney.gov.uk");
});

When("I select {string} from the area dropdown", (areaOption) => {
    managePatchesPage.getAreaDropdown().select(areaOption);
  });

And("I reassign {string} to a new officer", (patchName) => {
    var fakeFirstName = faker.name.firstName();
    var fakeLastName = faker.name.lastName();
    var fakeName = `FAKE_${fakeFirstName} FAKE_${fakeLastName}`;
    var fakeEmail = `${fakeFirstName.toLowerCase()}.${fakeLastName.toLowerCase()}@hackney.gov.uk`; 
    managePatchesPage.reassignPatch(patchName, fakeName, fakeEmail);
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

