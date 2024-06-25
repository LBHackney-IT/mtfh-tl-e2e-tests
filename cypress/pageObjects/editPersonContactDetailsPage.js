
class EditPersonContactDetailsPageObjects {
    visit(record) {
        cy.visit(`${Cypress.config("baseUrl")}/person/${record}`)
        cy.injectAxe()
    }

    editPersonContactDetails(record) {
        cy.visit(`${Cypress.config("baseUrl")}/person/${record}/edit-contact-details`)
    }

    mainContent() {
        return cy.get('#main-content')
    }

    mainContent() {
        return cy.get('#main-content')
    }
}
export default EditPersonContactDetailsPageObjects
