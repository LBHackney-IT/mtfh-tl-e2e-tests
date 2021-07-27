const envConfig = require('../../environment-config')

class EditPersonPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.personUrl}/${record}/edit`)
        cy.injectAxe()
    }

    mergeConflictDialogBox() {
        return cy.get('#person-form-conflict')
    }
}

export default EditPersonPageObjects