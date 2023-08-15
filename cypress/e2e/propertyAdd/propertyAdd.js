import { And, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { saveFixtureData } from "../../../api/helpers";
import { generateNewAsset } from "../../../api/models/requests/createAssetModel";
import { baseUrl } from "../../../environment-config";
import * as patchData from "../../fixtures/patches.json";
import { getAssetViewUrlByGuid } from "../common/common";
const { faker } = require("@faker-js/faker");

const addPropertyAddressUrl = `${baseUrl}/property/new`
const assetId = faker.random.numeric(9)
const addressLine1 = "47 Test Road"
const postcode = "MK40 2RF"
const assetGuid = faker.datatype.uuid()

Given("I am on the MMH 'New property' page", () => {
    cy.intercept('GET', '*/api/v1/patch/all', { fixture: 'patches.json', }).as('getAllPatches')
    cy.visit(addPropertyAddressUrl)
    cy.wait('@getAllPatches')
});

Then("I should see the main heading 'New Property', and the user disclaimer along with the other secondary headings: Address, Property management, Asset details", () => {
    cy.contains('New property').should('be.visible')
    cy.get('[data-testid="new-property-disclaimer"]').should('be.visible')
    cy.contains('Address').should('be.visible')
    cy.contains('Property management').should('be.visible')
    cy.contains('Asset details').should('be.visible')
})

And("the 'Create new property' and 'Cancel' buttons are present, along with a 'Back' link at the top", () => {
    cy.contains('Create new property').should('be.visible')
    cy.contains('Cancel').should('be.visible')
    cy.contains('Back').should('be.visible')
})


And("I press the 'Create new property' button without editing any of the fields", () => {
    cy.contains('Create new property').click()
})

Then("errors for the required form fields should be visible", () => {
    const requiredFieldErrors = [
        "Asset ID is a required field",
        "Asset Type is a required field",
        "Address line 1 is a required field",
        "Postcode is a required field",
        "Please select an option"
    ]

    requiredFieldErrors.forEach(error => cy.contains(error).should('be.visible'))
    cy.get('span').filter(':contains("Please select an option")').should('be.visible')
})

Then("I should see the 'Managing organisation' field populated with the default option of 'London Borough of Hackney'", () => {
    cy.get('[data-testid="managing-organisation"]').should('have.value', 'London Borough of Hackney')
})

And("I enter a value for field 'Asset ID'", () => {
    cy.get('[data-testid="asset-id"]').type(assetId)
})

And("I select an option for field 'Asset Type'", () => {
    cy.get('[data-testid="asset-type"]').select('Dwelling')
})

And("I enter a value for field 'Address line 1'", () => {
    cy.get('[data-testid="address-line-1"]').type(addressLine1)
})

And("I enter a valid value for field 'Postcode'", () => {
    cy.get('[data-testid="postcode"]').type(postcode)
})

And("I choose the option 'Yes' for field 'Is LBH property?'", () => {
    cy.get('[data-testid="is-council-property-yes"]').click()
})

And("I choose the option 'Yes' for field 'Add Default SOR Contracts'", () => {
    cy.get('[data-testid="add-default-sor-contracts-yes"]').click()
})

When("I click on 'Create new property' button, and the POST request is successful", () => {
    cy.intercept('POST', '*/api/v1/assets', (req) => { req.body = testAsset }).as('createNewAssetSuccess')

    cy.contains('Create new property').click()

    const testAsset = generateNewAsset(assetGuid, assetId);
    cy.log("The POST request will save the test asset record to the database")
    cy.log("Saving details of the test asset in recordsToDelete.json file")
    saveFixtureData("Assets", { id: testAsset.id }, testAsset)

    cy.log("Randomly generated Asset GUID:", assetGuid)
    cy.log("Randomly generated Asset ID:", assetId)

    cy.wait('@createNewAssetSuccess').its('request.method').should('deep.equal', 'POST')
})

Then("I see a success message, indicating that the asset has been created successfully", () => {
    cy.scrollTo('top');
    cy.contains('The new asset address has been successfully added.').should('be.visible')
})

When("I click on 'Create new property' button, and the POST request fails", () => {
    cy.intercept('POST', '*/api/v1/assets', { forceNetworkError: true }).as('createNewAssetFail')
    cy.contains('Create new property').click()
    cy.wait('@createNewAssetFail').its('request.method').should('deep.equal', 'POST')
})

Then("I see an error message, indicating that there was a problem creating the new asset", () => {
    cy.contains('There was a problem creating a new asset').should('be.visible')
    cy.contains('Please refresh the page and try again. If the issue persists, please contact support.').should('be.visible')
})

And("I find the Patch field heading", () => {
    cy.contains('Patches').should('be.visible');
})

And("I see one Patch dropdown field available to start with and I select a value", () => {
    cy.get('[data-testid="patch-dropdown-1"]').should('be.visible').and('have.value', null);
    cy.get('[data-testid="patch-dropdown-1"]').select(patchData[1].id);
    cy.get('[data-testid="patch-dropdown-1"]').should('have.value', patchData[1].id);
})

When("I click on the button to add another Patch dropdown field, and select a value. 2 patches in total should be visible", () => {
    cy.get('[data-testid="patch-add-link"]').should('be.visible');
    cy.get('[data-testid="patch-add-link"]').click();
    cy.get('[data-testid="patch-dropdown-2"]').should('be.visible').and('have.value', null);
    cy.get('[data-testid="patch-dropdown-2"]').select(patchData[2].id);
    cy.get('[id="property-patches-container"]').children().should('have.length', 2);
})

When("I remove the first Patch dropdown field, using the 'Remove patch' as no longer required, I should see a total of 1 Patch dropdown field", () => {
    cy.get('[data-testid="patch-remove-link-1"]').should('be.visible');
    cy.get('[data-testid="patch-remove-link-1"]').click();
    cy.get('[id="property-patches-container"]').children().should('have.length', 1);
})

Then("I should be able to view new property in MMH", () => {
    cy.intercept('GET', `*/api/v2/notes?pageSize=5&targetId=${assetGuid}`, { fixture: "asset-notes.json", statusCode: 200 }).as('getNotes')
    cy.visit(getAssetViewUrlByGuid(assetGuid))
    cy.contains(addressLine1).should('be.visible');
    cy.contains(postcode).should('be.visible');
})