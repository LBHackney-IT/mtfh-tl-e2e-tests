import { When, Then, Given, And } from "@badeball/cypress-cucumber-preprocessor";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";
import TenurePageObjects from "../../pageObjects/tenurePage";
import TenureReviewDocsPageObjects from "../../pageObjects/tenureReviewDocumentsPage";
import tenure from "../../../api/tenure";

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
When("I have not selected any of the radio button options", () => {
    cy.contains('Next').click();
    tenureReqDocsPage.requestDocsElectronically().should('exist');
});
Then("the option to proceed to the next step is disabled", () => {
    cy.contains('Next').should('be.disabled');
});
When("I have selected electronically requesting the documents via DES", () =>{
    tenureReqDocsPage.requestDocsElectronically().click();
});
And("I have confirmed Tenant Declaration", () =>{
    tenureReqDocsPage.checkboxTenantDeclaration().click();
});
And("I am able to see the {string} state is Active", (state) =>{
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
And("a case activity log is created for {string}", (text) => {
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

