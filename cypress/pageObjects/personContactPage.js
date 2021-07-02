const envConfig = require('../../environment-config')

class PersonContactPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/person/${record}/contact`)
        cy.injectAxe()
    }

    mainContent() {
        return cy.get('#main-content')
    }

    fieldsetContent() {
        return cy.get('.mtfh-fieldset__content')
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
}

export default PersonContactPageObjects