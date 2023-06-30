import { Given, Then, When, And } from "@badeball/cypress-cucumber-preprocessor";
import ActivityHistoryPageObjects from '../../pageObjects/activityHistoryPersonPage'
import { getPersonWithGuid } from "../../../api/models/requests/createPersonModel";
import { addTestRecordToDatabase } from "../common/common";

const activityHistoryObjects = new ActivityHistoryPageObjects()

Given("I seeded the database with a person with GUID {string}", (personGuid) => {
    cy.log("Seeding database").then(async () => {
        const testPerson = getPersonWithGuid(personGuid);

        cy.log("Adding test person to database and creating a record of it in recordsToDelete.json file")
        await addTestRecordToDatabase("Persons", testPerson);
    })
})

Given('I go to the activity history for person with GUID {string}', (personGuid) => {
    activityHistoryObjects.visit(personGuid)

    cy.intercept("GET", `*/api/v1/activityhistory?pageSize=5&targetId=${personGuid}`, { fixture: "activity-history.json" }).as("getActivityHistory")
    cy.wait("@getActivityHistory")
})

And('table headers should visible', () => {
    activityHistoryObjects.tableHeaders().forEach(tableHeader => {
        cy.contains(tableHeader).should('be.visible')
    })
})

And('the name of the person should be visible', () => {
    // The name below comes from the person record returned by getPersonWithGuid()
    cy.contains("John Doe").should('be.visible')
})

Then('the activity history is displayed', () => {
    activityHistoryObjects.activityTable().should('be.visible')
})

When('I click close activity history', () => {
    activityHistoryObjects.closeActivityHistory().click()
})