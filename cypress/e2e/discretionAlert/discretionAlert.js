import {Given, When, Then, And} from "@badeball/cypress-cucumber-preprocessor"
import PersonPageObjects from "../../pageObjects/personPage";
import PropertyPageObjects from "../../pageObjects/propertyPage";
import TenurePageObjects from "../../pageObjects/tenurePage";
const personPage = new PersonPageObjects();
const propertyPage = new PropertyPageObjects();
const tenurePage = new TenurePageObjects();


Given('A person {string} has a discretion alert assigned to them', (person) => {
    personPage.visit(person);
});
When('I view the persons profile page',
    () => {
       const input = cy.get('.lbh-heading-h1');
       input.should('be.visible').and(($input) => {
            expect($input).to.have.value('');
        })
    });
Then('I will be able to view a RED bell next to "Discretion alert"', () => {
   personPage.discretionAlertPerson().should('exist');
});

When('I click on the accordion element', () => {
    personPage.discretionAlertPerson().click();
});

Then('discretion type {string} and the description {string} are displayed', (type,description) => {
    cy.findAllByText(type).should('exist');
    cy.findAllByText(description).should('exist');
});
Given('A property {string} has a person with a discretion alert assigned to them', (property) => {
    propertyPage.visit(property);
});
When('I view a property profile page', () => {
    cy.findAllByText("Gge 23 Morris Blitz Court Foulden Road Hackney London N16 7UJ").should('exist');
});

Given('A tenure {string} has a person {string} with a discretion alert assigned to them', (tenure, person) => {
    tenurePage.visit(tenure);
});
When('I view a tenure profile page', () => {
    cy.findAllByText('Tenure payment reference: 8845021610');
});
Then('I will be able to see the RED caution bell next to the property name', () => {
    tenurePage.tenureAlert().should('be.visible');
});
And('I will be able to see the RED discretion alert next to the person name', () => {
    personPage.personAlert().should('be.visible');
});