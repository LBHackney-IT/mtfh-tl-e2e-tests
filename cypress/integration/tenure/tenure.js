import { When, Then } from "cypress-cucumber-preprocessor/steps";
import TenurePageObjects from '../../pageObjects/tenurePage';

const tenurePage = new TenurePageObjects

When('I view a Tenure {string}', (record) => {
    tenurePage.visit(record)
})

Then('the tenure information is displayed', () => {
    tenurePage.tenureDetailsAreDisplayed()
})

And('the residents information is displayed', () => {
    tenurePage.residentsDetailsAreDisplayed()
})