const baseUrl = require('../../environment-config').baseUrl

class HomePageObjects {
    visit() {
        cy.visit(baseUrl)
    }

    signInButton() {
        return cy.contains("Sign in using Hackney.gov.uk")
    }

    iAmOnTheHomePage() {
        this.mainContent().should('be.visible')
    }
}
export default HomePageObjects