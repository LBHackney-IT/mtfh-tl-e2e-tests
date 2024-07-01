import { seedDatabase } from "../helpers/DbHelpers";
import { generateAsset } from "../../api/models/requests/createAssetModel";
import { addTestRecordToDatabase, getAssetViewUrlByGuid, getAssetEditUrlByGuid } from "../helpers/DbHelpers";


const tags = ['@propety', '@authentication', '@common', '@root', '@search']
const newAddressLine1Value = 'TEST Hackney'
const noUprnValue = 'N/A'

describe('Edit Property', {'tags': tags}, ()=> {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should edit address enabled if asset has UPRN', ()=> {
        const testAsset = generateAsset(undefined);
        addTestRecordToDatabase("Assets", testAsset);
        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
            cy.intercept('GET', `*/api/v2/notes?pageSize=5&targetId=${asset.id}`, { fixture: "asset-notes.json", statusCode: 200 }).as('getNotes')
    
            cy.visit(getAssetViewUrlByGuid(asset.id))
    
            cy.wait('@getAsset')
            cy.wait('@getNotes')

            cy.contains(asset.assetAddress.uprn).should('be.visible')
            cy.contains('Edit address details').should('be.visible')
        })
    })

    it('should enable edit address button if asset has no valid UPRN', ()=> {
        const testAsset = generateAsset(undefined, "");
        addTestRecordToDatabase("Assets", testAsset);

        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
            cy.intercept('GET', `*/api/v2/notes?pageSize=5&targetId=${asset.id}`, { fixture: "asset-notes.json", statusCode: 200 }).as('getNotes')
    
            cy.visit(getAssetViewUrlByGuid(asset.id))
    
            cy.wait('@getAsset')
            cy.wait('@getNotes')

            cy.contains(noUprnValue).should('be.visible')
            cy.contains('Edit address details').should('be.visible')
        })

    })

    it('should present page element - address with UPRN', ()=> {
        const testAsset = generateAsset(undefined);
        addTestRecordToDatabase("Assets", testAsset);

        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
            cy.intercept('GET', `*/api/v1/addresses?uprn=${asset.assetAddress.uprn}`, { fixture: 'address.json', }).as('getAddress')
    
            cy.visit(getAssetEditUrlByGuid(asset.id))
    
            cy.wait('@getAsset')
            if (asset.assetAddress.uprn) cy.wait('@getAddress')

            cy.contains('Edit property address').should('be.visible')
            cy.contains('Suggestion from the Local Gazetteer').should('be.visible')
            cy.contains('Current address').should('be.visible')

            cy.contains('Update to this address').should('be.visible')
            cy.contains('Cancel').should('be.visible')
            cy.contains('Back to asset').should('be.visible')
        })
    })

    it('should present page element - address without UPRN', ()=> {
        const testAsset = generateAsset(undefined, "");
        addTestRecordToDatabase("Assets", testAsset);

        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
            cy.intercept('GET', `*/api/v1/addresses?uprn=${asset.assetAddress.uprn}`, { fixture: 'address.json', }).as('getAddress')
    
            cy.visit(getAssetEditUrlByGuid(asset.id))
    
            cy.wait('@getAsset')
            if (asset.assetAddress.uprn) cy.wait('@getAddress')

            cy.contains('New address details').should('be.visible')
            cy.contains('Update to this address').should('be.visible')
            cy.contains('Cancel').should('be.visible')
            cy.contains('Back to asset').should('be.visible')
        })
    })

    it('edit address successfully', ()=> {
        const testAsset = generateAsset(undefined);
        addTestRecordToDatabase("Assets", testAsset);

        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
            cy.intercept('GET', `*/api/v1/addresses?uprn=${asset.assetAddress.uprn}`, { fixture: 'address.json', }).as('getAddress')
    
            cy.visit(getAssetEditUrlByGuid(asset.id))
    
            cy.wait('@getAsset')
            if (asset.assetAddress.uprn) cy.wait('@getAddress')

            cy.get('[data-testid="address-line-1"]').clear()
            cy.get('[data-testid="address-line-1"]').type("TEST ADDRESS EDT")

            cy.intercept('PATCH', `*/api/v1/assets/${asset.id}/address`).as('patchAddress')
            cy.intercept('PATCH', `*/api/v1/asset/${asset.assetId}`, { statusCode: 204 }).as('updateAssetDetails')

            cy.contains('Update to this address').click()

            cy.wait(['@patchAddress', '@updateAssetDetails'])
            cy.get('[data-testid="asset-address-line-one"]').should('have.value', "TEST ADDRESS EDT")

            cy.contains('The asset address has been updated successfully.').should('be.visible')
            cy.contains('Back to asset view').should('be.visible').click()
            cy.contains("TEST ADDRESS EDT").should('be.visible')
        })
    })

    it('edit address fails', ()=> {
        const testAsset = generateAsset(undefined);
        addTestRecordToDatabase("Assets", testAsset);

        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
            cy.intercept('GET', `*/api/v1/addresses?uprn=${asset.assetAddress.uprn}`, { fixture: 'address.json', }).as('getAddress')
    
            cy.visit(getAssetEditUrlByGuid(asset.id))
    
            cy.wait('@getAsset')
            if (asset.assetAddress.uprn) cy.wait('@getAddress')

            cy.get('[data-testid="address-line-1"]').clear().type(newAddressLine1Value)

            cy.intercept('PATCH', `*/api/v1/assets/${asset.id}/address`, { forceNetworkError: true }).as('patchAddress')
            cy.intercept('PATCH', `*api/v1/asset/${asset.assetId}`, { forceNetworkError: true }).as('updateAssetDetails')

            cy.contains('Update to this address').click()

            cy.contains('There was a problem amending this asset').should('be.visible')
        })

    })

    it('LLPG address fails to be retrieved', ()=> {
        const testAsset = generateAsset(undefined);
        addTestRecordToDatabase("Assets", testAsset);

        cy.getAssetFixture().then(asset => {
            cy.intercept('GET', `*/api/v1/assets/${asset.id}`).as('getAsset')
            cy.intercept('GET', `*/api/v1/addresses?uprn=${asset.assetAddress.uprn}`, { forceNetworkError: true }).as('getAddress')
    
            cy.visit(getAssetEditUrlByGuid(asset.id))
    
            cy.wait('@getAsset')
            if (asset.assetAddress.uprn) cy.wait('@getAddress')
            
            cy.contains('Unable to retrieve address suggestion from the Local Gazetteer').should('be.visible')

            cy.contains('New address details').should('be.visible')
            cy.get('[data-testid="address-line-1"]').should('be.enabled').and('have.value', asset.assetAddress.addressLine1)
            cy.get('[data-testid="address-line-2"]').should('be.enabled').and('have.value', asset.assetAddress.addressLine2)
            cy.get('[data-testid="address-line-3"]').should('be.enabled').and('have.value', asset.assetAddress.addressLine3)
            cy.get('[data-testid="address-line-4"]').should('be.enabled').and('have.value', asset.assetAddress.addressLine4)
            cy.get('[data-testid="postcode"]').should('be.enabled').and('have.value', asset.assetAddress.postCode)

            cy.contains('Update to this address').should('be.enabled')
        })
    })


})