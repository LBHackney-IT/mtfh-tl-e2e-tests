const envConfig = require('../../environment-config')

class TenureReviewDocsPageObjects {

    headingTenureInvestigation() {
        return cy.get('.lbh-heading-h2');
    };
    submitButton () {
        return cy.get('.mtfh-layout__main > :nth-child(7)');
    };
    continueButton () {
        return cy.get('.govuk-button lbh-button').should('contain', 'Continue');
    }



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

    buttonConfirm(){
        return cy.contains('Confirm');
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
        return cy.contains('Sole to Joint: closed: Comment');
    }


}
export default TenureReviewDocsPageObjects;
