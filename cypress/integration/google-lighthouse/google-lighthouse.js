import { Then } from "cypress-cucumber-preprocessor/steps";
import HomePageObjects from '../../pageObjects/homePage';
import SearchPageObjects from '../../pageObjects/searchPage';
import PersonPageObjects from '../../pageObjects/personPage';
import PersonCommentsPageObjects from '../../pageObjects/personCommentsPage';

const homePage = new HomePageObjects()
const searchPage = new SearchPageObjects()
const personPage = new PersonPageObjects()
const personComments = new PersonCommentsPageObjects()
const record = 'aac57a95-11e4-9eeb-954a-c2dd5a0a7f31'

Then('I perform a Lighthouse audit on the home page', () => {
    homePage.visit()
    cy.lighthouse()
    // cy.pa11y()
})

Then('I perform a Lighthouse audit on the search page', () => {
    searchPage.visit()
    cy.lighthouse()
    // cy.pa11y()
})

Then('I perform a Lighthouse audit on the person page', () => {
    personPage.visit(record)
    cy.lighthouse()
    // cy.pa11y()
})

Then('I perform a Lighthouse audit on the person comment page', () => {
    personComments.visit(record)
    cy.lighthouse()
    // cy.pa11y()
})