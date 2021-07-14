import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import ActivityHistoryPageObjects from '../../pageObjects/activityHistoryPage'
import testGuid from '../../helpers/personCommentText'
import dateCapture from '../common/common'

const activityHistory = new ActivityHistoryPageObjects()

Given('I go to the activity history for {string}', (person) => {
    activityHistory.visit(person)
})

Then('the activity history is displayed', () => {
    activityHistory.activityTable().should('be.visible')
})