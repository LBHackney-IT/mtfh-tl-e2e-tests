import { Given, And, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CautionaryAlertViewPageObject from "../../pageObjects/CautionaryAlertViewPage";
import PersonPageObjects from "../../pageObjects/personPage";

const personPO = new PersonPageObjects();
const cautionaryAlertViewPO = new CautionaryAlertViewPageObject();

When("I'm on the Cautionary Alert View page", () => {
  cy.getCautionaryAlertFixture().then((cautionaryAlerts) => {
    const cautionaryAlertId = cautionaryAlerts[0].alertId;
    cautionaryAlertViewPO.visit(cautionaryAlertId);
  });
});

Then("The page title should reflect the page's purpose & contain person's name", () => {
  cy.getPersonFixture().then((expectedPerson) => {
    const personFirstName = expectedPerson.firstName;
    const personLastName = expectedPerson.surname;

    cautionaryAlertViewPO
      .pageTitle()
      .should('contain', 'Cautionary Alert for')
      .and('contain', personFirstName)
      .and('contain', personLastName);
  });
});

And("The cautionary alert table should show the correct information", () => {
  cy.getCautionaryAlertFixture().then((cautionaryAlerts) => {
    const cautionaryAlert = cautionaryAlerts[0];

    cautionaryAlertViewPO.dateOfIncidentValue().should('contain', cautionaryAlert.dateOfIncident);
    cautionaryAlertViewPO.alertCodeValue().should('contain', cautionaryAlert.code);
    cautionaryAlertViewPO.cautionOnSystemValue().should('contain', cautionaryAlert.cautionOnSystem)  ;  
    cautionaryAlertViewPO.personNameValue().should('contain', cautionaryAlert.name);
    cautionaryAlertViewPO.reasonValue().should('contain', cautionaryAlert.reason);
    cautionaryAlertViewPO.assureReferenceValue().should('contain', cautionaryAlert.assureReference);
  });
});

And("I click on the 'back' button", () => {
  cautionaryAlertViewPO.backLink().click();
});

Then("I get redirected to back to the person page", () => {
  cy.getPersonFixture().then((person) => {
    const personId = person.id;
    cy.url().should('include', `/person/${personId}`) // => true
  });
});

And("I should see the cautionary alert I navigated from", () => {
  cy.getCautionaryAlertFixture().then((cautionaryAlerts) => {
    const cautionaryAlert = cautionaryAlerts[0];
    personPO.nthCautionaryAlert(0).should('contain', cautionaryAlert.cautionOnSystem);
  }); 
});

And("I click on the 'close' button", () => {
  cautionaryAlertViewPO.closeButton().click();
});

And("I click on the 'end alert' button", () => {
  cautionaryAlertViewPO.endAlertButton().click();
});

Then("The 'end date' input should become visible", () => {
  cautionaryAlertViewPO.endDateInput().should('exist');
});

And("The 'end alert' button gets replaced with 'confirm' button", () => {
  cautionaryAlertViewPO.endAlertButton().should('not.exist');
  cautionaryAlertViewPO.confirmButton().should('exist');
});

And("I select the 'end date' for the alert", () => {
  const today = new Date();
  const day = today.getDay().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear().toString();
  cautionaryAlertViewPO.endDateInput().click().type(`${year}-${month}-${day}`);
});

And("I click the 'confirm' button", () => {
  cautionaryAlertViewPO.confirmButton().click();
});

And("The cautionary alert should not be listed under the person anymore", () => {
  // ensure page is loaded before the cautionary alert assertion
  personPO.pageTitle().should('exist');
  personPO.nthCautionaryAlert(0).should('not.exist');
});
