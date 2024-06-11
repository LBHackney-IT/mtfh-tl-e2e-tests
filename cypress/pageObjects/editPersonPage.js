import AddPersonPageObjects from './addPersonPage'

class EditPersonPageObjects extends AddPersonPageObjects {
    visit(record) {
        cy.intercept("GET", `*/api/v1/persons/${record}`).as("getPerson")
        cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("personUrl")}/${record}/edit`)
        cy.injectAxe()
        cy.wait("@getPerson")
    }

    updatePersonButton() {
        return cy.contains('Update person')
    }

    clickUpdatePersonButton() {
        cy.intercept("PATCH", `*/api/v1/persons/${person.id}`).as("updatePerson")
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

export default EditPersonPageObjects