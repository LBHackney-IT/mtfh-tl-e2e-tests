const envConfig = require('../../environment-config')

class PropertyPageObjects {
    visit(propertyId) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.property}/${propertyId}`)
        cy.injectAxe()
    }

    heading() {
        return cy.get('.heading')
    }

    propertyViewSidebar() {
        return cy.get('#property-view-sidebar')
    }

    tenureDetailsAccordion() {
        return cy.get('#accordion-heading-tenure-details')
    }

    viewTenureButton() {
        return cy.contains('View tenure')
    }
}

export default PropertyPageObjects