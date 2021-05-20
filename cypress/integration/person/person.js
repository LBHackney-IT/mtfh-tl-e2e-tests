import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import PersonPageObjects from '../../pageObjects/personPage'
import envConfig from '../../../environment-config'
import validComment from '../../helpers/personCommentText'


const personPage = new PersonPageObjects()

Given('I have loaded a Person record {string}', (record) => {
    personPage.visit(record)
})

Given('I have loaded an invalid person record {string}', (record) => {
    personPage.visit(record)
})

Then('The person you\'ve requested does not exist error message appears', () => {
    personPage.feedbackMessageContainer().should('be.visible')
    personPage.feedbackMessageContainer().contains('The person you\'ve requested does not exist')
})

Then('the header Person details are displayed', () => {
    personPage.headerPersonalDetailsAreDisplayed()
})

When('I am using a mobile viewport {string}', (device) => {
    cy.viewport(`${device}`)
})

When('I click on the expand all sections button', () => {
    personPage.expandPersonalDetails().click()
})

Then('the body Person details are displayed', () => {
    personPage.bodyPersonalDeatailsAreDisplayed()
})

Then('I am taken to the add comment for person page', (record) => {
    cy.url().should('eq', `${envConfig.baseUrl}/${envConfig.personCommentsUrl}/${record}`)
})

Then('The new comment is loaded', () => {
    personPage.commentTable().contains('aac57a95-11e4-9eeb-954a-c2dd5a0a7f31')
})