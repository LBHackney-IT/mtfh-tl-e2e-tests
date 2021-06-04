const envConfig = require('../../environment-config')

class TenurePageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.tenureUrl}/${record}`)
        cy.injectAxe()
    }

    paymentReference() {
        return cy.get('h2')
    }

    tenureDetailsContainer() {
        return cy.get('[class="govuk-summary-list lbh-summary-list govuk-summary-list--no-border tenure-details__definition-list"]')
    }

    tenureDetailsAreDisplayed() {
        this.paymentReference().should('be.visible')
        this.tenureDetailsContainer().should('be.visible')
    }
}
export default TenurePageObjects