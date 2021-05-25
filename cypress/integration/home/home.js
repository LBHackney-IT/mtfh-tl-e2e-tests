import { Given } from "cypress-cucumber-preprocessor/steps";
import HomePageObjects from '../../pageObjects/homePage';

const homePage = new HomePageObjects()

Given('I am on the Home page', () => {
    homePage.visit()
    homePage.iAmOnTheHomePage()
})

Then ('the log in button is visible', () => {
  homePage.signInButton().should('be.visible')
})

Then ('the header link says welcome', () => {
  homePage.headerLinks().contains('Welcome')
})