const baseUrl = require('../../environment-config').baseUrl
const searchPageUrl = `${baseUrl}/search`

class SearchPageObjects {
    visit() {
        cy.visit(searchPageUrl)
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
}
export default SearchPageObjects