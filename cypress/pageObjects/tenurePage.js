const envConfig = require('../../environment-config')

class TenurePageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.tenureUrl}/${record}`)
        cy.injectAxe()
    }

    paymentReference() {
        return cy.get('h1')
    }

    tenureDetailsContainer() {
        return cy.get('#tenure-details')
    }

    tenureResidentsContainer() {
        return cy.get('#resident-details')
    }

    viewResidentButton(number) {
        return cy.get('[class="govuk-button lbh-button govuk-secondary lbh-button--secondary view-person-button"]').eq(number-1)
    }

    otherHouseholdMembersContainer() {
        return cy.get('[class="lbh-heading-h3"]')
    }

    tenureDetailsAreDisplayed() {
        this.paymentReference().should('be.visible')
        this.tenureDetailsContainer().should('be.visible')
        this.tenureDetailsContainer().contains('Active')
        this.tenureDetailsContainer().contains('Start date')
        this.tenureDetailsContainer().contains('End date')
        this.tenureDetailsContainer().contains('Tenure type')
        this.tenureDetailsContainer().contains('Property ID')
    }

    residentsDetailsAreDisplayed() {
        this.tenureResidentsContainer().should('be.visible')
        this.tenureResidentsContainer().contains('Date of birth')
        this.tenureResidentsContainer().contains('Type')
    }
}
export default TenurePageObjects