const envConfig = require('../../environment-config')

class EqualityInformationPageObjects {
    visit(tenure, person) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.tenureUrl}/${tenure}/edit/person/new/add/${person}/equality-information`)
        cy.injectAxe()
    }

    ageGroupSelectionBox() {
        return cy.get('#equality-information-form-ageGroup-select-field')
    }

    provideUnpaidCareSelectionField() {
        return cy.get('#equality-information-form-provideUnpaidCareValue-field')
    }

    consideredDisabledSelectionField() {
        return cy.get('#equality-information-form-disabled-field')
    }

    ethnicitySelectionBox() {
        return cy.get('#equality-information-form-ethnicGroupValue-select-field')
    }

    genderSelectionField() {
        return cy.get('#equality-information-form-gender')
    }

    preferredGenderTermField() {
        return cy.get('#equality-information-form-gender-other-field')
    }

    genderDifferentToBirthSexSelectionField() {
        return cy.get('#equality-information-form-genderDifferentToBirthSex')
    }

    religionOrBeliefSelectionBox() {
        return cy.get('#equality-information-form-religionOrBeliefValue-select-field')
    }

    sexualOrientationSelectionBox() {
        return cy.get('#equality-information-form-sexualOrientationValue-select-field')
    }

    pregnancyOrMaternityLeaveSelectionField() {
        return cy.get('#equality-information-form-pregnancyOrMaternity-field')
    }

    saveEqualityInformationButton() {
        return cy.contains('Save equality information')
    }
}

export default EqualityInformationPageObjects
