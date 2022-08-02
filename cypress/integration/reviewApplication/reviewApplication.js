import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";
import TenureReviewDocsPageObjects from "../../pageObjects/tenureReviewDocumentsPage";
import ReviewApplicationPageObjects from "../../pageObjects/reviewApplicationPage";
import addPersonPage from "../../pageObjects/addPersonPage";

const tenureReviewDocsPage = new TenureReviewDocsPageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();
const processPage = new ProcessesPageObjects();
const reviewAppPage = new ReviewApplicationPageObjects();
const addPersonPageObj = new addPersonPage();

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
    tenureReqDocsPage.selectNoForHoldATenancyElseWhere().click();
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
    tenureReqDocsPage.checkboxTenantDeclaration().click();
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
Then("I can see Next steps Make an appointment or pass the case to Area Housing Manager", () => {
    cy.contains('Next steps');
    cy.contains('Make an appointment with the applicant for an interview');
    cy.contains('I have passed the case to the Area Housing Manager for review and received a decision');
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

Then("case activity log is recorded", () => {

});
Then('the progress indicator is still in "Review Application"', () => {
    tenureReqDocsPage.statusActiveCheck().should('contain.text','Review application');
});

When("I select the option pass the case to Area Housing Manager", () => {
    reviewAppPage.radiobuttonAHMReview().click();
});
When("I select the option pass the case to Area Housing Manager", () => {
    reviewAppPage.radiobuttonAHMReview().click();
});
When("the decision is selected as 'Approve'", () => {
    reviewAppPage.radiobuttonAHMApprove().click();
});
When("I confirm the instruction is received by Area Housing Manager", () => {
    reviewAppPage.checkboxAHMConfirm().click();
});
When("I enter Area Housing Manager's name", () => {
    reviewAppPage.inputAHMName().clear().type("Test Area Housing Manager");
});
When("I click on Confirm button", () => {
    reviewAppPage.buttonConfirm().click();
});
Then("model dialog is displayed", () => {
    addPersonPageObj.confirmationModal().should('be.visible');
});
When("I select Approve", ()=> {
    addPersonPageObj.confirmationModal().contains('Approve');
    reviewAppPage.confirmationModelApprove().click();
});
Then("Sole to joint application approved text is displayed", () => {
    cy.contains('Sole to joint tenure application approved, next steps:');
});
Then("Office appointment scheduled message is displayed", () => {
    reviewAppPage.messageHeadingOfficeAppointment().should('contain.text', 'Office appointment scheduled');
});
When("I enter data and time and click Continue button", () => {
    reviewAppPage.appointmentDay().type('01');
    reviewAppPage.appointmentMonth().type('01');
    reviewAppPage.appointmentYear().type('2023');
    reviewAppPage.appointmentHour().type('10');
    reviewAppPage.appointmentMin().type('30');
    reviewAppPage.appointmentAMPM().select('AM');
    cy.contains('Continue').click();
});
Then("Office appointment scheduled message is displayed", () => {
    reviewAppPage.messageHeadingOfficeAppointment().should('contain.text','Office appointment scheduled');
});
When("I enter Reason for Approval", () => {
    reviewAppPage.interviewApplicantReason().clear().type('I have checked the documents and approving this application');
});
When("I select the recommendation as {string}", (decision) => {
    switch (decision)
    {
        case'Approve':
        {
            cy.contains('Approve').click();
            cy.contains('Tenure investigator recommendation: Approve application');
            break;
        }
        case'Appointment':
        {
            cy.contains('Appointment').click();
            cy.contains('Tenure investigator recommendation: Interview Applicant');
            break;
        }
        case'Decline':
        {
            cy.contains('Decline').click();
            cy.contains('Tenure investigator recommendation: Decline application');
            break;
        }
    }
});

Then("model dialog is displayed with message {string}", (recommendation) => {
    switch (recommendation)
    {
        case'Tenure investigator recommendation: Approve application':
        {
            cy.contains('Tenure investigator recommendation: Approve application');
            break;
        }
        case'Tenure investigator recommendation: Interview Applicant':
        {
            cy.contains('Tenure investigator recommendation: Interview Applicant');
            break;
        }
        case'Tenure investigator recommendation: Decline application':
        {
            cy.contains('Tenure investigator recommendation: Decline application');
            break;
        }
    }
});
When("the decision is selected as 'Decline'", () => {
    cy.contains('Decline').click();
});
When("I enter Reason for Rejection", () => {
    addPersonPageObj.confirmationModal().contains('Reason for Rejection');
    reviewAppPage.interviewApplicantReason().clear().type('I disagree with the Tenure Officer approval as the docs are not original');
    reviewAppPage.confirmationModelApprove().click();
});
When("I click Decline button", () => {
    cy.contains('Confirm').click();
});
Then("{string} text is displayed", (reviewMessg) => {
    cy.contains(reviewMessg);
})