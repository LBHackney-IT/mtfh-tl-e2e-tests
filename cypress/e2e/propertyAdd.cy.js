import { seedDatabase } from "../helpers/DbHelpers";
import { generateNewAsset } from  "../../api/models/requests/createAssetModel";
import { saveFixtureData } from "../../api/helpers";
import { getAssetViewUrlByGuid } from "../helpers/DbHelpers";
const { faker } = require("@faker-js/faker");
import * as patchData from "../fixtures/patches.json";

const tags = ['@property', '@authentication', '@common', '@root', '@search']
const propertyReference = faker.random.numeric(8)
const addressLine1 = "47 Test Road"
const postcode = "MK40 2RF"
const assetGuid = faker.datatype.uuid()

describe('Add property', {'tags': tags}, ()=> {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should be on new property page with heading and sections present', ()=> {
        cy.intercept('GET', '*/api/v1/patch/all', { fixture: 'patches.json', }).as('getAllPatches')
        cy.visit(`${Cypress.config("baseUrl")}/property/new`)
        cy.wait('@getAllPatches')

        cy.contains('New property').should('be.visible')
        cy.get('[data-testid="new-property-disclaimer"]').should('be.visible')
        cy.contains('Address').should('be.visible')
        cy.contains('Property management').should('be.visible')
        cy.contains('Asset details').should('be.visible')

        cy.contains('Create new property').should('be.visible')
        cy.contains('Cancel').should('be.visible')
        cy.contains('Back').should('be.visible')

        cy.get('[data-testid="managing-organisation"]').should('have.value', 'London Borough of Hackney')
    })

    it('should show errors for required fields when sending empty form', ()=> {
        cy.intercept('GET', '*/api/v1/patch/all', { fixture: 'patches.json', }).as('getAllPatches')
        cy.visit(`${Cypress.config("baseUrl")}/property/new`)
        cy.wait('@getAllPatches')

        cy.contains('Create new property').click()

        const requiredFieldErrors = [
            "Property Reference is a required field",
            "Asset Type is a required field",
            "Address line 1 is a required field",
            "Postcode is a required field",
            "Please select an option"
        ]
    
        requiredFieldErrors.forEach(error => cy.contains(error).should('be.visible'))
        cy.get('span').filter(':contains("Please select an option")').should('be.visible')
    })

    it('should work successfully', {'tags': '@SmokeTest'}, ()=> {
        cy.intercept('GET', '*/api/v1/patch/all', { fixture: 'patches.json', }).as('getAllPatches')
        cy.visit(`${Cypress.config("baseUrl")}/property/new`)
        cy.wait('@getAllPatches')

        cy.get('[data-testid="prop-ref"]').type(propertyReference)
        cy.get('[data-testid="asset-type"]').select('Dwelling')

        cy.intercept('GET', '*/api/v1/search/assets?searchText=asd&useCustomSorting=true&assetTypes=', { fixture: 'parent-assets-options.json', }).as('getParentAssetOptions')
        cy.get('[data-testid="parentAsset-search-input"]').clear().type('asd')
        cy.contains('Search').click()
        cy.wait('@getParentAssetOptions')
        cy.get('[data-testid="parentAsset"]').select('Fake Parent Asset 1')

        cy.get('[data-testid="address-line-1"]').type(addressLine1)
        cy.get('[data-testid="postcode"]').type(postcode)
        cy.get('[data-testid="is-council-property-yes"]').click()
        cy.get('[data-testid="add-default-sor-contracts-yes"]').click()

        cy.intercept('POST', '*/api/v1/assets', (req) => { req.body = testAsset }).as('createNewAssetSuccess')

        cy.contains('Create new property').click()

        const testAsset = generateNewAsset(assetGuid, propertyReference);
        cy.log("The POST request will save the test asset record to the database")
        cy.log("Saving details of the test asset in recordsToDelete.json file")
        saveFixtureData("Assets", { id: testAsset.id }, testAsset)

        cy.log("Randomly generated Asset GUID:", assetGuid)
        cy.log("Randomly generated Asset ID:", propertyReference)

        cy.wait('@createNewAssetSuccess').its('request.method').should('deep.equal', 'POST')

        cy.scrollTo('top');
        cy.contains('The new asset address has been successfully added.').should('be.visible')

        cy.intercept('GET', `*/api/v2/notes?pageSize=5&targetId=${assetGuid}`, { fixture: "asset-notes.json", statusCode: 200 }).as('getNotes')
        cy.visit(getAssetViewUrlByGuid(assetGuid))
        cy.contains(addressLine1).should('be.visible');
        cy.contains(postcode).should('be.visible');
    })

    it('should error when API fails', ()=> {
        cy.intercept('GET', '*/api/v1/patch/all', { fixture: 'patches.json', }).as('getAllPatches')
        cy.visit(`${Cypress.config("baseUrl")}/property/new`)
        cy.wait('@getAllPatches')

        cy.get('[data-testid="prop-ref"]').type(propertyReference)
        cy.get('[data-testid="asset-type"]').select('Dwelling')

        cy.intercept('GET', '*/api/v1/search/assets?searchText=asd&useCustomSorting=true&assetTypes=', { fixture: 'parent-assets-options.json', }).as('getParentAssetOptions')
        cy.get('[data-testid="parentAsset-search-input"]').clear().type('asd')
        cy.contains('Search').click()
        cy.wait('@getParentAssetOptions')
        cy.get('[data-testid="parentAsset"]').select('Fake Parent Asset 1')

        cy.get('[data-testid="address-line-1"]').type(addressLine1)
        cy.get('[data-testid="postcode"]').type(postcode)
        cy.get('[data-testid="is-council-property-yes"]').click()
        cy.get('[data-testid="add-default-sor-contracts-yes"]').click()

        cy.intercept('POST', '*/api/v1/assets', { forceNetworkError: true }).as('createNewAssetFail')
        cy.contains('Create new property').click()
        cy.wait('@createNewAssetFail').its('request.method').should('deep.equal', 'POST')

        cy.contains('There was a problem creating a new asset').should('be.visible')
        cy.contains('Please refresh the page and try again. If the issue persists, please contact support.').should('be.visible')

    })

    it('should add,remove and edit patch info for new asset', ()=> {
        cy.intercept('GET', '*/api/v1/patch/all', { fixture: 'patches.json', }).as('getAllPatches')
        cy.visit(`${Cypress.config("baseUrl")}/property/new`)
        cy.wait('@getAllPatches')

        cy.contains('Patch').should('be.visible');

        cy.get('[data-testid="patch-dropdown-1"]').should('be.visible').and('have.value', null);
        cy.get('[data-testid="patch-dropdown-1"]').select(patchData[1].id);
        cy.get('[data-testid="patch-dropdown-1"]').should('have.value', patchData[1].id);

        cy.get('[data-testid="patch-remove-link-1"]').should('be.visible');
        cy.get('[data-testid="patch-remove-link-1"]').click();
        cy.get('[id="property-patches-container"]').children().should('have.length', 0);
    })

});