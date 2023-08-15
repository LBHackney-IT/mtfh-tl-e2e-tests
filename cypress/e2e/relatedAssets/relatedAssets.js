import { And, Given, Then, When, } from "@badeball/cypress-cucumber-preprocessor";
import { generateAsset } from "../../../api/models/requests/createAssetModel";
import RelatedAssetsPageObjects from "../../pageObjects/relatedAssetsPage";
import { addTestRecordToDatabase } from "../common/common";

const relatedAssetsPage = new RelatedAssetsPageObjects()

const generateChildrenAssetsFixture = (numberOfChildrenAssets = 0) => {
    // Same structure as GetAssetRelationshipsResponse
    const childrenAssetsResponseObject = {
        childAssets: []
    }

    if (numberOfChildrenAssets > 0) {
        for (let i = 0; i < numberOfChildrenAssets; i++) {
            childrenAssetsResponseObject["childAssets"].push(generateAsset())
        }
    }
    return childrenAssetsResponseObject;
}

And("The asset has less than than 3 related children assets", () => {
    cy.generateCustomTemporaryFixture(generateChildrenAssetsFixture(2));

    cy.getAssetFixture().then(asset => {
        cy.intercept('GET', `*/api/v1/search/assetrelationships?searchText=${asset.id}&pageSize=1000`, { fixture: "CustomTemporaryFixture.json" }).as('getChildrenAssets')
    })
})

And("The asset has more than than 3 related children assets", () => {
    cy.generateCustomTemporaryFixture(generateChildrenAssetsFixture(5));

    cy.getAssetFixture().then(asset => {
        cy.intercept('GET', `*/api/v1/search/assetrelationships?searchText=${asset.id}&pageSize=1000`, { fixture: "CustomTemporaryFixture.json" }).as('getChildrenAssets')
    })
})

And("The asset has no related children assets", () => {
    cy.generateCustomTemporaryFixture(generateChildrenAssetsFixture(0));

    cy.getAssetFixture().then(asset => {
        cy.intercept('GET', `*/api/v1/search/assetrelationships?searchText=${asset.id}&pageSize=1000`, { fixture: "CustomTemporaryFixture.json" }).as('getChildrenAssets')
    })
})

And("The request to retrieve related children assets fails", () => {
    cy.getAssetFixture().then(asset => {
        cy.intercept('GET', `*/api/v1/search/assetrelationships?searchText=${asset.id}&pageSize=1000`, { forceNetworkError: true }).as('getChildrenAssets')
    })
})

And("The request to retrieve the asset fails", () => {
    cy.getAssetFixture().then(asset => {
        cy.intercept('GET', `*/api/v1/assets/${asset.id}`, { forceNetworkError: true }).as('getAsset')
    })
})

Then("I should not see the link to the 'Related asset page' as there are not enough children asset", () => {
    cy.wait('@getChildrenAssets')
    relatedAssetsPage.relatedAssetLinkToPage().should("not.exist")
})

Then("I should see the link to the 'Related asset page'", () => {
    cy.wait('@getChildrenAssets')
    relatedAssetsPage.relatedAssetLinkToPage().should("exist").and('be.visible')
})

When("I visit the 'Related asset page' for the asset", () => {
    cy.getAssetFixture().then(asset => {
        relatedAssetsPage.visit(asset.id)
    })
})

Then("I should see the main heading, the current property, its asset type and the related assets", () => {
    cy.wait('@getChildrenAssets')
    relatedAssetsPage.relatedAssetHeading().should('be.visible')
    relatedAssetsPage.propertyAddress().should('be.visible')
    relatedAssetsPage.propertyAssetType().should('be.visible')
    relatedAssetsPage.relatedAssetItemsByType().should('be.visible')
    relatedAssetsPage.relatedAsset().should('be.visible')
})

Then("I should see a message that says no related assets are available", () => {
    cy.wait('@getChildrenAssets')
    relatedAssetsPage.noRelatedAssetMessage().should('be.visible')
    relatedAssetsPage.noRelatedAssetMessage().should('have.text', "There are no related assets for this property.")
})

Then("I should see an error on the screen saying related children assets could not be retrieved", () => {
    cy.wait('@getChildrenAssets')
    relatedAssetsPage.unableToRetrieveChildrenAssetsError().should('be.visible')
    cy.contains("There was a problem retrieving related children assets for the property").should('be.visible')
})

Then("I should see an error on the screen saying the asset could not be retrieved", () => {
    cy.wait('@getAsset')
    relatedAssetsPage.unableToRetrieveAssetError().should('be.visible')
})

// Database seed methods

Given("I seeded the database with an asset without any parent asset information", () => {
    const testAsset = generateAsset();

    // Remove any parent asset information
    testAsset.assetLocation.parentAssets = []
    testAsset.parentAssetIds = "null"

    addTestRecordToDatabase("Assets", testAsset);
})