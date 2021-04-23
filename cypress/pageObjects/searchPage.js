const baseUrl = require('../../environment-config').baseUrl

class SearchPageObjects {
    visit() {
        cy.visit(baseUrl)
    }

    searchHeader() {
        return cy.get("[class='mtfh-search__title']")
    }

    searchContainer() {
        return cy.get("[data-testid='searchInput']")
    }

    searchButton() {
        return cy.get("[data-testid='btnSearch']")
    }

    searchAgainButton() {
        return cy.get("[class='govuk-button lbh-button']")
    }

    filterPersonRadioButton() {
        return cy.get("[id='filterPerson']")
    }

    searchConfirmation() {
        return cy.get("[class='mtfh-search__subtitle__highlight']")
    }

    enterKeywordAndClickSearch(searchTerm) {
        this.searchContainer().type(searchTerm)
        this.searchButton().click()
        this.searchConfirmation().contains(searchTerm)
    }

    iAmOnTheSearchPage() {
        this.searchHeader().contains('Search')
    }
}

export default SearchPageObjects