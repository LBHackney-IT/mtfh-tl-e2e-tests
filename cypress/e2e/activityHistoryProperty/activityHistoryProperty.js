import { And, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor"
import ActivityHistoryPropertyPageObjects from '../../pageObjects/activityHistoryPropertyPage'

const activityHistoryProperty = new ActivityHistoryPropertyPageObjects()

Given('I go to the property activity history', () => {
    cy.getAssetFixture().then((PropertyRecord) => {
        activityHistoryProperty.visit(PropertyRecord.id)
        cy.intercept("GET", `*/api/v1/activityhistory*`, { fixture: "activity-history-property.json" }).as("getActivityHistory")
        cy.wait("@getActivityHistory")
    })
})

When('I click close activity history', () => {
    activityHistoryProperty.closeActivityHistoryButton().click()
})

Then('the property activity history is displayed', () => {
    activityHistoryProperty.activityHistoryPropertyActivities().should('be.visible')
    cy.getActivityHistoryPropertyFixture().then((AHPropertyRecord) => {
        var ahItem = AHPropertyRecord["results"][0]
        cy.contains(ahItem.oldData.name).should('be.visible');
        cy.contains(ahItem.oldData.contactDetails.emailAddress).should('be.visible');
        cy.contains(ahItem.newData.name).should('be.visible');
        cy.contains(ahItem.newData.contactDetails.emailAddress).should('be.visible');
    })
})

Then('table headers should be visible', () => {
    activityHistoryProperty.tableHeaders().forEach(tableHeader => {
        cy.contains(tableHeader).should('be.visible')
    })
})

Then('the update exists in the activity history {string}', (update) => {
    activityHistoryProperty.activityHistoryCell().eq(6).contains(`Changed to: ${update}`)
})

Then("I am on the property page for the property", () => {
    cy.getAssetFixture().then((PropertyRecord) => {
        cy.url().should("include", PropertyRecord.id);
    })
});
