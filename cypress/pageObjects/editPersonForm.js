import PersonFormObjects from './personFormPage'

class EditPersonFormObjects extends PersonFormObjects {
    visit(record) {
        cy.intercept("GET", `*/api/v1/persons/${record}`).as("getPerson")
        cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("personUrl")}/${record}/edit`)
        cy.injectAxe()
        cy.wait("@getPerson")
    }

    editPersonEqualityInformation(record) {
        cy.visit(`${Cypress.config("baseUrl")}/person/${record}/edit/equality-information`)
    }

    updatePersonButton() {
        return cy.contains('Update person')
    }

    clickUpdatePersonButton(id) {
        cy.intercept("PATCH", `*/api/v1/persons/${id}`).as("updatePerson")
        const now = new Date();
        this.updatePersonButton().click();
        cy.wait("@updatePerson")
        return now;
    }

    mergeConflictDialogBox() {
        return cy.get('#person-form-conflict')
    }

    errorSummaryList() {
        return cy.get('.govuk-list govuk-error-summary__list')
    }
}

export default EditPersonFormObjects