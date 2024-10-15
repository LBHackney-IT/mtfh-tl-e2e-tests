
class CreateTenurePageObjects {
    createTenure(tenureId) {
        cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("tenureUrl")}/${tenureId}/add`)
        cy.injectAxe()
    }

    editTenure(tenureId) {
        cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("tenureUrl")}/${tenureId}/edit`)
        cy.injectAxe()
    }

    createNewPerson(propertyId, tenureId) {
        cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("tenureUrl")}/${propertyId}/add/${tenureId}/person`)
    }

    main() {
        return cy.get('.mtfh-layout__main')
    }

    addPropertyHeading() {
        return cy.get('.lbh-heading-h1')
    }

    propertyAddress() {
        return cy.get('.lbh-heading-h1')
    }

    propertyPage() {
        return cy.get('.mtfh-layout__main')
    }

    tenureTypeSelection() {
        return cy.get('#tenure-form-tenureType-field')
    }

    tenureStartDateInput() {
        return cy.get('#tenure-form-startOfTenureDate-field')
    }

    tenureEndDateInput() {
        return cy.get('#tenure-form-endOfTenureDate-field')
    }

    newTenureButton() {
        return cy.contains('New tenure')
    }
    
    nextButton() {
        return cy.contains('Next')
    }

    cancelButton() {
        return cy.contains('Cancel')
    }

    errorContainer() {
        return cy.get('#tenure-form-error')
    }

    errorBody() {
        return cy.get('.govuk-error-summary__body')
    }

    searchContainer() {
        return cy.get('#search-form-searchTerm-field')
    }

    searchButton() {
        return cy.get('.govuk-button.lbh-button:contains("Search")')
    }

    searchResults() {
        return cy.get('.mtfh-search__results')
    }

    sortByOption() {
        return cy.get('#sortBy-field')
    }

    showOptions() {
        return cy.get('#limit-field')
    }

    numberOfResultsDisplayed(results) {
        this.showOptions().select(`${results} items`)
    }

    paginationSummary() {
        return cy.get('.lbh-pagination__summary')
    }

    filterStatus() {
        return cy.get('.mtfh-search-controls__status')
    }

    addAsNamedTenureHolderButton() {
        return cy.contains('Add as named tenure holder')
    }

    addAsHouseholdMember() {
        return cy.get('.govuk-button.lbh-button:contains("Add as household member")');
    }

    addAsNamedTenureHolderButtonTemp() {
        return cy.get('.govuk-button.lbh-button:contains("Add as named tenure holder")');
    }
    pageAnnouncementContainer() {
        //return cy.contains('.lbh-page-announcement__title')
       return cy.get('.lbh-page-announcement');
    }

    addedHouseholdMembersContainer() {
        return cy.get('[data-testid="household-members-container"]')
    }

    createNewPersonButton() {
        return cy.contains('Create new person')
    }

    doneButton() {
        return cy.contains('Done')
    }

    errorMessageContainer() {
        return cy.get('.govuk-error-summary__title')
    }

    confirmRemovePersonButton() {
        return cy.contains('Remove person')
    }

    confirmTenureUpdatedText() {
        return cy.get('.lbh-page-announcement__title');
    }
}

export default CreateTenurePageObjects