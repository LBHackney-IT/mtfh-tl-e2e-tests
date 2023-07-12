import { And, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { saveNonDynamoFixture } from "../../../api/helpers";
import { generateTenure } from "../../../api/models/requests/addTenureModel";
import { cautionaryAlert } from "../../../api/models/requests/cautionaryAlertModel";
import { asset } from "../../../api/models/requests/createAssetModel";
import { person } from "../../../api/models/requests/createPersonModel";
import CautionaryAlertViewPageObject from "../../pageObjects/CautionaryAlertViewPage";
import PersonPageObjects from "../../pageObjects/personPage";
import { addTestRecordToDatabase, tenureToAssetTenure, tenureToPersonTenure } from "../common/common";
import createCautionaryAlert from "../../../api/cautionary-alert";
import DynamoDb from "../common/DynamoDb";

const personPO = new PersonPageObjects();
const cautionaryAlertViewPO = new CautionaryAlertViewPageObject();

When("I'm on the Cautionary Alert View page", () => {
  cy.getCautionaryAlertFixture().then((cautionaryAlerts) => {
    const cautionaryAlertId = cautionaryAlerts[0].alertId;
    cautionaryAlertViewPO.visit(cautionaryAlertId);
  });
});

When("I'm on the person's with cautionary alert page", () => {
  cy.intercept('GET', `*/api/v2/notes?pageSize=5&targetId=*`, { fixture: "asset-notes.json", statusCode: 200 }).as('getNotes')
  // NOT NEEDED cy.intercept('GET', `*/api/v1/cautionary-alerts/persons/*`, { fixture: "CautionaryAlerts.json", statusCode: 200 }).as('getCautionaryAlertsForPerson')

  cy.getPersonFixture().then((person) => {
    const personId = person.id;
    personPO.visit(personId);
  });
});

And("I navigate to that person's cautionary alert's page", () => {
  const cautionaryAlertLink = personPO.nthCautionaryAlert(0);
  cautionaryAlertLink.should('exist');
  cautionaryAlertLink.click();
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
    cautionaryAlertViewPO.cautionOnSystemValue().should('contain', cautionaryAlert.cautionOnSystem);
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

And("I click on the 'cancel' button", () => {
  cautionaryAlertViewPO.cancelButton().click();
});

And("The 'cancel' button becomes visible", () => {
  cautionaryAlertViewPO.cancelButton().should('exist');
});

And("The 'cancel' button should become hidden", () => {
  cautionaryAlertViewPO.cancelButton().should('not.exist');
});

And("I click on the 'end alert' button", () => {
  cautionaryAlertViewPO.endAlertButton().click();
});

Then("The 'end date' input should become visible", () => {
  cautionaryAlertViewPO.endDateInput().should('exist');
});

Then("The 'end date' input should become hidden", () => {
  cautionaryAlertViewPO.endDateInput().should('not.exist');
});

And("The 'end alert' button gets replaced with 'confirm' button", () => {
  cautionaryAlertViewPO.endAlertButton().should('not.exist');
  cautionaryAlertViewPO.confirmButton().should('exist');
});

And("The 'confirm' button gets replaced with 'end alert' button", () => {
  cautionaryAlertViewPO.endAlertButton().should('exist');
  cautionaryAlertViewPO.confirmButton().should('not.exist');
});

And("I fill in a valid 'end date' for the alert", () => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear().toString();

  // On the UI it's DD-MM-YYYY, however, cypress demands the opposite for it to work as expected.
  const typedDate = `${year}-${month}-${day}`;
  cautionaryAlertViewPO.endDateInput().click().type(typedDate);
});

And("I click the 'confirm' button", () => {
  cautionaryAlertViewPO.confirmButton().click();
});

And("The cautionary alert should not be listed under the person anymore", () => {
  cy.reload() // Prevents the tests from being flaky. Reloading the page will always give us up to date information.
  personPO.pageTitle().should('exist');
  personPO.nthCautionaryAlert(0).should('not.exist');
});

And("I fill in an 'end date' for the alert that is not allowed", () => {
  const today = new Date();
  const day = (today.getDate() + 1).toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear().toString();
  cautionaryAlertViewPO.endDateInput().focus().click().type(`${year}-${month}-${day}`);
});

Then("The 'end date' input error message gets displayed on the screen", () => {
  cautionaryAlertViewPO.endDateInputError().should('exist');
});

Then("The 'end date' input error message is NOT displayed on the screen", () => {
  cautionaryAlertViewPO.endDateInputError().should('not.exist');
});

And("The 'confirm' button gets locked out", () => {
  cautionaryAlertViewPO.confirmButton().should('be.disabled');
});

And("The 'confirm' button gets unlocked", () => {
  cautionaryAlertViewPO.confirmButton().should('not.be.disabled');
});

And("Given an impending 'End Alert' endpoint failure", () => {
  cy.getCautionaryAlertFixture().then((cautionaryAlerts) => {
    const cautionaryAlertId = cautionaryAlerts[0].alertId;
    cy.setUpEndAlertError(cautionaryAlertId);
  });
});

Then("The page error is displayed notifying the user about request failure", () => {
  cautionaryAlertViewPO.pageError().should('exist');
});

And("User should stay on the manage cautionary alert page", () => {
  cy.getCautionaryAlertFixture().then((cautionaryAlerts) => {
    const cautionaryAlertId = cautionaryAlerts[0].alertId;
    cy.url().should('include', `/cautionary-alerts/alert/${cautionaryAlertId}`);
  });
});

// Database seed methods

Given("There's a resident with a cautionary alert", () => {
  cy.log("Creating cautionary alert & entities associated with it")
    .then(() => {
      const assetModel = asset();
      const tenureModel = generateTenure({}, assetModel);
      const personModel = person();
      const personTenure = tenureToPersonTenure(tenureModel);

      personModel.tenures.push(personTenure);
      assetModel.tenure = tenureToAssetTenure(tenureModel);

      const saveNonDynamoRecord = (response) => new Promise((resolve, reject) => {
        console.log("saveNonDynamoRecord data: ", response)
        try {
          saveNonDynamoFixture(
            "CautionaryAlerts",
            [response.body],
            response,
          ).then((response) => {
            resolve(response)
          });
        }
        catch (ex) {
          reject(ex);
        }
      });

      const cautionaryAlertRecord = cautionaryAlert(personModel, assetModel);

      createCautionaryAlert(cautionaryAlertRecord).then((data) => {
        saveNonDynamoRecord(data).then((moreData) => {
          Promise.resolve(moreData);
        });
      });

      addTestRecordToDatabase("Assets", assetModel)
      addTestRecordToDatabase("TenureInformation", tenureModel)
      addTestRecordToDatabase("Persons", personModel)
    })
})