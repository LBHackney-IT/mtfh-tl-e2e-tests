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
    personPage.expandPersonalDetails().click({force: true})
})

Then('the body Person details are displayed', () => {
    personPage.bodyPersonalDeatailsAreDisplayed()
})

When('I click on the add comment button', () => {
    personPage.addCommentButton().click()
})

Then('I am taken to the add comment for person page {string}', (record) => {
    cy.url().should('contain', `${envConfig.baseUrl}/${envConfig.personCommentsUrl}/${record}`)
})

Then('the new comment is loaded', () => {
    personPage.commentTable().contains(validComment.validComment)
})