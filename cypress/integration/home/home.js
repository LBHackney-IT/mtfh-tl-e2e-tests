import { Given } from "cypress-cucumber-preprocessor/steps";
import HeaderPageObjects from '../../pageObjects/sharedComponents/header';
import HomePageObjects from '../../pageObjects/homePage';
import FooterPageObjects from '../../pageObjects/sharedComponents/footer';

const header = new HeaderPageObjects
const homePage = new HomePageObjects
const footer = new FooterPageObjects

Given('I am on the Home page', () => {
    homePage.visit();
    homePage.iAmOnTheHomePage();
})

Then('the page header is visible', () => {
    header.headerIsDisplayed()
})

And('the page footer is visible', () => {
    footer.footerIsDisplayed()
})