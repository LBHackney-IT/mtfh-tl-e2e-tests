import { When, Then, And } from "cypress-cucumber-preprocessor/steps";
import asset from '../../../api/asset'
import { property } from "../../../environment-config";
import PropertyPageObjects from "../../pageObjects/propertyPage";

const propertyPage = new PropertyPageObjects();

And("I click on the view tenure button", () => {
  propertyPage.viewTenureButton().click();
  cy.url().should("include", "tenure");
});

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
 Then("Tenure information displays status as Active", () => {
    propertyPage.tenureStatus().should('be.visible');
 });
Then("New Tenure button should be displayed", () => {
    propertyPage.newTenureButton().should('be.visible');
});
