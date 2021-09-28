import { When, Then, And } from "cypress-cucumber-preprocessor/steps";
import PropertyPageObjects from "../../pageObjects/propertyPage";

const propertyPage = new PropertyPageObjects();

And("I click on the view tenure button", () => {
  propertyPage.viewTenureButton().click();
  cy.url().should("include", "tenure");
});

