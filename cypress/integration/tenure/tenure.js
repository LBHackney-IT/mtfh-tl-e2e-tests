import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import TenurePageObjects from '../../pageObjects/tenurePage';

const tenurePage = new TenurePageObjects


Given('the start date for the selected tenure record is before 31 December 2013', () => {
    //update this
    console.log('update this')
})

When('I view a Tenure {string}', (record) => {
    tenurePage.visit(record)
})

And('there are no household members', () => {
    tenurePage.tenureResidentsContainer().contains('This tenure has no household members')
})

When('I select a household member', () => {
    tenurePage.householdMemberLink().should('have.attr', 'href').and('include', '/person')
    tenurePage.householdMemberLink().eq(0).click()
})

Then('the household member details are displayed', () => {
    cy.url().should('include', '/person')
})


And('I select a resident', () => {
    tenurePage.viewResidentButton().should('have.attr', 'href').and('include', '/person')
    tenurePage.viewResidentButton().eq(0).click()
})

Then('the resident details are displayed', () => {
    cy.url().should('include', '/person')
})

Then ('Then the Scanned historic tenure records button is displayed',() => {
    tenurePage.scannedHistoricTenureRecords().should(vis)
})

And('I click the tenure details accordion', () => {
    tenurePage.tenureDetailsAccordion().click()
})

When('I click the resident details accordion', () => {
    tenurePage.residentDetailsAccordion().click()
})

And('there are no named tenure holders', () => {
    tenurePage.tenureResidentsContainer().contains('This tenure has no named tenure holders')
})

Then('the residents details accordion information is displayed', () => {
    tenurePage.residentDetailsAccordionInformation()
})

Then('the tenure details accordion information is displayed', () => {
    tenurePage.tenureDetailsAccordionInformation()
})

Then('the Scanned historic tenure records button is displayed', () => {
    tenurePage.scannedHistoricTenureRecords()
})