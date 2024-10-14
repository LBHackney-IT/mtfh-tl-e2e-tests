import ProcessesPageObjects from "../pageObjects/ProcessesPage";
import { seedDatabase } from "../helpers/DbHelpers";
import PersonFormObjects from "../pageObjects/personFormPage";
import ReviewApplicationPageObjects from "../pageObjects/reviewApplicationPage";
import TenureRequestDocsPageObjects from "../pageObjects/tenureRequestDocumentsPage";
import TenureReviewDocsPageObjects from "../pageObjects/tenureReviewDocumentsPage";

const tenureReviewDocsPage = new TenureReviewDocsPageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();
const processPage = new ProcessesPageObjects();
const reviewAppPage = new ReviewApplicationPageObjects();
const addPersonPageObj = new PersonFormObjects();


function manualDataChecksPass({ id: tenureId, householdMembers }) {
    processPage.visit(tenureId);
    processPage.agreementCheckBox().click();
    processPage.startProcessButton().click();
    cy.url().should("include", "processes/soletojoint/");
    cy.findByLabelText(`${householdMembers[0].fullName}`).click();
    cy.contains('Next').click();
    processPage.textAutomaticEligibilityChecksPassed().should('be.visible');
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
    tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Breach of tenure check');
    tenureReqDocsPage.tenantLiveNoticeNo().click();
    tenureReqDocsPage.cautionaryContactNo().click();
    tenureReqDocsPage.successionNo().click();
};


