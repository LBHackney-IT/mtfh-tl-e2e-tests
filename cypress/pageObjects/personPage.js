const baseUrl = require('../../environment-config').baseUrl
// will need to update once we have a mechanism for getting a person or some test data
const personPageUrl = `${baseUrl}`

class PersonPageObjects {
    visit() {
        // change to more appropriate path
        cy.visit('http://localhost:8080')
    }

    headerContainerPhoto() {
        // Needs a better selector
    }

    headerContainerName() {
        // Needs a better selector
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

    dateOfBirthHeader() {
        return cy.get("[data-testid='dateOfBirth']")
    }

    dateOfBirthDefinition() {
        return cy.get("[data-testid='dateOfBirthDefinition']")
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
        // Needs a better selector
    }

    typeField() {
        // Needs a better selector
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

    languagesHeader() {

    }

    languagesHeaderDefinition() {

    }

    signLanguageHeader() {

    }

    signLanguageDefinition() {

    }

    interpreterHeader() {

    }

    interpreterDefinition() {

    }

    nextOfKinHeader() {

    }

    nextOfKinDefinition() {

    }

    motherHeader() {

    }

    motherDefinition() {

    }

    fatherHeader() {

    }

    fatherDefinition() {

    }

    caresForHeader() {

    }

    caresForDefinition() {

    }

    correspondenceAddressHeader() {
        return cy.get("[data-testid='correspondenceAddress']")
    }

    correspondenceAddressDefinition() {
        return cy.get("[data-testid='correspondenceAddressDefinition']")
    }

    previousAddressHeader() {

    }

    previousAddressDefinition() {

    }

    previousUrpnHeader() {

    }

    previousUrpnDefinition() {
        
    }

    headerPersonalDetailsAreDisplayed() {
        // this.headerContainerPhoto().is('displayed')
        // this.headerContainerName().is('displayed')
        this.headerContainerDateOfBirth().should('be.visible')
        this.headerContainerMobileNumber().should('be.visible')
        this.headerContainerEmailAddress().should('be.visible')
    }
}
export default PersonPageObjects