const envConfig = require('../../environment-config')

class PropertyPageObjects {
    visit(propertyId) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.property}/${propertyId}`)
        cy.injectAxe()
    }

    heading() {
        return cy.get('.heading')
    }

    propertyPage() {
        return cy.get('[data-testid="property"]')
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

    newTenureButton() {
        return cy.contains('New tenure')
    }

    newProcess(){
        return cy.contains('New Process')
    }
    
    commentDateTime() {
        return cy.get('.comment__date-time')
    }
    
    comment(){
        return cy.get('[class="comment__item --center"]')
    }

    repairsCardList(){
        return cy.get ('[class ="mtfh-card-list"]')
    }

    repairsSelectionBox() {
        return cy.get('[data-testid="work-order-list:filter"]')
    }

    repairsList() {
        return cy.get('.work-order-list')
    }

    repairsCardList() {
        return cy.get('.mtfh-card-list')
    }
}

export default PropertyPageObjects