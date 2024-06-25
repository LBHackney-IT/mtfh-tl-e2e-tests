import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor"
import PersonPageObjects from '../../pageObjects/personPage'
import validComment from '../../helpers/personCommentText'


const personPage = new PersonPageObjects()

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
    personPage.morePersonalDetailsAccordion().click({force: true})
})

Then('the body Person details are displayed', () => {
    personPage.personDetails().contains('Place of birth')
})

When('I click on the more tenure details accordion', () => {
    personPage.moreTenureDetailsAccordion().click({force: true})
})

When('I click on the equality details accordion', () => {
    personPage.equalityDetailsAccordion().click({force: true})
})

Then('the equality information is displayed', () => {
    personPage.equalityDetails().contains('Age group:')
    personPage.equalityDetails().contains('Caring for someone:')
    personPage.equalityDetails().contains('Disabled:')
    personPage.equalityDetails().contains('Ethnicity:')
    personPage.equalityDetails().contains('Gender:')
    personPage.equalityDetails().contains('Religion or belief:')
    personPage.equalityDetails().contains('Sexual orientation:')
    personPage.equalityDetails().contains('Pregnant or maternity leave (in the past 2 years):')
})

Then('the body tenure details are displayed', () => {
    personPage.tenureDetails().contains('Address')
    personPage.tenureDetails().contains('Payment ref')
    personPage.tenureDetails().contains('Property ref')
    personPage.tenureDetails().contains('Tenure type')
    personPage.tenureDetails().contains('UPRN')
})

When('I click on the add comment button', () => {
    personPage.addCommentButton().click()
})

Then('I am taken to the add comment for person page', () => {
    cy.getPersonFixture((person) => {
        cy.url().should('contain', `${Cypress.config("baseUrl")}/${Cypress.config("personCommentsUrl")}/${person.id}`)
    })
})

Then('the new comment is loaded', () => {
    personPage.commentTable().contains(validComment.validComment)
})
    
When('I click on the more contact details accordion', () => {
    personPage.moreContactDetailsAccordion().click({force: true})
})

Then('the more contact details are displayed', () => {
    personPage.contactDetails().contains('Correspondence address 2')
    personPage.contactDetails().contains('Correspondence address 2 description')
})

Then('the personal details are displayed on the mobile content container', () => {
    cy.wait(1000)

    personPage.personalDetailsMobile().contains("Personal information");
    personPage.personalDetailsMobile().contains('Date of birth')
    
    personPage.personalDetailsMobile().contains("Contact details");
    personPage.personalDetailsMobile().contains('Home')
    personPage.personalDetailsMobile().contains('02072123456')
    
    personPage.personalDetailsMobile().contains("Email addresses");
    personPage.personalDetailsMobile().contains('Email 1')

    personPage.personalDetailsMobile().contains("Correspondence addresses");
    personPage.personalDetailsMobile().contains('Correspondence address 1')
})