const envConfig = require('../../environment-config')

class RelatedAssetsPageObjects {
    visit(guid) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.relatedAssetUrl}/${guid}`)
    }

    relatedAssetLinkToPage() {
        return cy.get('[data-testid="related-assets-link"]')
    }

    relatedAssetHeading() {
        return cy.get('[data-testid="related-assets-heading"]')
    }

    relatedAssetCurrentProperty() {
        return cy.get('[data-testid="related-assets-property"]')
    }

    relatedAssetItemsByType() {
        return cy.get('[data-testid="related-asset-items-group"]')
    }

    relatedAsset() {
        return cy.get('[data-testid="related-asset"]')
    }

    noRelatedAssetMessage() {
        return cy.get('[data-testid="no-related-assets-message"]')
    }

    unableToRetrieveChildrenAssetsError() {
        return cy.get('[data-testid="cannot-fetch-children-error"]')
    }

    unableToRetrieveAssetError() {
        return cy.contains("There was a problem retrieving the record").should('be.visible')
    }
}

export default RelatedAssetsPageObjects