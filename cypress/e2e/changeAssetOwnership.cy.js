import PropertyPageObjects from "../pageObjects/propertyPage";
import { seedDatabase } from "../helpers/DbHelpers";

const propertyPage = new PropertyPageObjects();

const tags = ['@property', '@authentication', '@common', '@root', '@search']

describe('Change Asset Ownership', {'tags': tags}, ()=> {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should access form from asset page', ()=> {
        cy.getAssetFixture().then((asset) => {
            propertyPage.visit(asset.id);

            cy.get('[data-testid="ownership-info-heading"]').should('be.visible')
            cy.get('[data-testid="ownership-info"]').should('be.visible')
            cy.get('[data-testid="edit-ownership-info-button"]').should('be.visible')
            cy.get('[data-testid="edit-ownership-info-button"]').click()
            cy.url().should('include', `property/${asset.id}/edit-asset-ownership`)

            cy.get('[data-testid="is-council-property-no"]').should('exist').and('be.enabled')
            cy.get('[data-testid="is-council-property-yes"]').should('exist').and('be.enabled')

            cy.get('[data-testid="submit-edit-ownership-button"]').should('be.visible')
            cy.get('[data-testid="cancel-edit-ownership-button"]').should('be.visible')

        })
    })

    it('should change asset ownership successfully', ()=> {
        cy.getAssetFixture().then(asset => {
            cy.visit(`${Cypress.config("baseUrl")}/property/${asset.id}/edit-asset-ownership`)

            if (asset.assetManagement.isCouncilProperty) {
                cy.get('[data-testid="is-council-property-yes"]').should('be.checked')
                cy.get('[data-testid="is-council-property-no"]').should('not.be.checked')
            }
            else {
                cy.get('[data-testid="is-council-property-no"]').should('be.checked')
                cy.get('[data-testid="is-council-property-yes"]').should('not.be.checked')
            }

            cy.get('[data-testid="submit-edit-ownership-button"]').should('be.disabled')

            if (asset.assetManagement.isCouncilProperty) {
                cy.get('[data-testid="is-council-property-no"]').click()
            }
            else {
                cy.get('[data-testid="is-council-property-yes"]').click()
            }
            cy.get('[data-testid="submit-edit-ownership-button"]').should('be.enabled')
            cy.intercept('PATCH', `*/api/v1/assets/${asset.id}`).as('editAssetOwnershipRequest')
            cy.get('[data-testid="submit-edit-ownership-button"]').click()

            cy.wait('@editAssetOwnershipRequest')
            cy.get('[data-testid="ownership-edit-success"]').should('be.visible')
        })

    })

    it('should not change asset ownership due to an error', ()=> {
        cy.getAssetFixture().then(asset => {
            cy.visit(`${Cypress.config("baseUrl")}/property/${asset.id}/edit-asset-ownership`)

            if (asset.assetManagement.isCouncilProperty) {
                cy.get('[data-testid="is-council-property-yes"]').should('be.checked')
                cy.get('[data-testid="is-council-property-no"]').should('not.be.checked')
            }
            else {
                cy.get('[data-testid="is-council-property-no"]').should('be.checked')
                cy.get('[data-testid="is-council-property-yes"]').should('not.be.checked')
            }

            cy.get('[data-testid="submit-edit-ownership-button"]').should('be.disabled')

            if (asset.assetManagement.isCouncilProperty) {
                cy.get('[data-testid="is-council-property-no"]').click()
            }
            else {
                cy.get('[data-testid="is-council-property-yes"]').click()
            }
            cy.get('[data-testid="submit-edit-ownership-button"]').should('be.enabled')
            cy.intercept('PATCH', `*/api/v1/assets/${asset.id}`, { forceNetworkError: true }).as('editAssetOwnershipRequest')
            cy.get('[data-testid="submit-edit-ownership-button"]').click()
            cy.wait('@editAssetOwnershipRequest')
            cy.get('[data-testid="ownership-edit-failure"]').should('be.visible')
        })
    })
})
