class TenureReviewDocsPageObjects {

    headingTenureInvestigation() {
        return cy.get('.lbh-heading-h2');
    };
    submitButton () {
        return cy.get('.lbh-button').contains('Submit case');
    };
    continueButton () {
        return cy.get('.lbh-button').contains('Continue');
    };
    linkChange() {
        return cy.contains('Change');
    };
    photoId() {
        return cy.get('#seen-photographic-id');
    };
    secondId() {
        return cy.get('#seen-second-id');
    };
    notImmigrationControl() {
        return cy.get('#is-not-immigration-control');
    };
    relationshipProof() {
        return cy.get('#seen-proof-of-relationship');
    };
    tenantLivingInProperty() {
        return cy.get('#incoming-tenant-living-in-property');
    };
    checkboxMakeAnAppointment() {
        return cy.get('#condition');
    };
    checkboxConfirmOutcomeLetter() {
        return cy.get('#condition');
    }

    confirmButton(){
        return cy.get('.lbh-button').contains('Confirm');
    }
    buttonBookAppointment() {
        return cy.contains('Book Appointment');
    };
    reasonCloseCase() {
        return cy.get('#mtfh-close-case-form-reason-field');
    };
    alertCloseCase() {
        return cy.get('[data-testid="close-process-modal-submit"]');
    };
    activityHistoryText() {
        return cy.contains('Sole to Joint closed');
    }


}
export default TenureReviewDocsPageObjects;
