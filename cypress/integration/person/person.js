import { Given, Then, When } from "cypress-cucumber-preprocessor/steps"
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
    personPage.feedbackMessageContainer().contains('There was a problem retrieving the record')
})

Then('the header Person details are displayed', () => {
    personPage.personalDetailsContainer().contains('Date of birth')
    personPage.personalDetailsContainer().contains('Phone')
    personPage.personalDetailsContainer().contains('Email')
})

When('I click on the more personal details accordion', () => {
    personPage.morePersonalDetailsAccordion().click()
})

Then('the body Person details are displayed', () => {
    personPage.personDetails().contains('Place of birth')
})

When('I click on the more tenure details accordion', () => {
    personPage.moreTenureDetailsAccordion().click({force: true})
})

Then('the body tenure details are displayed', () => {
    personPage.tenureDetails().contains('Address')
    personPage.tenureDetails().contains('Payment ref')
    personPage.tenureDetails().contains('Property ref')
    personPage.tenureDetails().contains('Tenure type')
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

Then('the personal details are displayed on the sidebar' ,() => {
    personPage.sidebar().contains('Date of birth')
    personPage.sidebar().contains('Phone 1')
    personPage.sidebar().contains('Email 1')
    personPage.sidebar().contains('Correspondence address 1')
    
})
    
When('I click on the more contact details accordion', () => {
    personPage.moreContactDetailsAccordion().click()
})

Then('the more contact details are displayed', () => {
    personPage.contactDetails().contains('Correspondence address 2')
    personPage.contactDetails().contains('Correspondence address 2 description')
})

Then('the personal details are displayed on the mobile content container', () => {
    personPage.personalDetailsMobile().contains('Date of birth')
    personPage.personalDetailsMobile().contains('Phone 1')
    personPage.personalDetailsMobile().contains('Email 1')
    personPage.personalDetailsMobile().contains('Correspondence address 1')
})