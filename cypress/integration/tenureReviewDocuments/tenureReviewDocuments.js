import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";
import TenureReviewDocsPageObjects from "../../pageObjects/tenureReviewDocumentsPage";
import tenure from "../../../api/tenure";

const tenureReviewDocsPage = new TenureReviewDocsPageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();
const processPage = new ProcessesPageObjects();

const manualChecksPass = ({ id: tenureId, householdMembers}) => {
    processPage.visit(tenureId);
    processPage.agreementCheckBox().click();
    processPage.startProcessButton().click();
    cy.url().should("include", "processes/soletojoint/");
    cy.findByLabelText(`${householdMembers[2].fullName}`).click();
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
    tenureReqDocsPage.statusActiveCheck().should('contain.text','Breach of tenure check');
    tenureReqDocsPage.tenantLiveNoticeNo().click();
    tenureReqDocsPage.cautionaryContactNo().click();
    tenureReqDocsPage.successionNo().click();

};
Given("I have requested the documents via DES for the tenure", () => {
    cy.getTenureFixture().then(async (tenureInfo) => {
        const response = await tenure.getTenure(tenureInfo.id);
        manualChecksPass(response.data);
        cy.contains('Next').click();
        tenureReqDocsPage.requestDocsElectronically().click();
        tenureReqDocsPage.checkboxTenantDeclaration().click();
    })
});

When("I have proceeded to the next step", () => {
    cy.contains('Next').click();
});
Then("I view the page", () => {
    tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review Documents');
});
And("a confirmation alert confirming that eligibility checks have been passed", () => {
    cy.contains('Eligibility checks passed').should('exist');
    cy.get('a[href*="processes/soletojoint"]').contains('Show all eligibility checks');
});
And("a success message for requested documents via DES with a link to DES", () => {
    cy.contains('Documents requested').should('exist');
    cy.get('a[href*="evidence-store"]').contains('View request in Document Evidence Store');
});
And("a checklist of documents that will need to be seen before proceeding", () => {
    tenureReviewDocsPage.photoId().should('exist');
    tenureReviewDocsPage.secondId().should('exist');
    tenureReviewDocsPage.notImmigrationControl().should('exist');
    tenureReviewDocsPage.relationshipProof().should('exist');
    tenureReviewDocsPage.tenantLivingInProperty().should('exist');
});
And("the option to arrange an in person appointment to view the documents if necessary", () => {
    tenureReviewDocsPage.checkboxMakeAnAppointment().should('exist');
});
And("guidance text about closing the case due to failing the supporting documents check", () => {
    cy.contains('If the documents are not suitable and all avenues to obtain the right documents have been exhausted, then close the case.').should('exist');
});
And("I cannot proceed until all of the check boxes have been ticked", () => {
    cy.contains('Next').should('be.disabled');
});
And("the ability to close the case at this stage of the process", () => {
    cy.contains('Close Case').should('exist');
});

Given("I would like to check submitted documents in person for tenure", () => {
    cy.getTenureFixture().then(async (tenureInfo) => {
        const response = await tenure.getTenure(tenureInfo.id);
        manualChecksPass(response.data);
        cy.contains('Next').click();
        tenureReqDocsPage.requestDocsElectronically().click();
        tenureReqDocsPage.checkboxTenantDeclaration().click();
        cy.contains('Next').click();
        tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review Documents');
    })
});

When("I tick the checkbox to arrange an in person appointment to view the documents", () => {
    tenureReviewDocsPage.checkboxMakeAnAppointment().click();

});
Then("I can input an appointment date and time", () => {
    tenureReqDocsPage.day().clear().type('02');
    tenureReqDocsPage.month().clear().type('10');
    tenureReqDocsPage.year().clear().type('2022');
    tenureReqDocsPage.hour().clear().type('11');
    tenureReqDocsPage.minute().clear().type('10');
    tenureReqDocsPage.ampm().select('AM');
    cy.contains('Confirm Appointment').click();
});
And("I can confirm the appointment has been arranged", () => {
    cy.contains('Office appointment scheduled').should('exist');
    tenureReviewDocsPage.linkChange().should('exist');
});

