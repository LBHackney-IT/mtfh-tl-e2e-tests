
import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"

Given("I navigate to Google Home Page", () => {
    cy.visit("https://www.google.com/");
    cy.get('#L2AGLb').click();
})
When("I enter text 'Cypress' in the search box and click on button",()=>{
    const text = cy.get('[name="q"]');
    text.type('cypress commands').type('{enter}');
})
Then("I am on the relevant page", ()=>{
    cy.get('#logo > img').should('be.visible');
})