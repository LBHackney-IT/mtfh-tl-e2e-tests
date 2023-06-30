import { And, Given, Then, When, } from "@badeball/cypress-cucumber-preprocessor";
import { getAsset } from "../../../api/models/requests/createAssetModel";
import { addTestAssetToDatabase, getAssetViewUrlByGuid } from "../common/common";
import { baseUrl } from "../../../environment-config";

const propertyUprn = "100023014215"
const propertyAssetId = getAsset("Test", "Test").assetId;
const newAddressLine1Value = 'NEW ADDRESS LINE 1'

Given("I am on the MMH 'Edit property address' page, for asset with GUID {string}", (assetGuid) => {
    cy.intercept('GET', `*/api/v1/assets/${assetGuid}`).as('getAsset')
    cy.intercept('GET', `*/api/v1/addresses?uprn=${propertyUprn}`, { fixture: 'address.json', }).as('getAddress')

    cy.visit(getAssetEditUrlByGuid(assetGuid))

    cy.wait('@getAsset')
    cy.wait('@getAddress')
});

Given("I am on the MMH 'Edit property address' page, for asset with GUID {string}, but the LLPG address fails to be retrieved", (assetGuid) => {
    cy.intercept('GET', `*/api/v1/assets/${assetGuid}`).as('getAsset')
    cy.intercept('GET', `*/api/v1/addresses?uprn=${propertyUprn}`, { forceNetworkError: true }).as('getAddress')

    cy.visit(getAssetEditUrlByGuid(assetGuid))

    cy.wait('@getAsset')
    cy.wait('@getAddress')
});

Given("that the property has no valid UPRN, I can see a disabled button that says 'Cannot edit: UPRN missing'", () => {
    cy.contains('Cannot edit: UPRN missing').should('be.visible')
})

Given("that the property has a valid UPRN, I can see a button that says 'Edit address details'", () => {
    cy.contains('Edit address details').should('be.visible')
})

Then("I should see the heading 'Edit property address', and property details for the 'Suggestion from the Local Gazetteer' and the 'Current address'", () => {
    cy.contains('Edit property address').should('be.visible')
    cy.contains('Suggestion from the Local Gazetteer').should('be.visible')
    cy.contains('Current address').should('be.visible')
})

And("the 'Update to this address' and 'Cancel' buttons are present, along with a 'Back to asset' link at the top", () => {
    cy.contains('Update to this address').should('be.visible')
    cy.contains('Cancel').should('be.visible')
    cy.contains('Back to asset').should('be.visible')
})

And("I edit the address line 1 of the address", () => {
    cy.get('[data-testid="address-line-1"]').clear().type(newAddressLine1Value)
})

Then("I click on 'Update to this address' button, and the PATCH requests are successful for asset with GUID {string}", (assetGuid) => {
    cy.intercept('PATCH', `*api/v1/asset/${propertyAssetId}`, { statusCode: 204 }).as('updateAssetDetails')

    cy.contains('Update to this address').click()

    cy.wait('@updateAssetDetails')
})

Then("I click on 'Update to this address' button, and the PATCH requests fail for asset with GUID {string}", (assetGuid) => {
    cy.intercept('PATCH', `*/api/v1/assets/${assetGuid}/address`, { forceNetworkError: true }).as('patchAddress')
    cy.intercept('PATCH', `*api/v1/asset/${propertyAssetId}`, { forceNetworkError: true }).as('updateAssetDetails')

    cy.contains('Update to this address').click()

    cy.wait('@patchAddress')
    cy.wait('@updateAssetDetails')
})

And("I can see the address line 1 of the 'Current address' has changed successfully", () => {
    cy.get('[data-testid="asset-address-line-one"]').should('have.value', newAddressLine1Value)
})

And("I can see a success message at the top of the screen", () => {
    cy.contains('The asset address has been updated successfully.').should('be.visible')
})

And("the 'Update to this address' and 'Cancel' buttons should be replaced by the 'Back to asset view' button", () => {
    cy.contains('Back to asset view').should('be.visible')
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
    cy.get('[data-testid="address-line-1"]').should('be.enabled').and('have.value', "")
    cy.get('[data-testid="address-line-2"]').should('be.enabled').and('have.value', "")
    cy.get('[data-testid="address-line-3"]').should('be.enabled').and('have.value', "")
    cy.get('[data-testid="address-line-4"]').should('be.enabled').and('have.value', "")
    cy.get('[data-testid="postcode"]').should('be.enabled').and('have.value', "")
})

And("the 'Update to this address' button should be enabled", () => {
    cy.contains('Update to this address').should('be.enabled')
})

When("I view the asset with GUID {string}, in MMH", (assetGuid) => {
    cy.intercept('GET', `*/api/v1/assets/${assetGuid}`).as('getAsset')
    cy.intercept('GET', `*/api/v2/notes?pageSize=5&targetId=${assetGuid}`, { fixture: "asset-notes.json", statusCode: 200 }).as('getNotes')
    cy.visit(getAssetViewUrlByGuid(assetGuid))
    cy.wait('@getAsset')
    cy.wait('@getNotes')
});

Then("I click on the 'Back to asset view' button", () => {
    cy.contains('Back to asset view').should('be.visible').click()
})

And("I should see the edited address", () => {
    cy.contains(newAddressLine1Value).should('be.visible')
})


// Helper methods

const getAssetEditUrlByGuid = (assetGuid) => {
    return `${baseUrl}/property/edit/${assetGuid}/`
}

// Database seed methods

Given("I seeded the database with an asset with GUID {string}, and with no valid UPRN", (assetGuid) => {
    cy.log("Seeding database").then(async () => {
        const testAsset = getAsset(assetGuid, "");

        cy.log("Adding test asset to database and creating a record of it in recordsToDelete.json file")
        await addTestAssetToDatabase(testAsset);
    })
})

Given("I seeded the database with an asset with GUID {string}, and with a valid UPRN", (assetGuid) => {
    cy.log("Seeding database").then(async () => {
        const testAsset = getAsset(assetGuid, propertyUprn);

        cy.log("Adding test asset to database and creating a record of it in recordsToDelete.json file")
        await addTestAssetToDatabase(testAsset);
    })
})