const envConfig = require('../../environment-config')

class AddPersonPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.addPersonUrl}/${record}`)
        cy.injectAxe()
    }

    backButton() {
        return cy.contains('Tenure payment reference')
    }
    
    addPersonHeader() {
        return cy.get('.lbh-heading-h1')
    }

    tenureDetails() {
        return cy.get('h2')
    }

    tenureHolderRadioButton() {
        return cy.get('[id="person-form-type-tenure-holder"]')
    }

    householdMemberRadioButton() {
        return cy.get('[id="person-form-type-household-member"]')
    }

    personTitleSelection(title) {
        return cy.get('[id="person-form-title-field"]').select(title)
    }

    firstNameContainer() {
        return cy.get('[id="person-form-firstName-field"]')
    }

    middleNameContainer() {
        return cy.get('id="person-form-middleName-field"')
    }

    lastNameContainer() {
        return cy.get('[id="person-form-surname-field"]')
    }

    dateOfBirthDayContainer() {
        return cy.get('[name="dobDay"]')
    }

    dateOfBirthMonthContainer() {
        return cy.get('[name="dobMonth"]')
    }

    dateOfBirthYearContainer() {
        return cy.get('[name="dobYear"]')
    }

    reasonForCreationContainer() {
        return cy.get('[id="person-form-reason-field"]')
    }

    addPersonButton() {
        return cy.get('[type="submit"]')
    }

    cancelButton() {
        return cy.contains('Cancel')
    }

    addPersonPageIsDisplayed() {
        this.addPersonHeader().should('be.visible')
        this.addPersonHeader().contains('Add new person to tenure')
    }
}
export default AddPersonPageObjects