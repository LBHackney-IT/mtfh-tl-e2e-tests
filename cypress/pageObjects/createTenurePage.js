const envConfig = require('../../environment-config')

class CreateTenurePageObjects {
    createTenure(tenureId) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.tenureUrl}/${tenureId}/add`)
        cy.injectAxe()
    }

    editTenure(tenureId) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.tenureUrl}/${tenureId}/edit`)
        cy.injectAxe()
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

    tenureStartDateDayContainer() {
        return cy.get('[name="startDay"]')
    }

    tenureStartDateMonthContainer() {
        return cy.get('[name="startMonth"]')
    }

    tenureStartDateYearContainer() {
        return cy.get('[name="startYear"]')
    }

    tenureEndDateDayContainer() {
        return cy.get('[name="startDay"]')
    }

    tenureEndDateMonthContainer() {
        return cy.get('[name="startMonth"]')
    }

    tenureEndDateYearContainer() {
        return cy.get('[name="startYear"]')
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
        return cy.contains('Search')
    }

    addAsNamedTenureHolderButton() {
        return cy.contains('Add as named tenure holder')
    }

    addAsHousholdMember() {
        return cy.contains('Add as household member')
    }

    pageAnnouncementContainer() {
        return cy.contains('.lbh-page-announcement__title')
    }

    addedHouseholdMembersContainer() {
        return cy.get('[testid="household-members-container"]')
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
}

export default CreateTenurePageObjects