Given("the documents have been provided by the resident for tenure", () => {
    cy.getTenureFixture().then(async (tenureInfo) => {
        const response = await tenure.getTenure(tenureInfo.id);
        manualChecksPass(response.data);
        cy.contains('Next').click();
        tenureReqDocsPage.requestDocsElectronically().click();
        tenureReqDocsPage.checkboxTenantDeclaration().click();
        cy.contains('Next').click();
        tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review Documents');
    })
});
When("I can complete the checklist of seen supporting documents are correct and valid", () => {
    tenureReviewDocsPage.photoId().click();
    tenureReviewDocsPage.secondId().click();
    tenureReviewDocsPage.notImmigrationControl().click();
    tenureReviewDocsPage.relationshipProof().click();
    tenureReviewDocsPage.tenantLivingInProperty().click();
});
Then("Next button is enabled and user can proceed to the next step", () => {
    cy.contains('Next').should('be.enabled');
});
Then("Next button is disabled", () => {
    cy.contains('Next').should('be.disabled');
});

Given("the applicant has failed the supporting documents check for tenure", () => {
    cy.getTenureFixture().then(async (tenureInfo) => {
        const response = await tenure.getTenure(tenureInfo.id);
        manualChecksPass(response.data);
        cy.contains('Next').click();
        tenureReqDocsPage.requestDocsElectronically().click();
        tenureReqDocsPage.checkboxTenantDeclaration().click();
        cy.contains('Next').click();
        tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review Documents');
    })
});
When("I decide to close the case", () => {
    cy.contains('Close Case').click();
});
Then("an overlay pops up and I must give a reason for rejection", () => {
    cy.on('window:alert', (text) => {
        expect(text).to.contains('Are you sure you want to close this process?');
    });
});
When("I will click on Close case once the rejection is given", () => {
    tenureReviewDocsPage.reasonCloseCase().clear().type('Test reason for Close case - photo id not given');
    tenureReviewDocsPage.alertCloseCase().click();
});
Then("I will confirm that the outcome letter has been sent and case will be closed", () => {
    cy.contains('Sole to joint application will be closed');
    cy.contains('Test reason for Close case - photo id not given');
    tenureReviewDocsPage.checkboxConfirmOutcomeLetter().click();
    tenureReviewDocsPage.buttonConfirm().click();
    cy.contains('Thank you for your confirmation');
})
And("case activity log is recorded with status closed", () => {
    tenureReqDocsPage.activityHistoryButton().click();
    tenureReviewDocsPage.activityHistoryText().should('exist');
});

Given("I have completed document upload for Sole to Joint for tenure", () => {
    cy.getTenureFixture().then(async (tenureInfo) => {
        const response = await tenure.getTenure(tenureInfo.id);
        manualChecksPass(response.data);
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
    })
});
Then("the Active status should be Submit case", () => {
    tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Submit case');
});
And("I am shown the expandable accordions of the previously completed steps Eligibility checks passed and Supporting documents approved", () => {
    cy.contains('Eligibility checks passed').should('exist');
    cy.contains('Supporting documents approved').should('exist');
    cy.get('a[href*="processes/soletojoint"]').contains('Show all eligibility checks');
    cy.get('a[href*="evidence-store"]').contains('View documents on the Document Evidence Store');
});
And("I can view the Tenure Investigation disclaimer", () => {
    tenureReviewDocsPage.headingTenureInvestigation().should('contain.text', 'Tenure Investigation');
});
When("I click the Submit case button", () => {
    tenureReviewDocsPage.submitButton().click();
});
Then("I am on the Next Steps page", () => {
    tenureReviewDocsPage.headingTenureInvestigation().should('contain.text', 'Next Steps:');
});
Then("the status is Finish", () => {
    tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Finish');
});
Then("I click on Continue button", () => {
    cy.contains('Continue').click();
});
Then("I can see the text {string}", (textTenureInvestigation) => {
    cy.contains(textTenureInvestigation).should('exist');
})
