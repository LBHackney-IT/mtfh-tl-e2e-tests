const envConfig = require('../../environment-config')

class AddPersonPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/tenure/${record}/edit/person/new`)
        cy.injectAxe()
    }

    editPersonContactDetails(record) {
        cy.visit(`${envConfig.baseUrl}/person/${record}/edit/contact`)
    }

    editPersonEqualityInformation(record) {
        cy.visit(`${envConfig.baseUrl}/person/${record}/edit/equality-information`)
    }

    mainContent() {
        return cy.get('#main-content')
    }

    backButton() {
        return cy.contains('Tenure payment reference')
    }
    
    addPersonHeader() {
        return cy.get('[class="lbh-heading-h1"]')
    }

    mainContent() {
        return cy.get('#main-content')
    }

    pageAnnouncement() {
        return cy.get('.lbh-page-announcement')
    }

    tenureDetails() {
        return cy.get('h2')
    }

    removePersonFromTenure() {
        return cy.contains('Remove')
    }

    tenureHolderRadioButton() {
        return cy.get('#person-form-type-tenure-holder')
    }

    householdMemberRadioButton() {
        return cy.get('#person-form-type-household-member')
    }

    personTitleSelection() {
        return cy.get('[id="person-form-title-field"]')
    }

    firstNameContainer() {
        return cy.get('#person-form-firstName-field')
    }

    middleNameContainer() {
        return cy.get('#person-form-middleName-field')
    }

    lastNameContainer() {
        return cy.get('#person-form-surname-field')
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

    genderContainer() {
        return cy.get('#person-form-gender-field')
    }

    nationalityContainer() {
        return cy.get('#person-form-nationality-field')
    }

    nationalInsuranceNumberContainer() {
        return cy.get('#person-form-nationalInsuranceNo-field')
    }

    placeOfBirthContainer() {
        return cy.get('#person-form-placeOfBirth-field')
    }

    preferredTitleContainer() {
        return cy.get('#person-form-preferredTitle-field')
    }

    preferredFirstNameContainer() {
        return cy.get('#person-form-preferredFirstName-field')
    }

    preferredMiddleNameContainer() {
        return cy.get('#person-form-preferredMiddleName-field')
    }

    preferredLastNameContainer() {
        return cy.get('#person-form-preferredSurname-field')
    }

    addLanguageButton() {
        return cy.contains('Add Language')
    }

    languageContainer() {
        return cy.get('#person-form-languages-0-language')
    }

    languageSelectionContainer() {
        return cy.get('#person-form-languages-0-language-field')
    }

    idContainer() {
        return cy.get('#person-form-identifications-0-identificationType')
    }

    idSelectionContainer() {
        return cy.get('#person-form-identifications-0-identificationType-field')
    }

    idNumberContainer() {
        return cy.get('#person-form-identifications-0-value-field')
    }

    idYesRadioButton() {
        return cy.get('#person-form-identification-0-seen-yes')
    }

    idNoRadioButton() {
        return cy.get('#person-form-identification-0-seen-no')
    } 

    isPrimaryLanguage() {
        return cy.get('#person-form-languages-0-isPrimary')
    }

    removeLanguageButton() {
        return cy.contains('Remove language')
    }

    removeIdButton() {
        return cy.contains('Remove ID')
    }

    signLanguageRequiredButton() {
        return cy.get('#person-form-signLanguage')
    }

    interpreterRequiredButton() {
        return cy.get('#person-form-interpreter')
    }

    addIdButton() {
        return cy.contains('Add ID')
    }

    reasonForCreationContainer() {
        return cy.get('[id="person-form-reason-field"]')
    }

    viewResidentButton() {
        return cy.get('.govuk-button lbh-button govuk-secondary lbh-button--secondary view-person-button')
    }

    otherHouseholdMembersButton() {
        return cy.get('.other-household-member-link')
    }

    addPersonButton() {
        return cy.contains('Add person')
    }
    updatePersonButton() {
        return cy.contains('Update person')
    }

    cancelButton() {
        return cy.contains('Cancel')
    }

    addPersonFormErrorContainer() {
        return cy.get('[id="person-form-errors"]')
    }

    errorSummaryBody() {
        return cy.get('[class="govuk-error-summary__body"]')
    }

    updatePersonButton() {
        return cy.contains('Update person')
    }

    confirmationModal() {
        return cy.get('.lbh-dialog')
    }

    //Equality information
    ageGroupSelectionBox() {
        return cy.get('#equality-information-form-ageGroup-select-field')
    }

    provideUnpaidCareSelectionField() {
        return cy.get('#equality-information-form-provideUnpaidCare-field')
    }

    consideredDisabledSelectionField() {
        return cy.get('#equality-information-form-disabled-field')
    }

    ethnicitySelectionBox() {
        return cy.get('#equality-information-form-ethnicGroupValue-select-field')
    }

    genderSelectionField() {
        return cy.get('#equality-information-form-genderValue')
    }

    preferredGenderTermField() {
        return cy.get('#equality-information-form-genderValueIfOther-field')
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

    addPersonPageIsDisplayed() {
        this.addPersonHeader().should('be.visible')
        this.addPersonHeader().contains('Edit tenure')
    }
}
export default AddPersonPageObjects
