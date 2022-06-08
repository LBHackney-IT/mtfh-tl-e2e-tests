const envConfig = require('../../environment-config')

class TenureRequestDocsPageObjects {
    textHeaderNextSteps() {
        return cy.contains('Next Steps:');
    };
    textPassInitialEligReqs() {
        return cy.contains("The current tenant and the applicant have passed the initial eligibility requirements. The next steps are:");
    };
    textBreachOfTenure() {
        return cy.contains("Breach of tenure");
    };
    statusBreachOfTenureCheck() {
        return cy.contains("Breach of tenure check");
    };
    statusActiveCheck(){
        return cy.get('.mtfh-stepper__step--active');
    };
    tenantLiveNoticeYes(){
        return cy.get('#breach-form-type-notice-yes');
    };
    tenantLiveNoticeNo(){
        return cy.get('#breach-form-type-notice-no');
    };
    cautionaryContactYes(){
        return cy.get('#');
    };
    cautionaryContactAllowApp(){
        return cy.get('#breach-form-type-cautionary-yes-allow-application');
    };
    cautionaryContactDenyApp(){
        return cy.get('#breach-form-type-cautionary-yes-deny-application');
    };
    cautionaryContactNo(){
        return cy.get(':nth-child(3) > #breach-form-type-cautionary-yes');
    };
    successionYes(){
        return cy.get('#breach-form-type-previously-succeeded-yes');
    };
    successionNo(){
        return cy.get('#breach-form-type-previously-succeeded-no');
    };
    requestDocsElectronically() {
        return cy.get('#requestType-automatic');
    };
    makeAnAppointToCheckSuppDocs() {
        return cy.get('#requestType-manual');
    };
}
export default TenureRequestDocsPageObjects;