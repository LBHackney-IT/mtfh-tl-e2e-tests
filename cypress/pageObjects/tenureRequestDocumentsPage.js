const envConfig = require('../../environment-config')

class TenureRequestDocsPageObjects {

    textHeaderSharingInfoWithThirdParties() {
        return cy.findAllByText('Sharing information with third parties');
    };
    textHeaderNextSteps() {
        return cy.contains('Next Steps:');
    };
    personRadioButton() {
        return cy.get('#select-tenant-field > :nth-child(1) > .govuk-label');
    }
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
        return cy.get('[data-testid=breach-form-type-cautionary-no]');
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
    nextButton() {
        return cy.get('#request-documents-form > .govuk-button');
    };
    activityHistoryButton() {
        return cy.get('a.govuk-button');
    };
    acitivityHistorySupportingDocs() {
        return cy.contains("Sole to Joint: Supporting Documents requested through the Document Evidence Store");
    };

    personLink() {
        return cy.get(".lbh-heading-h2 > :nth-child(3) > .govuk-link");
    }

    day() {
        return cy.get('[name="day"]');
    };
    month() {
        return cy.get('[name="month"]');
    };
    year() {
        return cy.get('[name="year"]');
    };
    minute() {
        return cy.get('[name="minute"]');
    };
    hour() {
        return cy.get('[name="hour"]');
    };
    ampm() {
        return cy.get('[name="amPm"]');
    };
    submitButton() {
        return cy.get('.govuk-button lbh-button');
    }

    selectYesFor12Months(){
        return cy.get(' #person-form-living-together-yes');
    };
    selectNoFor12Months(){
        return cy.get(' #person-form-living-together-no');
    };

    selectYesForOccupyanyOther() {
        return cy.get(' #person-form-main-home-yes');
    };
    selectNoForOccupyanyOther() {
        return cy.get(' #person-form-main-home-no');
    };

    selectYesForSurvivorOfOne() {
        return cy.get("#person-form-survivor-yes");
    };
    selectNoForSurvivorOfOne() {
        return cy.get("#person-form-survivor-no");
    };

    selectYesForTenantEvicted() {
        return cy.get("#person-form-evicted-yes");
    };
    selectNoForTenantEvicted() {
        return cy.get("#person-form-evicted-no");
    }

    selectYesForImmigrationControl () {
        return cy.get("#person-form-immigration-yes");
    };
    selectNoForImmigrationControl () {
        return cy.get("#person-form-immigration-no");
    };

    selectYesForLiveNotice() {
        return cy.get("#person-form-seeking-possession-yes");
    };
    selectNoForLiveNotice() {
        return cy.get("#person-form-seeking-possession-no");
    };

    selectYesForRentArrears() {
        return cy.get("#person-form-rent-arrears-yes");
    };
    selectNoForRentArrears() {
        return cy.get("#person-form-rent-arrears-no");
    }

    continueButton() {
        return cy.get("[data-testid=soletojoint-CheckEligibility] > .govuk-button");
    }
}
export default TenureRequestDocsPageObjects;