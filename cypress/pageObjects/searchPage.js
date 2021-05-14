const envConfig = require('../../environment-config')

class SearchPageObjects {
    visit() {
        cy.visit(`${envConfig.baseUrl}/search`)
    }

    searchComponent() {
        return cy.get("[data-testid='searchComponent']")
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

    searchResults() {
        return cy.get("[class='mtfh-search__results']")
    }

    searchResultContainer() {
        return cy.get("[class='mtfh-search-result']")
    }

    searchResultTitle() {
        return cy.get("[class='mtfh-search-result__title']")
    }

    searchResultSubtitle() {
        return cy.get("[class='mtfh-search-result__subtitle']")
    }

    searchResultDateOfBirth() {
        return cy.get("[class='mtfh-search-result__row']").eq(0)
    }

    searchResultTenure() {
        return cy.get("[class='mtfh-search-result__row']").eq(1)
    }

    searchResultMoreDetails() {
        return cy.get("[class='mtfh-search-result__row']").eq(2)
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
}
export default SearchPageObjects