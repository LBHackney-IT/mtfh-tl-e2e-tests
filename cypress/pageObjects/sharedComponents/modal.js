class ModalPageObjects {
    modalBody() {
        return cy.get('.lbh-dialog')
    }

    dialogueActions() {
        return cy.get('.lbh-dialog__actions')
    }

    cancelButton() {
        return cy.get('govuk-link lbh-link lbh-link--no-visited-state')
    }

    confirmationButton() {
        return cy.contains('Yes')
    }
}

export default ModalPageObjects