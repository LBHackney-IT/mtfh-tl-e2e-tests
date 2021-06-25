const envConfig = require('../../environment-config')

class AddPersonPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.personUrl}/${record}/add`)
        cy.injectAxe()
    }

    mainContent() {
        return cy.get('#main-content')
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
        return cy.get('#person-form-type-tenure-holder')
    }

    householdMemberRadioButton() {
        return cy.get('#person-form-type-household-member')
    }

    personTitleSelection() {
        return cy.get('#person-form-title-field')
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
        return cy.get('[type="submit"]')
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

    addPersonPageIsDisplayed() {
        this.addPersonHeader().should('be.visible')
        this.addPersonHeader().contains('Add new person to tenure')
    }
}
export default AddPersonPageObjects