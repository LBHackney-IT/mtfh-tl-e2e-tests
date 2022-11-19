import { When, Then, Given, And } from "@badeball/cypress-cucumber-preprocessor";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";
import TenurePageObjects from "../../pageObjects/tenurePage";
import TenureReviewDocsPageObjects from "../../pageObjects/tenureReviewDocumentsPage";

const tenureReviewDocsPage = new TenureReviewDocsPageObjects();
const tenurePage = new TenurePageObjects();
const processPage = new ProcessesPageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();

const manualChecksPass = ({ id: tenureId, householdMembers }) => {
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
    tenureReqDocsPage.statusActiveCheck().should('contain.text','Breach of tenure check');
    tenureReqDocsPage.tenantLiveNoticeNo().click();
    tenureReqDocsPage.cautionaryContactNo().click();
    //tenureReqDocsPage.cautionaryContactDenyApp().click();
    tenureReqDocsPage.successionNo().click();
};

Given("the application has passed eligibility and the housing officer breach of tenancy checks for the tenure", () => {
    cy.getTenureFixture().then((tenureInfo) => {
        manualChecksPass(tenureInfo);
    });
});

When("I click the Next button", () => {
    cy.contains('Next').click();
});
Then("{string} text is displayed", (textSuppDocs) => {
    cy.contains(textSuppDocs);
});
Then("Request Documents page is displayed with success message for {string}", (textChecksPassed) => {
    cy.contains(textChecksPassed);
});
Then("{string} text and Resident's contact details are displayed", (textChekingSuppDocs) => {
    cy.contains(textChekingSuppDocs);
    cy.get('[data-testid=soletojoint-RequestDocuments] > :nth-child(10)').should('not.be.empty');
    // cy.contains('Phone:').should('have.value','not.be.empty');
    // cy.contains('Email:').should('have.value','not.be.empty');
});
Then("a radio button to automatically request the documents on DES is displayed", () => {
    tenureReqDocsPage.requestDocsElectronically().should('exist');
});
Then("a radio button to make an appointment to review the Supporting documents is displayed", () => {
    tenureReqDocsPage.makeAnAppointToCheckSuppDocs().should('exist');
});
When("I click on New Process button", () => {
    tenurePage.newProcess().click();
});
When("I click on process Sole tenant requests a joint tenure link", () => {
    processPage.linkSoleToJoint().click();
    processPage.headingSoleTenantRequestsAJointTenure().click();
});

Given("I am on the Request Documents page for the tenure", () => {
    cy.getTenureFixture().then((tenureInfo) => {
        manualChecksPass(tenureInfo);
    });
})
When("I have not selected any of the radio button options but selected Tenant declaration", () => {
    tenureReqDocsPage.checkboxTenantDeclaration().click();
});
When("I click on Next button in request documents page", () => {
   cy.contains('Next').click();
});
Then("error message is displayed", () => {
    cy.get('#request-type-form-group-error').should('contain.text', 'You must select an option to proceed');
});
When("I have selected electronically requesting the documents via DES", () =>{
    tenureReqDocsPage.requestDocsElectronically().click();
});
And("I have confirmed Tenant Declaration", () =>{
    tenureReqDocsPage.checkboxTenantDeclaration().click();
});

And("I am able to see the {string} state is Active", () =>{
    tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review Documents');
});
And("a case activity log is created", () => {
    tenureReqDocsPage.activityHistoryButton().click();
});
When("I select that I have made an appointment to check supporting documents", () => {
    cy.contains('Next').click();
    tenureReqDocsPage.makeAnAppointToCheckSuppDocs().click();
});
And("I input the appointment date and time", () => {
    tenureReqDocsPage.day().clear().type('01');
    tenureReqDocsPage.month().clear().type('10');
    tenureReqDocsPage.year().clear().type('2025');
    tenureReqDocsPage.hour().clear().type('10');
    tenureReqDocsPage.minute().clear().type('10');
    tenureReqDocsPage.ampm().select('AM');
});
Then("the option to proceed is enabled", () => {
    tenureReqDocsPage.nextButton().click();
});
And("a case activity log is created for {string}", () => {
    tenureReqDocsPage.activityHistoryButton().click();
});
When("I click on the current tenant’s name in the heading", () => {
    tenureReqDocsPage.personLink().click();
});
Then("I am taken to the current tenant’s person page which will be opened in a new tab", () => {
    tenureReqDocsPage.personLink().invoke('removeAttr', 'target').click();
    cy.url()
      .should('include', '/person/')
    cy.findAllByText('Date of birth:');
});
Given("the application has passed eligibility and failed the breach of tenancy checks for the tenure", () => {
    cy.getTenureFixture().then((tenureInfo) => {
        const { id: tenureId, householdMembers } = tenureInfo;
        processPage.visit(tenureId);
        processPage.agreementCheckBox().click();
        processPage.startProcessButton().click();
        cy.url().should("include", "processes/soletojoint/");
        cy.findByLabelText(`${householdMembers[1].fullName}`).click();
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
        tenureReqDocsPage.tenantLiveNoticeYes().click();
        tenureReqDocsPage.cautionaryContactYes().click();
        tenureReqDocsPage.cautionaryContactDenyApp().click();
        tenureReqDocsPage.successionNo().click();
    });
});
When("I click the next button on breach tenure page", () => {
    cy.contains('Next').click();
});
Then("Breach of tenure eligibility checks Failed page is displayed", () => {
    cy.contains('Failed breach of tenure check:');
});
When("I select the checkbox 'I confirm that an outcome letter has been sent to the resident'", () => {
    tenureReviewDocsPage.checkboxConfirmOutcomeLetter().click();
});
When('I click on the confirm button', () => {
    tenureReviewDocsPage.buttonConfirm().click();
});
Then("{string} message is displayed with a link to Return to Home page", (confirmationText) => {
    cy.contains(confirmationText);
    cy.contains("This case is now closed and we have recorded this on the system - that you have sent an outcome letter to the resident. The outcome can be viewed in the activity history");
    cy.contains("a", "Return to home page").should("have.attr", "href");
});
Given("I have requested the documents via DES for the tenure", () => {
    cy.getTenureFixture().then((tenureInfo) => {
        manualChecksPass(tenureInfo);
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
    cy.contains('Show all eligibility checks');
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
    cy.getTenureFixture().then((tenureInfo) => {
        manualChecksPass(tenureInfo);
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
    tenureReqDocsPage.year().clear().type('2025');
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
    cy.getTenureFixture().then((tenureInfo) => {
        manualChecksPass(tenureInfo);
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
    cy.getTenureFixture().then((tenureInfo) => {
        manualChecksPass(tenureInfo)
        cy.contains('Next').click();
        tenureReqDocsPage.requestDocsElectronically().click();
        tenureReqDocsPage.checkboxTenantDeclaration().click();
        cy.contains('Next').click();
        tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review Documents');
    });
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
});

Given("I have completed document upload for Sole to Joint for tenure", () => {
    cy.getTenureFixture().then((tenureInfo) => {
        manualChecksPass(tenureInfo);
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
    });
});
Then("the Active status should be Submit case", () => {
    tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Submit case');
});
And("I am shown the expandable accordions of the previously completed steps Eligibility checks passed and Supporting documents approved", () => {
    cy.contains('Eligibility checks passed').should('exist');
    cy.contains('Supporting documents approved').should('exist');
    cy.contains('Show all eligibility checks');
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


