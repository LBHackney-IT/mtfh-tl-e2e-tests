import { When, Then, And, Given,  } from "@badeball/cypress-cucumber-preprocessor";
import { baseUrl } from "../../../environment-config";

import PropertyPageObjects from "../../pageObjects/propertyPage";

// Works locally but causes the Circle CI pipeline to fail (webpack error)
// const assetFixtureJson = require('../../fixtures/asset.json'); 

const propertyPage = new PropertyPageObjects();

// The information below comes from asset.json (fixture)
const propertyGuid = "635ed65b-461c-4527-bb8e-485303b74c87"
const propertyUprn = "100023014215"

// Hardcoded URL pointing to a property with a valid UPRN for which editing is enabled
const editPropertyAddressUrl = `${baseUrl}/property/edit/${propertyGuid}`

const newAddressLine1Value = 'NEW ADDRESS LINE 1'

When("I select a property", () => {
    propertyPage.selectFirstRecord().click();
})

Given("I am on the MMH 'Edit property address' page", () => {
    cy.intercept('GET', `*/api/v1/assets/${propertyGuid}`, { fixture: 'asset.json', }).as('getAsset')
    cy.intercept('GET', `*/api/v1/addresses?uprn=${propertyUprn}`, { fixture: 'address.json', }).as('getAddress')

    cy.visit(editPropertyAddressUrl)

    cy.wait('@getAsset')
    cy.wait('@getAddress')
});

Given("I am on the MMH 'Edit property address' page, but the LLPG address fails to be retrieved", () => {
    cy.intercept('GET', `*/api/v1/assets/${propertyGuid}`, { fixture: 'asset.json', }).as('getAsset')
    cy.intercept('GET', `*/api/v1/addresses?uprn=${propertyUprn}`, { forceNetworkError: true }).as('getAddress')

    cy.visit(editPropertyAddressUrl)

    cy.wait('@getAsset')
    cy.wait('@getAddress')
});

Then("if the property has no valid UPRN, I can see a disabled button that says 'Cannot edit: UPRN missing'", () => {
    cy.contains('Cannot edit: UPRN missing').should('be.visible')
})

Then("if the property has a valid UPRN, I can see a button that says 'Edit address details'", () => {
    cy.contains('Edit address details').should('be.visible')
})

Then("I should see the heading 'Edit property address', and property details for the 'Suggestion from the Local Gazetteer' and the 'Current address'", () => {
    cy.contains('Edit property address').should('be.visible')
    cy.contains('Suggestion from the Local Gazetteer').should('be.visible')
    cy.contains('Current address').should('be.visible')
})

And("the 'Update to this address' and 'Cancel edit address' buttons are present, along with a 'Back to asset' link at the top", () => {
    cy.contains('Update to this address').should('be.visible')
    cy.contains('Cancel edit address').should('be.visible')
    cy.contains('Back to asset').should('be.visible')
})

And("I edit the address line 1 of the address", () => {
    cy.get('[data-testid="addressLine1"]').clear().type(newAddressLine1Value)
})

Then("I click on 'Update to this address' button, and the PATCH request is successful", () => {
    cy.intercept('PATCH', `*/api/v1/assets/${propertyGuid}/address`, { statusCode: 204 }).as('patchAddress')

    cy.contains('Update to this address').click()

    cy.wait('@patchAddress')
})

Then("I click on 'Update to this address' button, and the PATCH request fails", () => {
    cy.intercept('PATCH', `*/api/v1/assets/${propertyGuid}/address`, { forceNetworkError: true }).as('patchAddress')

    cy.contains('Update to this address').click()

    cy.wait('@patchAddress')
})

And("I can see the address line 1 of the 'Current address' has changed successfully", () => {
    cy.get('[data-testid="asset-address-line-one"]').should('have.value', newAddressLine1Value)
})

And("I can see a success message at the top of the screen", () => {
    cy.contains('The asset address has been updated successfully.').should('be.visible')
})

And("the 'Update to this address' button should be disabled", () => {
    cy.contains('Update to this address').should('be.disabled')
})

And("I should see and error indicating that the request failed", () => {
    cy.contains('There was a problem amending this asset').should('be.visible')
})

And("I should see an error message indicating that the LLPG address could not be loaded", () => {
    cy.contains('Unable to retrieve address suggestion from the Local Gazetteer').should('be.visible')
})

And("I should see a heading that says 'New address details' instead of 'Suggestion from the Local Gazetteer'", () => {
    cy.contains('New address details').should('be.visible')
})

And("the address fields, despite not being autopopulated, should be blank and editable", () => {
    cy.get('[data-testid="addressLine1"]').should('be.enabled').and('have.value', "")
    cy.get('[data-testid="addressLine2"]').should('be.enabled').and('have.value', "")
    cy.get('[data-testid="addressLine3"]').should('be.enabled').and('have.value', "")
    cy.get('[data-testid="addressLine4"]').should('be.enabled').and('have.value', "")
    cy.get('[data-testid="postcode"]').should('be.enabled').and('have.value', "")
})

And("the 'Update to this address' button should be enabled", () => {
    cy.contains('Update to this address').should('be.enabled')
})