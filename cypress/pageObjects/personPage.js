const envConfig = require('../../environment-config')

class PersonPageObjects {
    visit(personId) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.personUrl}/${personId}`)
    }

    feedbackMessageContainer() {
        return cy.get("[id='single-spa-application:@mtfh/personal-details']")
    }

    errorMessageContainer() {
        return cy.get("[id='error-summary-title']")
    }

    tryAgainButton() {
        return cy.contains("Try again")
    }

    headerContainerPhoto() {
        return cy.get("[alt='Profile photo']")
    }

    headerContainerName() {
        return cy.get("[data-testid='root']")
    }

    headerCntainerPhoto() {
        return cy.get("[class='personal-details__photo']")
    }

    headerContainerDateOfBirth() {
        return cy.get("[data-testid='intro-dateOfBirth']")
    }

    headerContainerMobileNumber() {
        return cy.get("[data-testid='intro-mobile']")
    }

    headerContainerEmailAddress() {
        return cy.get("[data-testid='intro-email']")
    }

    headerContainerExpandPersonalDetails() {
        return cy.get("[class='govuk-accordion__open-all']")
    }

    expandPersonalDetails() {
        return cy.get("[class='govuk-accordion__section-button']")
    }

    mainContent() {
        return cy.get("[class='main']")
    }

    dateOfBirthHeader() {
        return cy.get("[data-testid='Date Of Birth']")
    }

    dateOfBirthDefinition() {
        return cy.get("[data-testid='Date Of BirthDefinition']")
    }

    phoneNumberHeader() {
        return cy.get("[data-testid='phone']")
    }

    phoneNumberDefinition() {
        return cy.get("[data-testid='phoneDefinition']")
    }

    emailAddressHeader() {
        return cy.get("[data-testid='email']")
    }

    emailAddressDefinition() {
        return cy.get("[data-testid='emailDefinition']")
    }

    typeHeader() {
        return cy.get("[data-testid='Type']")
    }

    typeField() {
        return cy.get("[data-testid='TypeDefinition']")
    }

    genderHeader() {
        return cy.get("[data-testid='gender']")
    }

    genderDefinition() {
        return cy.get("[data-testid='genderDefinition']")
    }

    nationalityHeader() {
        return cy.get("[data-testid='nationality']")
    }

    nationalityDefinition() {
        return cy.get("[data-testid='nationalityDefinition']")
    }

    placeOfBirthHeader() {
        return cy.get("[data-testid='place Of Birth']")
    }

    placeOfBirthDefinition() {
        return cy.get("[data-testid='place Of BirthDefinition']")
    }

    nationalInsuranceHeader() {
        return cy.get("[data-testid='NI']")
    }

    nationalInsuranceDefinition() {
        return cy.get("[data-testid='NIDefinition']")
    }

    languagesHeader() {
        return cy.get("[data-testid='Languages']")
    }

    languagesHeaderDefinition() {
        return cy.get("[data-testid='LanguagesDefinition']")
    }

    signLanguageHeader() {
        return cy.get("[data-testid='Sign language']")
    }

    signLanguageDefinition() {
        return cy.get("[data-testid='Sign languageDefinition']")
    }

    interpreterHeader() {
        return cy.get("[data-testid='Interpreter']")
    }

    interpreterDefinition() {
        return cy.get("[data-testid='InterpreterDefinition']")
    }

    nextOfKinHeader() {
        return cy.get("[data-testid='Next of kin']")
    }

    nextOfKinDefinition() {
        return cy.get("[data-testid='Next of kinDefinition']")
    }

    motherHeader() {
        return cy.get("[data-testid='Mother']")
    }

    motherDefinition() {
        return cy.get("[data-testid='MotherDefinition']")
    }

    fatherHeader() {
        return cy.get("[data-testid='Father']")
    }

    fatherDefinition() {
        return cy.get("[data-testid='FatherDefinition']")
    }

    caresForHeader() {
        return cy.get("[data-testid='Cares for']")
    }

    caresForDefinition() {
        return cy.get("[data-testid='Cares forDefinition']")
    }

    correspondenceAddressHeader() {
        return cy.get("[data-testid='correspondence Address']")
    }

    correspondenceAddressDefinition() {
        return cy.get("[data-testid='correspondence AddressDefinition']")
    }

    correspondenceAddressUprnHeader() {
        return cy.get("[data-testid='correspondence Address  U P R N']")
    }

    correspondenceAddressUprnDefinition() {
        return cy.get("[data-testid='correspondence Address  U P R NDefinition']")
    }

    headerPersonalDetailsAreDisplayed() {
        this.headerContainerPhoto().is('displayed')
        // this.headerContainerName().is('displayed')
        this.headerContainerDateOfBirth().should('be.visible')
        this.headerContainerMobileNumber().should('be.visible')
        this.headerContainerEmailAddress().should('be.visible')
    }

    bodyPersonalDeatailsAreDisplayed() {
        this.dateOfBirthHeader().should('be.visible')
        this.dateOfBirthDefinition().should('be.visible')
        this.phoneNumberHeader().should('be.visible')
        this.phoneNumberDefinition().should('be.visible')
        this.emailAddressHeader().should('be.visible')
        this.emailAddressDefinition().should('be.visible')
        this.typeHeader().should('be.visible')
        this.typeField().should('be.visible')
        this.genderHeader().should('be.visible')
        this.genderDefinition().should('be.visible')
        this.nationalityHeader().should('be.visible')
        this.nationalityDefinition().should('be.visible')
        this.placeOfBirthHeader().should('be.visible')
        this.placeOfBirthDefinition().should('be.visible')
        this.nationalInsuranceHeader().should('be.visible')
        this.nationalInsuranceDefinition().should('be.visible')
        this.languagesHeader().should('be.visible')
        this.languagesHeaderDefinition().should('be.visible')
        this.signLanguageHeader().should('be.visible')
        this.signLanguageDefinition().should('be.visible')
        this.interpreterHeader().should('be.visible')
        this.interpreterHeader().should('be.visible')
        this.nextOfKinDefinition().should('be.visible')
        this.nextOfKinHeader().should('be.visible')
        this.motherHeader().should('be.visible')
        this.motherDefinition().should('be.visible')
        this.fatherHeader().should('be.visible')
        this.fatherDefinition().should('be.visible')
        this.caresForHeader().should('be.visible')
        this.caresForDefinition().should('be.visible')
        this.correspondenceAddressHeader().should('be.visible')
        this.correspondenceAddressDefinition().should('be.visible')
        this.correspondenceAddressUprnHeader().should('be.visible')
        this.correspondenceAddressUprnDefinition().should('be.visible')
    }
}
export default PersonPageObjects