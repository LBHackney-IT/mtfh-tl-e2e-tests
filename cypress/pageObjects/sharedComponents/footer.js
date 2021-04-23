class FooterObjects {
    footerMain() {
        return cy.get("[class='mtfh-footer']")
    }

    footerMenu() {
        cy.get("[class='mtfh-footer__menu']")
    }

    footerIsDisplayed() {
        this.footerMain().should('be.visible')
    }
}
export default FooterObjects

