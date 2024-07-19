import { generateAsset } from "../../api/models/requests/createAssetModel";
import { addTestRecordToDatabase } from "../helpers/DbHelpers";
import PropertyPageObjects from "../pageObjects/propertyPage";
import RelatedAssetsPageObjects from "../pageObjects/relatedAssetsPage";


const relatedAssetsPage = new RelatedAssetsPageObjects();
const propertyPage = new PropertyPageObjects();
const tags = ['@property', '@authentication', '@common', '@root', '@search']

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

describe('Related assets', {'tags': tags}, ()=>{
    beforeEach(() => {
        cy.login();
        const testAsset = generateAsset();
        addTestRecordToDatabase("Assets", testAsset, { id: testAsset.id });
    });

    it('should not display link to related asset page', () => {
        cy.generateCustomTemporaryFixture(generateChildrenAssetsFixture(2));

        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/search/assetrelationships?searchText=${asset.id}&pageSize=1000`, { fixture: "CustomTemporaryFixture.json" }).as('getChildrenAssets')
            propertyPage.visit(asset.id);
            cy.wait('@getChildrenAssets')
            relatedAssetsPage.relatedAssetLinkToPage().should("not.exist")
        })
    })

    it('should display link to related asset page', ()=> {
        cy.generateCustomTemporaryFixture(generateChildrenAssetsFixture(5));

        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/search/assetrelationships?searchText=${asset.id}&pageSize=1000`, { fixture: "CustomTemporaryFixture.json" }).as('getChildrenAssets')
            propertyPage.visit(asset.id);
            cy.wait('@getChildrenAssets')
            relatedAssetsPage.relatedAssetLinkToPage().should("exist").and('be.visible')
            relatedAssetsPage.visit(asset.id)
            cy.wait('@getChildrenAssets')
            relatedAssetsPage.relatedAssetHeading().should('be.visible')
            relatedAssetsPage.propertyAddress().should('be.visible')
            relatedAssetsPage.propertyAssetType().should('be.visible')
            relatedAssetsPage.relatedAssetItemsByType().should('be.visible')
            relatedAssetsPage.relatedAsset().should('be.visible')
        })
    })

    it('should show message when no related asset', ()=> {
        const testAsset = generateAsset();

        // Remove any parent asset information
        testAsset.assetLocation.parentAssets = []
        testAsset.parentAssetIds = "null"

        addTestRecordToDatabase("Assets", testAsset, { id: testAsset.id });

        cy.generateCustomTemporaryFixture(generateChildrenAssetsFixture(0));

        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/search/assetrelationships?searchText=${asset.id}&pageSize=1000`, { fixture: "CustomTemporaryFixture.json" }).as('getChildrenAssets')
            relatedAssetsPage.visit(asset.id)

            cy.wait('@getChildrenAssets')
            relatedAssetsPage.noRelatedAssetMessage().should('be.visible')
            relatedAssetsPage.noRelatedAssetMessage().should('have.text', "There are no related assets for this property.")
        })
    })

    it('should error when request fails to retrive children asset', ()=> {
        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/search/assetrelationships?searchText=${asset.id}&pageSize=1000`, { forceNetworkError: true }).as('getChildrenAssets')
            relatedAssetsPage.visit(asset.id)
            cy.wait('@getChildrenAssets')
            relatedAssetsPage.unableToRetrieveChildrenAssetsError().should('be.visible')
            cy.contains("There was a problem retrieving related children assets for the property").should('be.visible')

        })

    })

    it('should error when request fails', ()=> {
        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/assets/${asset.id}`, { forceNetworkError: true }).as('getAsset')
            relatedAssetsPage.visit(asset.id)
            cy.wait('@getAsset')
            relatedAssetsPage.unableToRetrieveAssetError().should('be.visible')
        })
    })

    



})