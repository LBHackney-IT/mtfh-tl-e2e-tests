import { And, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor"
import ActivityHistoryTenurePageObjects from '../../pageObjects/activityHistoryTenurePage'

const activityHistoryTenure = new ActivityHistoryTenurePageObjects()

Given('I go to the tenure activity history', () => {
    cy.getTenureFixture().then((tenureRecord) => {
        activityHistoryTenure.visit(tenureRecord.id)
        cy.intercept("GET", `*/api/v1/activityhistory?pageSize=5&targetId=${tenureRecord.id}`, { fixture: "activity-history-tenure.json" }).as("getActivityHistory")
        cy.wait("@getActivityHistory")
    })
})
Given('I go to the tenure activity history for {string}', (tenure) => {
    cy.getTenureFixture().then(()=>{
        activityHistoryTenure.visit(tenure)
        cy.intercept("GET",`*/api/v1/activityhistory?targetId=${tenure}`, { fixture: "activity-history-tenure.json" }).as("getActivityHistory")
    })
})

Then('tenure migrated activity history is displayed', () => {
    activityHistoryTenure.activityHistoryTenureActivities().contains('Tenure migrated')
})

When('I click close activity history', () => {
    activityHistoryTenure.closeActivityHistoryButton().click()
})

Then('the tenure activity history is displayed', () => {
    activityHistoryTenure.activityHistoryTenureActivities().should('be.visible')
    cy.getTenureFixture().then((tenureRecord) => {
        cy.contains(tenureRecord.tenuredAsset.fullAddress).should('be.visible');
        cy.contains(tenureRecord.paymentReference).should('be.visible');
    })
})

And('table headers should be visible', () => {
    activityHistoryTenure.tableHeaders().forEach(tableHeader => {
        cy.contains(tableHeader).should('be.visible')
    })
})

Then('the update exists in the activity history {string}', (update) => {
    activityHistoryTenure.activityHistoryCell().contains(`Changed to: ${update}`)
})

And("I am on the tenure page for the tenure", () => {
    cy.getTenureFixture().then((tenureRecord) => {
        cy.url().should("include", tenureRecord.id);
    })
});
