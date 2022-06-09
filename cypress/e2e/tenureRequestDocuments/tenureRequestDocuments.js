import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";

const processPage = new ProcessesPageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();

Given("the application has passed eligibility and the housing officer breach of tenancy checks for the tenure {string}", (tenureId) => {
    processPage.visit(tenureId);
    processPage.agreementCheckBox().click();
    processPage.startProcessButton().click();
    cy.url().should("include", "processes/soletojoint/");
    processPage.personRadioButton().click();
    cy.contains('Next').click();
    processPage.textAutomaticEligibiltyChecksPassed().should('be.visible');
    processPage.selectYesFor12Months().click();
    processPage.selectNoForOccupyanyOther().click();
    processPage.selectNoForSurvivorOfOne().click();
    processPage.selectNoForTenantEvicted().click();
    processPage.selectNoForImmigrationControl().click();
    processPage.selectNoForLiveNotice().click();
    processPage.selectNoForRentArrears().click();
    cy.contains('Next').click();
    tenureReqDocsPage.textHeaderNextSteps().should('be.visible');
    tenureReqDocsPage.textPassInitialEligReqs().should('be.visible');
    cy.reload();
    tenureReqDocsPage.textBreachOfTenure().should('be.visible');
    tenureReqDocsPage.statusBreachOfTenureCheck().should('be.visible');
    tenureReqDocsPage.statusActiveCheck().should('be.visible');
    tenureReqDocsPage.statusActiveCheck().should('contain.text','Breach of tenure check');
    tenureReqDocsPage.tenantLiveNoticeNo().click();
    tenureReqDocsPage.cautionaryContactNo().click();
    tenureReqDocsPage.cautionaryContactDenyApp().click();
    tenureReqDocsPage.successionNo().click();
});

When("I click the Next button", () => {
    cy.contains('Next').click();
});
Then("Request Documents page is displayed with success message for {string}", (textChecksPassed) => {
    cy.contains(textChecksPassed);
});
Then("{string} text is displayed", (textSuppDocs) => {
    cy.contains(textSuppDocs);
});
Then("{string} text and Resident's contact details are displayed for the {string}", (textChekingSuppDocs,tenant) => {
    cy.contains(textChekingSuppDocs);
    cy.contains(tenant);
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