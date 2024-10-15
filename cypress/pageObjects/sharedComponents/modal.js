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

    yesButton() {
        return cy.contains('Yes')
    };

    confirmationButton() {
        return cy.contains('Confirm')
    };

    closeCaseReason() {
        return cy.get('#mtfh-close-case-form-reason-field');
    }

    closeCaseBack() {
        return cy.get("[data-testid='close-process-modal-back']");
    }

    closeCaseButton() {
        return cy.get(".lbh-button").contains("Close case");
    }
}

export default ModalPageObjects