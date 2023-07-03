import { Given, Then, When, And } from "@badeball/cypress-cucumber-preprocessor"
import ActivityHistoryTenurePageObjects from '../../pageObjects/activityHistoryTenurePage'
import { getTenureWithGuid } from "../../../api/models/requests/addTenureModel"
import { addTestRecordToDatabase } from "../common/common"

const activityHistoryTenure = new ActivityHistoryTenurePageObjects()

Given('I go to the tenure activity history for tenure with GUID {string}', (tenureGuid) => {
    activityHistoryTenure.visit(tenureGuid)

    cy.intercept("GET", `*/api/v1/activityhistory?pageSize=5&targetId=${tenureGuid}`, { fixture: "activity-history-tenure.json" }).as("getActivityHistory")
    cy.wait("@getActivityHistory")
})

Then('tenure migrated activity history is displayed', () => {
    activityHistoryTenure.activityHistoryTenureActivities().contains('Tenure migrated')
})

When('I click close activity history', () => {
    activityHistoryTenure.closeActivityHistoryButton().click()
})

Then('the tenure activity history is displayed', () => {
    activityHistoryTenure.activityHistoryTenureActivities().should('be.visible')
    
    // Check that the information hardcoded in the tenure record we're using is visible
    cy.contains(getTenureWithGuid().tenuredAsset.fullAddress).should('be.visible');
    cy.contains(getTenureWithGuid().paymentReference).should('be.visible');
})

And('table headers should be visible', () => {
    activityHistoryTenure.tableHeaders().forEach(tableHeader => {
        cy.contains(tableHeader).should('be.visible')
    })
})

Then('the update exists in the activity history {string}', (update) => {
    activityHistoryTenure.activityHistoryCell().eq(6).contains(`Changed to: ${update}`)
})

Given("I seeded the database with a tenure with GUID {string}", (tenureGuid) => {
    cy.log("Seeding database").then(async () => {
        const testTenure = getTenureWithGuid(tenureGuid);

        cy.log("Adding test tenure to database and creating a record of it in recordsToDelete.json file")
        await addTestRecordToDatabase("TenureInformation", testTenure);
    })
})

And("I am on the tenure page for tenure with GUID {string}", (tenureGuid) => {
    cy.url().should("include", tenureGuid);
});
