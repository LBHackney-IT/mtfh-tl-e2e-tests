class HeaderObjects {
    headerMain() {
        return cy.get('.lbh-header__main')
    }

    headerServiceName() {
        return cy.get('.lbh-header__service-name')
    }

    headerLinks() {
        cy.get('.lbh-header__links')
    }

    headerIsDisplayed() {
        this.headerMain().should('be.visible')
        this.headerServiceName().contains('Housing tool')
    }
}
export default HeaderObjects