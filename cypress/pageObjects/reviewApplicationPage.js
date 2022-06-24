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
}
export default ReviewApplicationPageObjects;