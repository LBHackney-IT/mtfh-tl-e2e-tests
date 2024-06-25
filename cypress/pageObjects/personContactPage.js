
class PersonContactPageObjects {
    visit(record) {
        cy.visit(`${Cypress.config("baseUrl")}/person/${record}/edit/contact`)
        cy.injectAxe()
    }

    mainContent() {
        return cy.get('#main-content')
    }

    fieldsetContent() {
        return cy.get('.mtfh-fieldset__content')
    }

    pageWarning() {
        return cy.get('.lbh-page-announcement lbh-page-announcement--warning')
    }

    pageAnnouncementHeader() {
        return cy.get('.lbh-page-announcement__title')
    }

    addEmailAddressButton() {
        return cy.contains('Add an email address')
    }

    emailAddressField() {
        return cy.get('#contact-details-email-address-field')
    }

    emailAddressDescription() {
        return cy.get('#contact-details-email-description-field')
    }

    saveEmailAddressButton() {
        return cy.contains('Save email address')
    }

    addPhoneNumberButton() {
        return cy.contains('Add a phone number')
    }

    phoneNumberFields() {
        return cy.get('input[data-test="phone-number-input"]')
    }

    phoneNumberContactType(type = "Main number") {
        return cy.get('select[data-test="phone-number-type-checkbox"]')
        .last()
        .select(type)
    }

    toggleIsNonUkNumber() {
        cy.get("input[data-test='phone-number-checkbox']")
        .last()
        .click()
    }

    phoneNumberDescriptions() {
        return cy.get('input[data-test="phone-number-description-input"]')
    }

    saveChangesButton() {
        return cy.contains('Save changes')
    }

    removeEmailAddressButton() {
        return cy.contains('Remove email address')
    }

    removePhoneNumberButton() {
        return cy.contains('Remove phone number')
    }

    cancelRemovalDialogBox() {
        return cy.contains('Cancel')
    }

    closeModal() {
        return cy.get('.lbh-dialog__close')
    }

    doneButton() {
        return cy.contains('Done')
    }

    contactDetailsHeader() {
        return cy.get('.govuk-fieldset__heading')
    }

    removeCorrespondenceAddressButton() {
        return cy.contains('Remove a correspondence address')
    }

    addCorrespondenceAddressButton() {
        return cy.contains('Add a correspondence address')
    }

    postcodeLookupField() {
        return cy.get('#contact-details-correspondence-address-lookup-term-field')
    }

    postcodeLookupButton() {
        return cy.contains('Look up')
    }

    selectAddressField() {
        return cy.get('#contact-details-correspondence-address-select-field')
    }

    addressLineOneField() {
        return cy.get('#contact-details-correspondence-address-line-1-field')
    }

    addressLineTwoField() {
        return cy.get('#contact-details-correspondence-address-line-2-field')
    }

    addressLineThreeField() {
        return cy.get('#contact-details-correspondence-address-line-3-field')
    }

    addressLineFourField() {
        return cy.get('#contact-details-correspondence-address-line-4-field')
    }

    postcodeField() {
        return cy.get('#contact-details-correspondence-postcode-field')
    }

    addressDescriptionField() {
        return cy.get('#contact-details-correspondence-description-field')
    }

    saveAddressButton() {
        return cy.contains('Save correspondence address')
    }

    postcodeLookupErrorContainer() {
        return cy.get('#contact-details-correspondence-address-lookup-term-error')
    }

    addressLineOneErrorContainer() {
        return cy.get('#contact-details-correspondence-address-line-1-error')
    }

    postCodeErrorContainer() {
        return cy.get('#contact-details-correspondence-postcode-error')
    }

    confirmationMessage() {
        return cy.get('.lbh-page-announcement')
    }

    clickSaveChangesButton() {
        cy.contains("Save changes").click()
    }


    addEmailAddress(value, description) {
        this.addEmailAddressButton().click()
        this.emailAddressField().type(value)
        this.emailAddressDescription().type(description)
        this.saveEmailAddressButton().click()
    }

    addPhoneNumber(value, description) {
        this.addPhoneNumberButton().click()

        this.phoneNumberFields().last().type(`{selectall}{backspace}${value}`)
        this.phoneNumberContactType()
        this.phoneNumberDescriptions().last().type(`{selectall}{backspace}${description}`)

        this.saveChangesButton().click()
    }
}

export default PersonContactPageObjects