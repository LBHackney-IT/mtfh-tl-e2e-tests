const envConfig = require('../../environment-config')

class TenureReviewDocsPageObjects {

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
