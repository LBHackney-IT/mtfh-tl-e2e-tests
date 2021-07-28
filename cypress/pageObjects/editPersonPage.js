const envConfig = require('../../environment-config')

class EditPersonPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.personUrl}/${record}/edit`)
        cy.injectAxe()
    }

    mergeConflictDialogBox() {
        return cy.get('#person-form-conflict')
    }

    errorSummaryList() {
        return cy.get('.govuk-list govuk-error-summary__list')
    }
}

export default EditPersonPageObjects