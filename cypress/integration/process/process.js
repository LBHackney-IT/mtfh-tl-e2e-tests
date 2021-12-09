import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";

const processPage = new ProcessesPageObjects()

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
    processPage.cancelProcessLink.click()
})

Then("I am taken back to the processes menu {string}", (tenureId) => {
    cy.url().should("include", `processes/tenure/${tenureId}`)
})

When("I click the back link", () => {
    processPage.backLink().click()
})
