import { And, Given, Then, When, } from "@badeball/cypress-cucumber-preprocessor";
import { generateAsset } from "../../../api/models/requests/createAssetModel";
import { addTestRecordToDatabase, getAssetViewUrlByGuid } from "../common/common";
import { baseUrl } from "../../../environment-config";

Given("I am on the MMH 'Edit asset ownership' page for the asset", () => {
    cy.getAssetFixture().then(asset => {
        cy.visit(getAssetOwnershipEditUrlByGuid(asset.id))
    })
});

Then("I see a section about the asset ownership", () => {
    cy.get('[data-testid="ownership-info-heading"]').should('be.visible')
    cy.get('[data-testid="ownership-info"]').should('be.visible')
    cy.get('[data-testid="edit-ownership-info-button"]').should('be.visible')
})

Then("I can access the form to change the ownership of the asset by clicking on the button", () => {
    cy.get('[data-testid="edit-ownership-info-button"]').click()
})

Then("I am taken to the 'Edit asset ownership' form", () => {
    cy.getAssetFixture().then(asset => {
        cy.url().should('include', `property/${asset.id}/edit-asset-ownership`)
    })
})

Then("I can see two radio options to change the ownership of the asset", () => {
    cy.get('[data-testid="is-council-property-no"]').should('exist').and('be.enabled')
    cy.get('[data-testid="is-council-property-yes"]').should('exist').and('be.enabled')
})

Then("I can see the 'Confirm change' and 'Back to asset' buttons", () => {
    cy.get('[data-testid="submit-edit-ownership-button"]').should('be.visible')
    cy.get('[data-testid="cancel-edit-ownership-button"]').should('be.visible')
})

Then("I see one of the radio buttons is already checked, to display the current asset ownership", () => {
    // Based on whether the asset's current value of isCouncilProperty
    cy.getAssetFixture().then(asset => {
        if (asset.assetManagement.isCouncilProperty) {
            cy.get('[data-testid="is-council-property-yes"]').should('be.checked')
            cy.get('[data-testid="is-council-property-no"]').should('not.be.checked')
        }
        else {
            cy.get('[data-testid="is-council-property-no"]').should('be.checked')
            cy.get('[data-testid="is-council-property-yes"]').should('not.be.checked')
        }
    })
})

Given("I have not made a change yet, I should be unable to submit the form as the button is disabled", () => {
    cy.get('[data-testid="submit-edit-ownership-button"]').should('be.disabled')
})

Then("I change the ownership of the asset", () => {
    // Based on whether the asset's current value of isCouncilProperty
    cy.getAssetFixture().then(asset => {
        if (asset.assetManagement.isCouncilProperty) {
            cy.get('[data-testid="is-council-property-no"]').click()
        }
        else {
            cy.get('[data-testid="is-council-property-yes"]').click()
        }
    })
})

Then("I see that the submit button is now enabled and the 'Edit asset ownership' can be submitted", () => {
    cy.get('[data-testid="submit-edit-ownership-button"]').should('be.enabled')
})

Then("I submit the 'Edit asset ownership' form", () => {
    cy.getAssetFixture().then(asset => {
        cy.intercept('PATCH', `*/api/v1/assets/${asset.id}`).as('editAssetOwnershipRequest')
    })

    cy.get('[data-testid="submit-edit-ownership-button"]').click()
})

Then("I submit the 'Edit asset ownership' form, but an error occurs", () => {
    cy.getAssetFixture().then(asset => {
        cy.intercept('PATCH', `*/api/v1/assets/${asset.id}`, { forceNetworkError: true }).as('editAssetOwnershipRequest')
    })

    cy.get('[data-testid="submit-edit-ownership-button"]').click()
})

Then("I see a success message to confirm the asset ownership has been edited", () => {
    cy.wait('@editAssetOwnershipRequest')
    cy.get('[data-testid="ownership-edit-success"]').should('be.visible')
})

Then("I see an error message to confirm the asset ownership has NOT been edited", () => {
    cy.wait('@editAssetOwnershipRequest')
    cy.get('[data-testid="ownership-edit-failure"]').should('be.visible')
})

// Helper methods

const getAssetOwnershipEditUrlByGuid = (assetGuid) => {
    return `${baseUrl}/property/${assetGuid}/edit-asset-ownership`
}