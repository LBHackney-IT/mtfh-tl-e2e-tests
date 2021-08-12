class NavigationObjects {
    backButton() {
        return cy.get('[class*="govuk-back-link"]')
    }
    viewPropertyButton() {
        return cy.contains('View property')
    }
    viewTenureButton() {
        return cy.contains('View tenure')
    }
}
export default NavigationObjects