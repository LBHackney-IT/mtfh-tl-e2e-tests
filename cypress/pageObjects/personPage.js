const envConfig = require('../../environment-config')
// will need to update once we have a mechanism for getting a person or some test data

class PersonPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/person/${record}`)
        cy.injectAxe()
    }

    headerContainerPhoto() {
        // Needs a better selector
    }

    headerContainerName() {
        return cy.get("[data-testid='person-fullName']")
    }

    addCommentButton() {
        return cy.get('.govuk-button lbh-button')
    }

    commentTable() {
        return cy.get('.comment')
    }

    previousPaginationNavigationButton() {
        return cy.get('.pagination__item')
    }

    nextPaginationNavigationButton() {
        return cy.get('.pagination__item --next')
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
        return cy.get('.govuk-accordion__open-all')
    }

    expandPersonalDetails() {
        return cy.contains('More personal details')
    }

    expandTenureDetails() {
        return cy.contains('More tenure details')
    }

    dateOfBirthHeader() {
        return cy.get("[data-testid='Date of birth']")
    }

    dateOfBirthDefinition() {
        return cy.get("[data-testid='Date of birthDefinition']")
    }

    phoneNumberHeader() {
        return cy.get("[data-testid='Phone']")
    }

    phoneNumberDefinition() {
        return cy.get("[data-testid='PhoneDefinition']")
    }

    emailAddressHeader() {
        return cy.get("[data-testid='Email']")
    }

    emailAddressDefinition() {
        return cy.get("[data-testid='EmailDefinition']")
    }

    identificationHeader() {
        return cy.get("[data-testid='Identification']")
    }

    identificationDefinition() {
        return cy.get("[data-testid='IdentificationDefinition']")
    }

    typeHeader() {
        return cy.get("[data-testid='Type']")
    }

    typeDefinition() {
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
        return cy.get("[data-testid='placeOfBirth']")
    }

    placeOfBirthDefinition() {
        return cy.get("[data-testid='placeOfBirthDefinition']")
    }

    nationalInsuranceHeader() {
        return cy.get("[data-testid='nationalInsurance']")
    }

    nationalInsuranceDefinition() {
        return cy.get("[data-testid='nationalInsuranceDefinition']")
    }

    languagesHeader() {
        return cy.get("[data-testid='language']")
    }

    languagesHeaderDefinition() {
        return cy.get("[data-testid='languageDefinition']")
    }

    signLanguageHeader() {
        return cy.get("[data-testid='signLanguage']")
    }

    signLanguageDefinition() {
        return cy.get("[data-testid='signLanguageDefinition']")
    }

    interpreterHeader() {
        return cy.get("[data-testid='interpreter']")
    }

    interpreterDefinition() {
        return cy.get("[data-testid='interpreterDefinition']")
    }

    nextOfKinHeader() {
        return cy.get("[data-testid='nextOfKin']")
    }

    nextOfKinDefinition() {
        return cy.get("[data-testid='nextOfKinDefinition']")
    }

    motherHeader() {
        return cy.get("[data-testid='mother']")
    }

    motherDefinition() {
        return cy.get("[data-testid='motherDefinition']")
    }

    fatherHeader() {
        return cy.get("[data-testid='father']")
    }

    fatherDefinition() {
        return cy.get("[data-testid='fatherDefinition']")
    }

    caresForHeader() {
        return cy.get("[data-testid='caresFor']")
    }

    caresForDefinition() {
        return cy.get("[data-testid='caresForDefinition']")
    }

    addressHeader() {
        return cy.get("[data-testid='Address']")
    }

    addressDefinition() {
        return cy.get('[data-testid="AddressDefinition"]')
    }

    addCommentButton() {
        return cy.contains('Add comment')
    }

    morePersonalDetailsAccordion() {
        return cy.contains('More personal details')
    }

    moreTenureDetailsAccordion() {
        return cy.contains('More tenure details')
    }

    viewTenureButton() {
        return cy.get('[class="govuk-button lbh-button govuk-secondary lbh-button--secondary"]')
    }

    feedbackMessageContainer() {
        return cy.get('[id="single-spa-application:@mtfh/personal-details"]')
    }

    headerPersonalDetailsAreDisplayed() {
        // this.headerContainerPhoto().is('displayed')
        // this.headerContainerName().is('displayed')
        this.headerContainerDateOfBirth().should('be.visible')
        // this.headerContainerMobileNumber().should('be.visible')
        // this.headerContainerEmailAddress().should('be.visible')
    }

    morePersonalDetails() {
        this.dateOfBirthHeader().should('be.visible')
        this.dateOfBirthDefinition().should('be.visible')
        this.identificationHeader().should('be.visible')
        this.identificationDefinition().should('be.visible')
        this.phoneNumberHeader().should('be.visible')
        this.phoneNumberDefinition().should('be.visible')
        this.emailAddressHeader().should('be.visible')
        this.emailAddressDefinition().should('be.visible')
        // this.genderHeader().should('be.visible')
        // this.genderDefinition().should('be.visible')
        // this.nationalityHeader().should('be.visible')
        // this.nationalityDefinition().should('be.visible')
        // this.placeOfBirthHeader().should('be.visible')
        // this.placeOfBirthDefinition().should('be.visible')
        // this.nationalInsuranceHeader().should('be.visible')
        // this.nationalInsuranceDefinition().should('be.visible')
        // this.languagesHeader().should('be.visible')
        // this.languagesHeaderDefinition().should('be.visible')
        // this.signLanguageHeader().should('be.visible')
        // this.signLanguageDefinition().should('be.visible')
        // this.interpreterHeader().should('be.visible')
        // this.interpreterHeader().should('be.visible')
        // this.nextOfKinDefinition().should('be.visible')
        // this.nextOfKinHeader().should('be.visible')
        // this.motherHeader().should('be.visible')
        // this.motherDefinition().should('be.visible')
        // this.fatherHeader().should('be.visible')
        // this.fatherDefinition().should('be.visible')
        // this.caresForHeader().should('be.visible')
        // this.caresForDefinition().should('be.visible')
        // this.previousUrpnHeader().should('be.visible')
        // this.previousUrpnDefinition().should('be.visible')
    }

    moreTenureDetails() {
        this.addressHeader().should('be.visible')
        this.addressDefinition().should('be.visible')
        this.typeHeader().should('be.visible')
        this.typeDefinition().should('be.visible')
        this.viewTenureButton().should('be.visible')
    }
}
export default PersonPageObjects