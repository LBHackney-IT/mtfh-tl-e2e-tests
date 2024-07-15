
class PropertyPageObjects {
    visit(propertyId) {
        cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("property")}/${propertyId}`)
        cy.injectAxe()
    }

    addCommentButton() {
        return cy.get('.govuk-button lbh-button')
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

    tenureDetailsContainer() {
        return cy.get("#tenure-details");
    }    

    tenureStatus(){
        return cy.contains('Active');
    };
    tenureStatusInactive(){
        return cy.contains('Inactive');
    }

    newProcess(){
        return cy.contains('New Process')
    }

    patchDetails() {
        return cy.get('[class="mtfh-patch-details"]')
    }

    managePatchesButton() {
        return cy.get('[data-testid="all-patches-and-areas-button"]')
    }
    
    commentDateTime() {
        return cy.get('.comment__date-time')
    }
    
    comment(){
        return cy.get('[class="comment__item --center"]')
    }
    
    repairsSelectionBox() {
        return cy.get('[data-testid="work-order-list:filter"]')
    }

    repairsList() {
        return cy.get('.work-order-list')
    }

    repairsCardList() {
        return cy.get('.mtfh-card-list')
    };
    selectFirstRecord() {
        return cy.get(':nth-child(1) > .mtfh-search-card > .mtfh-link-overlay > .govuk-link');
    }

    // Asset Characteristics collapsable sidebar element:
    propertySpecification = () => cy.getByTestId("property-spec-toggle");
    assetCharacteristicsInfoBlock = () => cy.getByTestId("asset-characteristics-info");

    // Assset Characteristics individual data fields:
    numberOfBedrooms = () => cy.getByTestId("numberOfBedrooms");
    numberOfLifts = () => cy.getByTestId("numberOfLifts");
    numberOfSingleBeds = () => cy.getByTestId("numberOfSingleBeds");
    numberOfDoubleBeds = () => cy.getByTestId("numberOfDoubleBeds");
    numberOfLivingRooms = () => cy.getByTestId("numberOfLivingRooms");
    numberOfFloors = () => cy.getByTestId("numberOfFloors");
    totalBlockFloors = () => cy.getByTestId("totalBlockFloors");
    heating = () => cy.getByTestId("heating");
    windowType = () => cy.getByTestId("windowType");
    propertyFactor = () => cy.getByTestId("propertyFactor");
    yearConstructed = () => cy.getByTestId("yearConstructed");
    architecturalType = () => cy.getByTestId("architecturalType");
}

export default PropertyPageObjects