class HeaderObjects {
    headerMain() {
        return cy.get("[class='lbh-header__main']")
    }

    headerServiceName() {
        return cy.get("[class='lbh-header__service-name']")
    }

    headerLinks() {
        cy.get("[class='lbh-header__links']")
    }

    headerIsDisplayed() {
        this.headerMain().should('be.visible')
        this.headerServiceName().contains('Housing tool')
    }
}
export default HeaderObjects