class PersonFormObjects {
    mainContent() {
        return cy.get('#main-content')
    }

    backButton() {
        return cy.contains('Tenure payment reference')
    }
    
    personFormHeader() {
        return cy.get('[class="lbh-heading-h1"]')
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

    addPersonButton() {
        return cy.contains('Add person')
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


    cancelButton() {
        return cy.contains('Cancel')
    }

    addPersonFormErrorContainer() {
        return cy.get('[id="person-form-errors"]')
    }

    errorSummaryBody() {
        return cy.get('[class="govuk-error-summary__body"]')
    }

    confirmationModal() {
        return cy.get('.lbh-dialog')
    };

    //Equality information
    ageGroupSelectionBox() {
        return cy.get('#equality-information-form-ageGroup-select-field')
    }

    provideUnpaidCareSelectionField() {
        return cy.get('#equality-information-form-provideUnpaidCare-field')
    }

    selectUnpaidCareRole(carerOption) {
        this.provideUnpaidCareSelectionField()
            .within(() => {
                return cy.contains(carerOption)
            })
            .click();
    }

    consideredDisabledSelectionField() {
        return cy.get('#equality-information-form-disabled-field')
    }

    selectDisbilityOption(disabilityOption) {
        this.consideredDisabledSelectionField()
            .within(() => {
                return cy.contains(disabilityOption)
            })
            .click();
    }

    ethnicitySelectionBox() {
        return cy.get('#equality-information-form-ethnicGroupValue-select-field')
    }

    genderSelectionField() {
        return cy.get('#equality-information-form-genderValue')
    }

    selectGenderOption(genderOption) {
        this.genderSelectionField()
            .within(() => {
                return cy.contains(genderOption).click()
            }).click();
    }

    preferredGenderTermField() {
        return cy.get('#equality-information-form-genderValueIfOther-field')
    }

    genderDifferentToBirthSexSelectionField() {
        return cy.get('#equality-information-form-genderDifferentToBirthSex')
    }

    selectGenderDifferentToBirthSexOption(genderDifferentToBirthSexOption) {
        this.genderDifferentToBirthSexSelectionField()
            .within(() => {
                return cy.contains(genderDifferentToBirthSexOption)
            })
            .click();
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

    selectpregnancyOrMaternityLeaveOption(pregnancyOrMaternityLeaveOption) {
        this.pregnancyOrMaternityLeaveSelectionField()
            .within(() => {
                return cy.contains(pregnancyOrMaternityLeaveOption)
            })
            .click();
    }

    saveEqualityInformationButton() {
        return cy.contains('Save equality information')
    }

    personFormDisplayed() {
        this.personFormHeader()
            .should('be.visible')
            .should('contain', 'Edit tenure');
    }
}
export default PersonFormObjects
