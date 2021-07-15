import { Then } from "cypress-cucumber-preprocessor/steps"
import ActivityHistoryPageObjects from '../../pageObjects/activityHistoryPage'
import AddPersonPageObjects from '../../pageObjects/addPersonPage'
import EditPersonPageObjects from '../../pageObjects/editPersonPage'
import HomePageObjects from '../../pageObjects/homePage'
import SearchPageObjects from '../../pageObjects/searchPage'
import PersonPageObjects from '../../pageObjects/personPage'
import PersonCommentsPageObjects from '../../pageObjects/personCommentsPage'
import PersonContactPageObjects from '../../pageObjects/personContactPage'
import TenurePageObjects from '../../pageObjects/tenurePage'

const activityHistory = new ActivityHistoryPageObjects()
const addPerson = new AddPersonPageObjects()
const editPersonPage = new EditPersonPageObjects()
const homePage = new HomePageObjects()
const searchPage = new SearchPageObjects()
const personPage = new PersonPageObjects()
const personComments = new PersonCommentsPageObjects()
const personContactPage = new PersonContactPageObjects()
const tenurePage = new TenurePageObjects()
const personRecord = 'aac57a95-11e4-9eeb-954a-c2dd5a0a7f31'
const tenureRecord = 'f160af3c-3b24-8817-7fa8-9c2a3c054c59'

Then('I perform a Lighthouse audit on the home page', () => {
    homePage.visit()
    cy.lighthouse()
    // cy.pa11y()
})

Then('I perform a Lighthouse audit on the search page', () => {
    searchPage.visit()
    // cy.pa11y()
})

Then('I perform a Lighthouse audit on the page', () => {
    cy.lighthouse()
    // cy.pa11y()
})

Then('I perform a Lighthouse audit on the person page', () => {
    personPage.visit(personRecord)
    // cy.pa11y()
})

Then('I perform a Lighthouse audit on the person comment page', () => {
    personComments.visit(personRecord)
    // cy.pa11y()
})

Then('I perform a Lighthouse audit on the tenure page', () => {
    tenurePage.visit(tenureRecord)
})

Then('I perform a Lighthouse audit on the create person page', () => {
    addPerson.visit(tenureRecord)
})

Then('I perform a Lighthouse audit on the contact details page', () => {
    personContactPage.visit(personRecord)
    cy.lighthouse()
})

Then('I perform a Lighthouse audit on the edit person page', () => {
    editPersonPage.visit(personRecord)
    cy.lighthouse()
})

Then('I perform a Lighthouse audit on the activity history page', () => {
    activityHistory.visit(personRecord)
    cy.lighthouse()
})