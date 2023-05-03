import { Given, And, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CautionaryAlertViewPageObject from "../../pageObjects/CautionaryAlertViewPage";

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

