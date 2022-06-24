import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";
import TenureReviewDocsPageObjects from "../../pageObjects/tenureReviewDocumentsPage";
import ReviewApplicationPageObjects from "../../pageObjects/reviewApplicationPage";

const tenureReviewDocsPage = new TenureReviewDocsPageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();
const processPage = new ProcessesPageObjects();
const reviewAppPage = new ReviewApplicationPageObjects();

const manualChecksPass = (tenureId) => {
    processPage.visit(tenureId);
    processPage.agreementCheckBox().click();
    processPage.startProcessButton().click();
    cy.url().should("include", "processes/soletojoint/");
    processPage.personRadioButton().click();
    cy.contains('Next').click();
    processPage.textAutomaticEligibiltyChecksPassed().should('be.visible');
    tenureReqDocsPage.selectYesFor12Months().click();
    tenureReqDocsPage.selectNoForOccupyanyOther().click();
    tenureReqDocsPage.selectNoForSurvivorOfOne().click();
    tenureReqDocsPage.selectNoForTenantEvicted().click();
    tenureReqDocsPage.selectNoForImmigrationControl().click();
    tenureReqDocsPage.selectNoForLiveNotice().click();
    tenureReqDocsPage.selectNoForRentArrears().click();
    cy.contains('Next').click();
    tenureReqDocsPage.textHeaderNextSteps().should('be.visible');
    tenureReqDocsPage.textPassInitialEligReqs().should('be.visible');
    tenureReqDocsPage.continueButton().click();
    tenureReqDocsPage.textBreachOfTenure().should('be.visible');
    tenureReqDocsPage.statusBreachOfTenureCheck().should('be.visible');
    tenureReqDocsPage.statusActiveCheck().should('be.visible');
    tenureReqDocsPage.statusActiveCheck().should('contain.text','Breach of tenure check');
    tenureReqDocsPage.tenantLiveNoticeNo().click();
    tenureReqDocsPage.cautionaryContactNo().click();
    tenureReqDocsPage.successionNo().click();
};

Given("The tenure investigation has been completed for tenure {string}", (tenureId) => {
    manualChecksPass(tenureId);
    cy.contains('Next').click();
    tenureReqDocsPage.requestDocsElectronically().click();
    cy.contains('Next').click();
    tenureReviewDocsPage.photoId().click();
    tenureReviewDocsPage.secondId().click();
    tenureReviewDocsPage.notImmigrationControl().click();
    tenureReviewDocsPage.relationshipProof().click();
    tenureReviewDocsPage.tenantLivingInProperty().click();
    cy.contains('Next').click();
    tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Submit case');
    tenureReviewDocsPage.submitButton().click();
    tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Finish');
    cy.contains('Continue').click();
});

Then("I am not able to choose the recommendation until I have ticked the box", () => {
    reviewAppPage.buttonApprove().should('be.disabled');
    reviewAppPage.buttonAppointment().should('be.disabled');
    reviewAppPage.buttonDecline().should('be.disabled');
});
When('I tick the box {string}', (textTenureInvestigation) => {
    cy.contains(textTenureInvestigation).should('exist');
    reviewAppPage.checkboxConfirmTenureInvest().click();
});
When("I am able to choose which recommendation the tenure investigator has given Approve Decline or Appointment", () => {
    reviewAppPage.buttonApprove().should('be.enabled');
    reviewAppPage.buttonAppointment().should('be.enabled');
    reviewAppPage.buttonDecline().should('be.enabled');
});
Then("I can see Next steps Make an appointment or pass the case to Housing Manager", () => {

});
And("case activity log is recorded", () => {

});
And('the progress indicator is still in "Review Application"', () => {

});