describe ('After checks have completed, feedback is submitted and displayed - processes', {tags: ['@common', '@authetication', '@processes', '@worktray', '@root', '@personal-details']}, ()=> {
    beforeEach(()=> {
        cy.login();
        seedDatabase();
        cy.getTenureFixture().then((tenureInfo) => {
            manualDataChecksPass(tenureInfo);
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
        })
    })

    it('Tenure investigation recommendation - approve, HO Review - approve application', ()=> {
        cy.contains("I confirm that the tenure investigation has been completed").should('exist');
        reviewAppPage.checkboxConfirmTenureInvest().click();
        reviewAppPage.radioApprove().should('exist');
        reviewAppPage.radioAppointment().should('exist');
        reviewAppPage.radioDecline().should('exist');
        tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review application')
        
        cy.contains('Approve').click();
        reviewAppPage.buttonConfirm().click();
        cy.contains('Tenure investigator recommendation: Approve application');

        reviewAppPage.radiobuttonAHMReview().click();
        reviewAppPage.radiobuttonAHMApprove().click();
        reviewAppPage.checkboxAHMConfirm().click();
        reviewAppPage.inputAHMName().clear().type("Test Area Housing Manager");
        reviewAppPage.buttonConfirm().click();
        cy.contains('Sole to joint tenure application approved, next steps:');
        cy.contains(`Housing Officer reviewed and Area Housing Manager: Approve application`);
        reviewAppPage.appointmentDay().type('01');
        reviewAppPage.appointmentMonth().type('01');
        reviewAppPage.appointmentYear().type('2030');
        reviewAppPage.appointmentHour().type('10');
        reviewAppPage.appointmentMin().type('30');
        reviewAppPage.appointmentAMPM().select('AM');
        cy.contains('Continue').click();
        reviewAppPage.messageHeadingOfficeAppointment().should('contain.text', 'Office appointment scheduled');
    })

    it('Tenure investigation recommendation - appointment, HO Review - approve application', ()=> {
        cy.contains("I confirm that the tenure investigation has been completed").should('exist');
        reviewAppPage.checkboxConfirmTenureInvest().click();
        reviewAppPage.radioApprove().should('exist');
        reviewAppPage.radioAppointment().should('exist');
        reviewAppPage.radioDecline().should('exist');
        tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review application')
        
        cy.contains('Appointment').click();
        reviewAppPage.buttonConfirm().click();
        cy.contains('Tenure investigator recommendation: Interview Applicant');

        reviewAppPage.radiobuttonAHMReview().click();
        reviewAppPage.radiobuttonAHMApprove().click();
        reviewAppPage.checkboxAHMConfirm().click();
        reviewAppPage.inputAHMName().clear().type("Test Area Housing Manager");
        reviewAppPage.buttonConfirm().click();
        cy.contains('Tenure investigator recommendation: Interview Applicant');
        addPersonPageObj.confirmationModal().contains("Reason for Approval");
        reviewAppPage.interviewApplicantReason().clear().type("I have checked the documents and approving this application");
        reviewAppPage.confirmationModalApprove().click();
        cy.contains(`Housing Officer reviewed and Area Housing Manager: Approve application`);
        cy.contains("I have checked the documents and approving this application");
        cy.contains('Sole to joint tenure application approved, next steps:');
        reviewAppPage.appointmentDay().type('01');
        reviewAppPage.appointmentMonth().type('01');
        reviewAppPage.appointmentYear().type('2030');
        reviewAppPage.appointmentHour().type('10');
        reviewAppPage.appointmentMin().type('30');
        reviewAppPage.appointmentAMPM().select('AM');
        cy.contains('Continue').click();
        reviewAppPage.messageHeadingOfficeAppointment().should('contain.text', 'Office appointment scheduled');
    })

    it('Tenure investigation recommendation - decline, HO Review - approve application', ()=> {
        cy.contains("I confirm that the tenure investigation has been completed").should('exist');
        reviewAppPage.checkboxConfirmTenureInvest().click();
        reviewAppPage.radioApprove().should('exist');
        reviewAppPage.radioAppointment().should('exist');
        reviewAppPage.radioDecline().should('exist');
        tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review application')
        
        cy.contains('Decline').click();
        reviewAppPage.buttonConfirm().click();
        cy.contains('Tenure investigator recommendation: Decline');

        reviewAppPage.radiobuttonAHMReview().click();
        reviewAppPage.radiobuttonAHMApprove().click();
        reviewAppPage.checkboxAHMConfirm().click();
        reviewAppPage.inputAHMName().clear().type("Test Area Housing Manager");
        reviewAppPage.buttonConfirm().click();
        cy.contains('Tenure investigator recommendation: Decline');
        addPersonPageObj.confirmationModal().contains("Reason for Approval");
        reviewAppPage.interviewApplicantReason().clear().type("I have checked the documents and approving this application");
        reviewAppPage.confirmationModalApprove().click();
        cy.contains(`Housing Officer reviewed and Area Housing Manager: Approve application`);
        cy.contains("I have checked the documents and approving this application");
        cy.contains('Sole to joint tenure application approved, next steps:');
        reviewAppPage.appointmentDay().type('01');
        reviewAppPage.appointmentMonth().type('01');
        reviewAppPage.appointmentYear().type('2030');
        reviewAppPage.appointmentHour().type('10');
        reviewAppPage.appointmentMin().type('30');
        reviewAppPage.appointmentAMPM().select('AM');
        cy.contains('Continue').click();
        reviewAppPage.messageHeadingOfficeAppointment().should('contain.text', 'Office appointment scheduled');
    })

    it('Tenure investigation recommendation - approve, HO Review - decline application', ()=> {
        cy.contains("I confirm that the tenure investigation has been completed").should('exist');
        reviewAppPage.checkboxConfirmTenureInvest().click();
        reviewAppPage.radioApprove().should('exist');
        reviewAppPage.radioAppointment().should('exist');
        reviewAppPage.radioDecline().should('exist');
        tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review application')
        
        cy.contains('Approve').click();
        reviewAppPage.buttonConfirm().click();
        cy.contains('Tenure investigator recommendation: Approve');

        reviewAppPage.radiobuttonAHMReview().click();
        reviewAppPage.radiobuttonAHMDecline().click();
        reviewAppPage.checkboxAHMConfirm().click();
        reviewAppPage.inputAHMName().clear().type("Test Area Housing Manager");
        reviewAppPage.buttonConfirm().click();
        cy.contains('Tenure investigator recommendation: Approve');
        addPersonPageObj.confirmationModal().contains("Reason for Rejection");
        reviewAppPage.interviewApplicantReason().clear().type("I disagree with the Tenure Officer approval as the docs are not original");
        reviewAppPage.confirmationModalApprove().click();
        cy.contains(`Housing Officer reviewed and Area Housing Manager: Decline application`);
        cy.contains("I disagree with the Tenure Officer approval as the docs are not original");
        cy.contains('Sole to joint application will be closed');
        tenureReviewDocsPage.checkboxConfirmOutcomeLetter().click();
        cy.contains('Confirm').click();
    })
})