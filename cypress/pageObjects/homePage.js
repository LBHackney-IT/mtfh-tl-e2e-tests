const baseUrl = require('../../environment-config').baseUrl

class HomePageObjects {
    visit() {
        cy.visit(baseUrl);
        cy.injectAxe()
    }

    mainContent() {
        return cy.get('[id="main-content"]')
    }

    signInButton() {
        return cy.contains("Sign in with Google")
    }

    headerLinks() {
        return cy.get('.lbh-header__links')
    }

    iAmOnTheHomePage() {
        this.mainContent().should('be.visible')
    }
}
export default HomePageObjects