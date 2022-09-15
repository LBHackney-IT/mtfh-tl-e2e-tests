import { When, Then, And } from "cypress-cucumber-preprocessor/steps";
import asset from '../../../api/asset'
import { property } from "../../../environment-config";
import PropertyPageObjects from "../../pageObjects/propertyPage";
import PersonPageObjects from "../../pageObjects/personPage";

const propertyPage = new PropertyPageObjects();
const personPage = new PersonPageObjects();

When("I click on the view tenure button", () => {
  propertyPage.viewTenureButton().click();
});
Then("tenure page is displayed", () => {
    cy.url().should("include", "tenure");
})

const assetModel = require('../../../api/models/responses/assets/assetModel')

Given('I check the asset API with a valid assetType {string}', async (assetId) => {
    const getResponse = await asset.getAsset(assetId)
    cy.log(`Status code ${getResponse.status} returned`)
    assert.deepEqual(getResponse.status, 200)
    assert.deepEqual(getResponse.data.assetType, assetModel.assetModelWithValidAssetType.assetType)
})

Given('I check the asset API with an invalid assetType {string}', async (assetId) => {
    const getResponse = await asset.getAsset(assetId)
    cy.log(`Status code ${getResponse.status} returned`)
    assert.deepEqual(getResponse.status, 200)
    assert.deepEqual(getResponse.data.assetType, assetModel.assetModelWithInvalidAssetType.assetType)
})

When('I navigate to the asset page {string}', (assetId) => {
    propertyPage.visit(assetId)
})

And('I am shown an error message', () => {
    propertyPage.propertyPage().contains('could not be loaded.')
})

Then('the repairs container is displayed', () => {
    propertyPage.repairsSelectionBox().should('be.visible')
    propertyPage.repairsList().should('be.visible')
})

Then('I set the the repair type to {string}', (repairType) => {
    propertyPage.repairsSelectionBox().select(`repairs ${repairType.toLowerCase()}`)
})

And('the repairs card list is displayed {string}', (repairType) => {
    propertyPage.repairsCardList().contains(repairType)
})
Then("Tenure information displays status as Inactive", () => {
  propertyPage.tenureStatusInactive().should('be.visible');
});
Then("No tenure is displayed", () => {
  cy.contains("No tenure")
});
Then("New Tenure button should be displayed", () => {
    propertyPage.newTenureButton().should('be.visible');
});

Then("I am on the Tenure search results page for {string}", (tenure) => {
    cy.findAllByText('Search Results').should('exist');
});
When("I select tenure", () => {
    propertyPage.selectFirstRecord().click();
});
Then('the personal details are displayed' ,() => {
    personPage.sidebar().contains('Date of birth');
    personPage.sidebar().contains('Correspondence address 1');
});
When("I select a property", () => {
    propertyPage.selectFirstRecord().click();
})