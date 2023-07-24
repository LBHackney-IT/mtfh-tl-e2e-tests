import { And, Given, Then, When, } from "@badeball/cypress-cucumber-preprocessor";
import { generateAsset } from "../../../api/models/requests/createAssetModel";
import { addTestRecordToDatabase, getAssetViewUrlByGuid } from "../common/common";
import { baseUrl } from "../../../environment-config";

const newAddressLine1Value = 'NEW ADDRESS LINE 1'

Given("I am on the MMH 'Edit property address' page for the asset", () => {
    cy.getAssetFixture().then(asset => {
        cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
        cy.intercept('GET', `*/api/v1/addresses?uprn=${asset.assetAddress.uprn}`, { fixture: 'address.json', }).as('getAddress')

        cy.visit(getAssetEditUrlByGuid(asset.id))

        cy.wait('@getAsset')
        cy.wait('@getAddress')
    })
});

Given("I am on the MMH 'Edit property address' page, but the LLPG address fails to be retrieved", () => {
    cy.getAssetFixture().then(asset => {
        cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
        cy.intercept('GET', `*/api/v1/addresses?uprn=${asset.assetAddress.uprn}`, { forceNetworkError: true }).as('getAddress')

        cy.visit(getAssetEditUrlByGuid(asset.id))

        cy.wait('@getAsset')
        cy.wait('@getAddress')
    })
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

Then("I click on 'Update to this address' button, and the PATCH requests are successful", () => {
    cy.getAssetFixture().then(asset => {
        cy.intercept('PATCH', `*/api/v1/assets/${asset.id}/address`).as('patchAddress')
        cy.intercept('PATCH', `*/api/v1/asset/${asset.assetId}`, { statusCode: 204 }).as('updateAssetDetails')

        cy.contains('Update to this address').click()
    })
})

Then("I click on 'Update to this address' button, and the PATCH requests fail", () => {
    cy.getAssetFixture().then(asset => {
        cy.intercept('PATCH', `*/api/v1/assets/${asset.id}/address`, { forceNetworkError: true }).as('patchAddress')
        cy.intercept('PATCH', `*api/v1/asset/${asset.assetId}`, { forceNetworkError: true }).as('updateAssetDetails')

        cy.contains('Update to this address').click()
    })
})

And("I can see the address line 1 of the 'Current address' has changed successfully", () => {
    cy.wait(['@patchAddress', '@updateAssetDetails'])
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

When("I view the asset in MMH", () => {
    cy.getAssetFixture().then(asset => {
        cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
        cy.intercept('GET', `*/api/v2/notes?pageSize=5&targetId=${asset.id}`, { fixture: "asset-notes.json", statusCode: 200 }).as('getNotes')

        cy.visit(getAssetViewUrlByGuid(asset.id))

        cy.wait('@getAsset')
        cy.wait('@getNotes')
    })
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

Given("I seeded the database with an asset with no valid UPRN", () => {
    const testAsset = generateAsset(undefined, "");
    addTestRecordToDatabase("Assets", testAsset);
})

Given("I seeded the database with an asset with a valid UPRN", () => {
    const testAsset = generateAsset(undefined);
    addTestRecordToDatabase("Assets", testAsset);
})