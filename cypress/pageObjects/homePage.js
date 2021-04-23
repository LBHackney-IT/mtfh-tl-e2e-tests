const baseUrl = require('../../environment-config').baseUrl

class HomePageObjects {
    visit() {
        cy.visit(baseUrl)
    }

    mainContent() {
        return cy.get("[id='main-content']")
    }

    iAmOnTheHomePage() {
        this.mainContent().should('be.visible')
        this.mainContent().contains('Welcome to the default page')
    }
}
export default HomePageObjects