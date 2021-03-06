import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import ActivityHistoryTenurePageObjects from '../../pageObjects/activityHistoryTenurePage'

const activityHistoryTenure = new ActivityHistoryTenurePageObjects()

Given('I go to the tenure activity history for {string}', (tenure) => {
    activityHistoryTenure.visit(tenure)
})

Then('tenure migrated activity history is displayed', () => {
    activityHistoryTenure.activityHistoryTenureActivities().contains('Tenure migrated')
})

When('I click close activity history', () => {
    activityHistoryTenure.closeActivityHistoryButton().click()
})

Then('the tenure activity history is displayed', () => {
    activityHistoryTenure.activityHistoryTenureActivities().should('be.visible')
})

Then('the update exists in the activity history {string}', (update) => {
    activityHistoryTenure.activityHistoryCell().eq(6).contains(`Changed to: ${update}`)
})