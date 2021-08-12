class NavigationObjects {
    backButton() {
        return cy.get('[class*="govuk-back-link"]')
    }
}
export default NavigationObjects