const envConfig = require('../../environment-config')

class SearchPageObjects {
    visit() {
        cy.visit(`${envConfig.baseUrl}/${envConfig.searchUrl}`)
        cy.injectAxe()
    }

    searchComponent() {
        return cy.get("[data-testid='searchComponent']")
    }

    searchHeader() {
        return cy.get('.mtfh-search__title')
    }

    searchContainer() {
        return cy.get("[data-testid='searchInput']")
    }

    searchButton() {
        return cy.get("[data-testid='btnSearch']")
    }

    searchAgainButton() {
        return cy.contains('Search again')
    }

    searchResults() {
        return cy.get('.mtfh-search__results')
    }

    closeSearchButton() {
        return cy.contains('Close')
    }

    personRadioButton() {
        return cy.get('[id="filterPerson"]')
    }

    filterStatus() {
        return cy.get('[class="mtfh-search__filters-status"]')
    }

    sortByOption() {
        return cy.get('[id="select-1"]')
    }

    showOptions() {
        return cy.get('[id="select-2"]')
    }

    filterStatus() {
        return cy.get('[class="mtfh-search__filters-status"]')
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

    searchResultTitle() {
        return cy.get('.mtfh-search-result__title')
    }

    searchResultSubtitle() {
        return cy.get('.mtfh-search-result__subtitle')
    }

    searchResultDateOfBirth() {
        return cy.get('.mtfh-search-result__row')
    }

    searchResultTenure() {
        return cy.get('.mtfh-search-result__row')
    }

    searchResultMoreDetails() {
        return cy.get('.mtfh-search-result__row')
    }

    filterPersonRadioButton() {
        return cy.get("[id='filterPerson']")
    }

    searchConfirmation() {
        return cy.get('.mtfh-search__subtitle__highlight')
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

    searchResultPropertiesAreDisplayed() {
        this.searchResultTitle().should('be.visible')
        this.searchResultSubtitle().should('be.visible')
        this.searchResultDateOfBirth().should('be.visible')
        this.searchResultDateOfBirth().contains('DOB:')
        this.searchResultTenure().should('be.visible')
        this.searchResultTenure().contains('Tenure:')
        this.searchResultMoreDetails().should('be.visible')
        this.searchResultMoreDetails().contains('More details')
    }

    numberOfResultsDisplayed(results) {
        this.showOptions().select(`${results} items`)
    }

    sortBy(option) {
        this.sortByOption().select(option)
    }
}
export default SearchPageObjects