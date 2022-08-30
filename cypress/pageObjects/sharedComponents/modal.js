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
    modalReasonChangeOfName(){
        return cy.get('#mtfh-close-case-form-reason-field');
    };
    modalCloseCaseChangeOfName(){
        return cy.get('[data-testid=close-process-modal-submit]');
    }
}

export default ModalPageObjects