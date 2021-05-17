const baseUrl = require('../../environment-config').baseUrl

class HomePageObjects {
    visit() {
        cy.visit(baseUrl)
    }

    mainContent() {
        return cy.get('.mtfh-container')
    }

    signInButton() {
        return cy.contains("Sign in using Hackney.gov.uk")
    }

    iAmOnTheHomePage() {
        this.mainContent().should('be.visible')
    }
}
export default HomePageObjects