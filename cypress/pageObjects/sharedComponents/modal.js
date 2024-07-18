class ModalPageObjects {
    modalBody() {
        return cy.get('.lbh-dialog')
    }

    dialogueActions() {
        return cy.get('.lbh-dialog__actions')
    }

    cancelButton() {
        return cy.get('.lbh-dialog__close')
    }

    confirmationButton() {
        return cy.contains('Yes')
    };
    modalReason(){
        return cy.get('#mtfh-ho-review-reason-field');
    };
}

export default ModalPageObjects