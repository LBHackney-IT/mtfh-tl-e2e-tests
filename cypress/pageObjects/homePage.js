const baseUrl = require('../../environment-config').baseUrl

class HomePageObjects {
    visit() {
        cy.visit(baseUrl)
        cy.injectAxe()
    }

    mainContent() {
        return cy.get('.mtfh-container')
    }

    signInButton() {
        return cy.contains("Fail")
    }

    headerLinks() {
        return cy.get('.lbh-header__links')
    }

    iAmOnTheHomePage() {
        this.mainContent().should('be.visible')
    }
}
export default HomePageObjects