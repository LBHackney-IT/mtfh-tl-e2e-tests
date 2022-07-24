const envConfig = require('../../environment-config')

class ReviewApplicationPageObjects {
    checkboxConfirmTenureInvest() {
        return cy.get('#tenure-investigation-completed');
    };
    buttonApprove(){
        return cy.contains('Approve');
    };
    buttonAppointment(){
        return cy.contains('Appointment');
    };
    buttonDecline(){
        return cy.contains('Decline');
    };
    radiobuttonAHMReview() {
        return cy.get('#ho-review');
    };
    radiobuttonAHMApprove() {
        return cy.get('#ho-review-approve');
    };
    radiobuttonAHMDecline() {
        return cy.get('#ho-review-decline');
    };
    checkboxAHMConfirm() {
        return cy.get('#confirm-form-group-field');
    };
    inputAHMName() {
        return cy.get('#area-housing-manager-name-form-group-field');
    };
    buttonConfirm() {
        return cy.contains('Confirm');
    };
    messageHeadingOfficeAppointment() {
        return cy.get('.mtfh-status-heading');
    };
    appointmentDay() {
        return cy.get('[name="day"]');
        //return cy.get('#appointment-form-date > .govuk-date-input > :nth-child(1) > .govuk-input');
    };
    appointmentMonth() {
        return cy.get('[name="month"]');
    };
    appointmentYear() {
        return cy.get('[name="year"]');
    };
    appointmentHour() {
        return cy.get('[name="hour"]');
    };
    appointmentMin() {
        return cy.get('[name="minute"]');
    };
    appointmentAMPM() {
        return cy.get('#amPm');
    };
    confirmationModelApprove() {
        return cy.get('[data-testid=confirm-recommendation-modal-submit]');
    };
    interviewApplicantReason() {
        return cy.get('#mtfh-ho-review-reason-field');
    }
}
export default ReviewApplicationPageObjects;