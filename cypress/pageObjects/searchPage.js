const envConfig = require('../../environment-config')

class SearchPageObjects {
    visit() {
        cy.visit(`${envConfig.baseUrl}/${envConfig.searchUrl}`)
        cy.injectAxe()
    }

    searchComponent() {
        return cy.get(".mtfh-search-controls__status")
    }

    searchHeader() {
        return cy.get('.mtfh-search__title')
    }

    searchSubtitle() {
        return cy.get('.lbh-heading-h2')
    }

    searchContainer() {
        return cy.get("#search-form-searchTerm-field")
    }

    searchButton() {
        return cy.get('[type="submit"]')
    }

    searchAgainButton() {
        return cy.contains('Search again')
    }

    searchResults() {
        return cy.get('.mtfh-search__results')
    }

    personRadioButton() {
        return cy.get('[id="filterPerson"]')
    }

    filterStatus() {
        return cy.get('.mtfh-search-controls__status')
    }

    sortByOption() {
        return cy.get('#sortBy-field')
    }

    showOptions() {
        return cy.get('#limit-field')
    }

    paginationSummary() {
        return cy.get('.lbh-pagination__summary')
    }

    moreDetailsForAllSearchResultsInView() {
        return cy.contains('More details')
    }

    searchResultContainer() {
        return cy.get('.mtfh-search-result')
    }

    filterPersonRadioButton() {
        return cy.get("[id='filterPerson']")
    }

    searchConfirmation() {
        return cy.get('.mtfh-search__subtitle__highlight')
    }

    searchTermError() {
        return cy.get('#search-form-searchTerm-error')
    }

    searchResultName() {
        return cy.get('[data-testid*="searchMoreDetails"]')
    }

    searchResultDateOfBirth() {
        return cy.get('[data-testid*="searchDOB"]')
    }

    enterKeywordAndClickSearch(searchTerm) {
        this.searchContainer().type(searchTerm)
        this.searchButton().click()
        this.searchConfirmation().contains(searchTerm)
    }

    iAmOnTheSearchPage() {
        this.searchComponent().should('be.visible')
        this.searchHeader().contains('Search')
    }

    numberOfResultsDisplayed(results) {
        this.showOptions().select(`${results} items`)
    }

    sortBy(option) {
        this.sortByOption().select(option)
    }
}
export default SearchPageObjects