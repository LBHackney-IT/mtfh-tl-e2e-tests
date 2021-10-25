const envConfig = require('../../environment-config')

class PersonContactPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/person/${record}/edit/contact`)
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

    phoneNumberField() {
        return cy.get('#contact-details-phone-number-field')
    }

    phoneNumberMobileType() {
        return cy.get('#contact-details-phone-type-mobile')
    }

    phoneNumberHomeType() {
        return cy.get('#contact-details-phone-type-home')
    }

    phoneNumberWorkType() {
        return cy.get('#contact-details-phone-type-work')
    }

    phoneNumberOtherType() {
        return cy.get('#contact-details-phone-type-other')
    }

    phoneNumberDescription() {
        return cy.get('#contact-details-phone-description-field')
    }

    savePhoneNumberButton() {
        return cy.contains('Save phone number')
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
}

export default PersonContactPageObjects