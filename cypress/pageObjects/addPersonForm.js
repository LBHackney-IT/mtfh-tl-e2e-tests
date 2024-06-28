import PersonFormObjects from './personFormPage'

class AddPersonFormObjects extends PersonFormObjects {
    visit(record) {
        cy.visit(`${Cypress.config("baseUrl")}/tenure/${record}/edit/person/new`)
        cy.injectAxe()
    }

    addPersonButton() {
        return cy.contains('Add person')
    }
}

export default AddPersonFormObjects