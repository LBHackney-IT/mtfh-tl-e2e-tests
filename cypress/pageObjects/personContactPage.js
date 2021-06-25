const envConfig = require('../../environment-config')

class PersonContactPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/person/${record}/contact`)
    }

    addEmailAddressButton() {
        return cy.contains('Add an email address')
    }

    addPhoneNumberButton() {
        return cy.contains('Add a phone number')
    }

    doneButton() {
        return cy.contains('Done')
    }

    contactDetailsHeader() {
        return cy.get('.govuk-fieldset__heading')
    }
}

export default PersonContactPageObjects