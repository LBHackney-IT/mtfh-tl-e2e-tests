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
        return cy.get('#breach-form-type-cautionary-yes');
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
    checkboxTenantDeclaration() {
        return cy.get('#declaration-form-group-field');
    }
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
        return cy.get('#further-eligibility-living-together-yes');
    };
    selectNoFor12Months(){
        return cy.get('#further-eligibility-living-together-no');
    };

    selectYesForOccupyanyOther() {
        return cy.get('#further-eligibility-main-home-yes');
    };
    selectNoForOccupyanyOther() {
        return cy.get('#further-eligibility-main-home-no');
    };

    selectYesForSurvivorOfOne() {
        return cy.get("#further-eligibility-survivor-yes");
    };
    selectNoForSurvivorOfOne() {
        return cy.get("#further-eligibility-survivor-no");
    };

    selectYesForTenantEvicted() {
        return cy.get("#further-eligibility-evicted-yes");
    };
    selectNoForTenantEvicted() {
        return cy.get("#further-eligibility-evicted-no");
    }

    selectYesForImmigrationControl () {
        return cy.get("#further-eligibility-immigration-yes");
    };
    selectNoForImmigrationControl () {
        return cy.get("#further-eligibility-immigration-no");
    };

    selectYesForLiveNotice() {
        return cy.get("#further-eligibility-seeking-possession-yes");
    };
    selectNoForLiveNotice() {
        return cy.get("#further-eligibility-seeking-possession-no");
    };

    selectYesForRentArrears() {
        return cy.get("#further-eligibility-rent-arrears-yes");
    };
    selectNoForRentArrears() {
        return cy.get("#further-eligibility-rent-arrears-no");
    };

    selectYesForHoldATenancyElseWhere() {
        return cy.get('#further-eligibility-already-joint-tenant-yes');
    };
    selectNoForHoldATenancyElseWhere() {
        return cy.get('#further-eligibility-already-joint-tenant-no');
    };

    continueButton() {
        return cy.get("[data-testid=soletojoint-ManualChecksPassed] > .govuk-button");
    }
}
export default TenureRequestDocsPageObjects;