class ModalPageObjects {
    modalBody() {
        return cy.get('.lbh-dialog')
    }

    cancelButton() {
        return cy.contains('Cancel')
    }

    confirmationButton() {
        return cy.contains('Yes')
    }
}

export default ModalPageObjects