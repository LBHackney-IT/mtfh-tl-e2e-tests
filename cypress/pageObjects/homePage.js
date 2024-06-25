
class HomePageObjects {
    visit() {
        cy.visit(Cypress.config("baseUrl"));
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
    };

    yourTasksText() {
        return cy.get('.lbh-heading-h1').should('contain', 'Your tasks');
    };

    processesText() {
        return cy.contains('Processes');
    };
    patchesText() {
        return cy.contains('Patch');
    }
}
export default HomePageObjects