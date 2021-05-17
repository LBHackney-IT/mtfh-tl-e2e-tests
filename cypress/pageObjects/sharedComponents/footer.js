class FooterObjects {
    footerMain() {
        return cy.get('.mtfh-footer')
    }

    footerMenu() {
        cy.get('.mtfh-footer__menu')
    }

    footerIsDisplayed() {
        this.footerMain().should('be.visible')
    }
}
export default FooterObjects

