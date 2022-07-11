import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../../pageObjects/tenureRequestDocumentsPage";
import TenureReviewDocsPageObjects from "../../pageObjects/tenureReviewDocumentsPage";

const tenureReviewDocsPage = new TenureReviewDocsPageObjects();
const processPage = new ProcessesPageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();

Given("I select to initiate a Sole To Joint process {string}", (tenureId) => {
    processPage.visit(tenureId)
})

Then("the property details are shown", () => {
    processPage.tenureDetails().should("be.visible")
    processPage.tenureDetails().contains("Tenure payment ref 9156853502")
    processPage.tenureDetails().contains("ROOM 106 CAPE HOUSE 39 Dalston Lane E8 3DF")
})


When("I accept the terms and conditions", () => {
    processPage.agreementCheckBox().click()
})

And("I click the start process button", () => {
    processPage.startProcessButton().click()
})

Then("the status is set to Awaiting proposed tenant selection", () => {
    cy.url().should("include", "processes/soletojoint/")
})

Then("the start process button is disabled", () => {
    processPage.startProcessButton().should("be.disabled")
})

When("I click the cancel button", () => {
    processPage.cancelProcessLink().click()
})

Then("I am taken back to the processes menu {string}", (tenureId) => {
    cy.url().should("include", `processes/tenure/${tenureId}`)
})

When("I click the back link", () => {
    processPage.backLink().click()
});
Then("Sole tenant requests a joint tenure page is displayed", () => {
    processPage.headingSoleTenantRequestsAJointTenure().should('be.visible');
});

When("I select a person to add as a joint tenant", () => {
    processPage.personRadioButton().click();
});
Then("Eligibility checks passed page is displayed", () => {
    processPage.textAutomaticEligibiltyChecksPassed().should('be.visible');
});
Then("I can see Further eligibility questions", () => {
    tenureReqDocsPage.selectYesFor12Months().should('exist');
    tenureReqDocsPage.selectNoForOccupyanyOther().should('exist');
    tenureReqDocsPage.selectYesForSurvivorOfOne().should('exist');
    tenureReqDocsPage.selectYesForTenantEvicted().should('exist');
    tenureReqDocsPage.selectYesForImmigrationControl().should('exist');
    tenureReqDocsPage.selectYesForLiveNotice().should('exist');
    tenureReqDocsPage.selectYesForRentArrears().should('exist');
});
Then("Automatic Eligibility checks Failed page is displayed", () => {
    processPage.textAutomaticChecksFailed().should('be.visible');
});
Then("Close Case button is displayed", () => {
    processPage.buttonCloseCase().should('exist');
});
When("I select the answers for these questions",
    () => {
        tenureReqDocsPage.selectYesFor12Months().click();
        tenureReqDocsPage.selectNoForOccupyanyOther().click();
        tenureReqDocsPage.selectYesForSurvivorOfOne().click();
        tenureReqDocsPage.selectYesForTenantEvicted().click();
        tenureReqDocsPage.selectYesForImmigrationControl().click();
        tenureReqDocsPage.selectYesForLiveNotice().click();
        tenureReqDocsPage.selectYesForRentArrears().click();
        tenureReqDocsPage.selectNoForHoldATenancyElseWhere().click();
    });
Then("the page is displayed with the text 'Passed automatic eligibility checks' and 'Not eligible for a sole to joint tenure'", () => {
    processPage.textAutomaticEligibiltyChecksPassed().should('be.visible');
    processPage.textAutomaticChecksFailed().should('be.visible');
});
Then("I can see the text {string} adding {string} in the header section", (tenant, proposedTenant) => {
    cy.contains(`${tenant} adding ${proposedTenant}`);
});

When("I select the checkbox 'I confirm that an outcome letter has been sent to the resident'", () => {
    tenureReviewDocsPage.checkboxConfirmOutcomeLetter().click();
});
When('I click on the confirm button', () => {
    tenureReviewDocsPage.buttonConfirm().click();
})
Then("{string} message is displayed with a link to Return to Home page", (confirmationText) => {
    cy.contains(confirmationText);
    cy.contains("This case is now closed and we have recorded this on the system - that you have sent an outcome letter to the resident. The outcome can be viewed in the activity history");
    cy.contains("This case is now closed and we have record this on the system - that you have sent an outcome letter to the resident. The outcome can be viewed in the activity history");
    cy.contains("a", "Return to home page").should("have.attr", "href");
});
