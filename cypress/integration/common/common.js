import { Then, And } from "cypress-cucumber-preprocessor/steps";
import FooterPageObjects from '../../pageObjects/sharedComponents/footer';
import HeaderPageObjects from '../../pageObjects/sharedComponents/header';

const footer = new FooterPageObjects
const header = new HeaderPageObjects


Then('the page header is visible', () => {
    header.headerIsDisplayed()
})

And('the page footer is visible', () => {
    footer.footerIsDisplayed()
})