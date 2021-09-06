import { When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PropertyPageObjects from '../../pageObjects/propertyPage';

const propertyPage = new PropertyPageObjects()

When('I view a property {string}', (propertyId) => {
    propertyPage.visit(propertyId)
})

Then('the property information is displayed', () => {
    propertyPage.propertyViewSidebar().should('be.visible')
    propertyPage.propertyViewSidebar().contains('Type')
    propertyPage.propertyViewSidebar().contains('UPRN')
    propertyPage.propertyViewSidebar().contains('Reference')
})

And('I click on the view tenure button', () => {
    propertyPage.viewTenureButton().click()
    cy.url().should('include', 'tenure')
})