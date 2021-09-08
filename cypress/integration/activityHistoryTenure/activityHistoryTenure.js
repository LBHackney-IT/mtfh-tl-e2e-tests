import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import ActivityHistoryTenurePageObjects from '../../pageObjects/activityHistoryTenurePage'

const activityHistoryTenure = new ActivityHistoryTenurePageObjects()

Given('I go to the tenure activity history for {string}', (tenure) => {
    activityHistoryTenure.visit(tenure)
})

Then('no tenure activity history is displayed', () => {
    activityHistoryTenure.activityHistoryTenureActivities().contains('No activity history')
})

Then('I click close activity history', () => {
    activityHistoryTenure.closeActivityHistoryButton().click()
})