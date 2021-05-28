class FooterObjects {
    footerMain() {
        return cy.get('.mtfh-footer')
    }

    footerMenu() {
        return cy.get('.mtfh-footer__menu')
    }

    reportAnIssueLink() {
        return cy.contains('Report an issue')
    }

    makeSuggestionLink() {
        return cy.contains('Make a suggestion')
    }

    footerIsDisplayed() {
        this.footerMain().should('be.visible')
    }

    footerLinksAreDisplayed() {
        this.reportAnIssueLink().should('be.visible')
        this.makeSuggestionLink().should('be.visible')
    }

    footerLinksAreCorrect() {
        this.reportAnIssueLink().should('have.attr', 'href').and('equal', 'https://forms.gle/5kUGcRYFwwaZWrGs8')
        this.makeSuggestionLink().should('have.attr', 'href').and('equal', 'https://forms.gle/yM7zCKYZcuVzSXkC6')
    }
}
export default FooterObjects

