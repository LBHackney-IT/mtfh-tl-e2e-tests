import { And, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import EditPersonContactDetailsPageObjects from "../../pageObjects/editPersonContactDetailsPage";
import PersonContactPageObjects from "../../pageObjects/personContactPage";

const editPersonContactDetailsPage = new EditPersonContactDetailsPageObjects();
const personContactPage = new PersonContactPageObjects();

When("I edit a person's contact details", () => {
  cy.getPersonFixture().then((person) => {
    editPersonContactDetailsPage.editPersonContactDetails(person.id);
  });
});

And("I click the save changes button", () => {
  personContactPage.clickSaveChangesButton();
});

And("I populate the phone number form with {string}", (phoneNumber) => {
  personContactPage.phoneNumberContactTypeMainNumber();
  personContactPage.phoneNumberFields().last().type(phoneNumber);
});

And("I add a non-uk phone number", () => {
  cy.contains("Add a phone number").click();

  personContactPage.phoneNumberContactTypeMainNumber();
  personContactPage.toggleIsNonUkNumber();
  personContactPage.phoneNumberFields().last().type(`+227777777777`);

  cy.contains("Save changes").click();
});

Then("I see a success message", () => {
  cy.contains("Phone numbers updated");
});

Then("I reload the page", () => {
  cy.reload();
});

And("I expect to see NonUkNumber {boolean}", (enabled) => {
  cy.get("input[data-test='phone-number-checkbox']")
    .last()
    .should(enabled ? "be.checked" : "not.be.checked");
});

And("I check Non-UK Number checkbox with {boolean}", (enabled) => {

  if (enabled) {
    cy.get("input[data-test='phone-number-checkbox']")
    .last()
    .check()
  } else {
    cy.get("input[data-test='phone-number-checkbox']")
    .last()
    .uncheck()
  }
});

Then("I click the remove button", () => {
  cy.contains("Remove").click();
});

Then("I expect to see a confirmation modal", () => {
  cy.contains("Are you sure you want to remove this phone number?");
});

Then("I expect to not see a confirmation modal", () => {
  cy.contains("Are you sure you want to remove this phone number?").should(
    "not.exist"
  );
});

Then("I click the remove phone number button", () => {
  cy.contains("Remove phone number").click();
});

Then("I see a phone number removed confirmation message", () => {
  cy.contains("Phone number removed");
});

Then("the phone number is removed", () => {
  cy.contains("07777777777").should("not.exist");
  cy.contains("Main number").should("not.exist");
});

Then("I see the success button is disabled", () => {
  cy.contains("Save changes").should("be.disabled");
});

Then("I see validation errors for empty fields", () => {
  cy.contains("You must select an option to proceed");
  cy.contains("You must enter a phone number to proceed");
});

Then("I cannot add any more contacts for {string}", (contactType) => {
  if (contactType === "email") {
    personContactPage
      .mainContent()
      .contains("You cannot add more than 5 email addresses");
    personContactPage.addEmailAddressButton().should("be.disabled");
  }

  if (contactType === "phone") {
    personContactPage
      .mainContent()
      .contains("You cannot add more than 5 phone numbers");
    personContactPage.addPhoneNumberButton().should("be.disabled");
  }
});

And("I add up to 5 contact details of type {string}", (contactType) => {
  for (let i = 0; i < 5; i++) {
    cy.wait(500);

    cy.get("body").then(($body) => {
      if (contactType === "email") {
        if (
          $body.text().includes("You cannot add more than 5 email addresses")
        ) {
          return;
        }
        personContactPage.addEmailAddress(
          "test@test.com",
          "test email description"
        );
      }

      if (contactType === "phone") {
        if ($body.text().includes("You cannot add more than 5 phone numbers")) {
          return;
        }
        personContactPage.addPhoneNumber(
          "01234567890",
          "test phone description"
        );
      }
    });
  }
});

And("I click add a correspondence address", () => {
  personContactPage.addCorrespondenceAddressButton().click();
});

Then("the correspondence address fields are displayed", () => {
  personContactPage.addressLineOneField().should("be.visible");
  personContactPage.addressLineTwoField().should("be.visible");
  personContactPage.addressLineThreeField().should("be.visible");
  personContactPage.addressLineFourField().should("be.visible");
  personContactPage.postcodeLookupButton().should("be.visible");
  personContactPage.postcodeLookupField().should("be.visible");
  personContactPage.postcodeField().should("be.visible");
});

When("I enter a postcode into the lookup field {string}", (postCode) => {
  personContactPage.postcodeLookupField().type(postCode);
});

And("I click look up", () => {
  personContactPage.postcodeLookupButton().click();
});

Then("an invalid postcode error is thrown", () => {
  personContactPage.postcodeLookupErrorContainer().should("be.visible");
  personContactPage
    .postcodeLookupErrorContainer()
    .contains("Please enter a valid postcode");
});

When("I enter {string} into address line 1", (address) => {
  personContactPage.addressLineOneField().type(address);
});

When("I enter {string} into address line 2", (address) => {
  personContactPage.addressLineTwoField().type(address);
});

When("I enter {string} into address line 3", (address) => {
  personContactPage.addressLineThreeField().type(address);
});

When("I enter {string} into address line 4", (address) => {
  personContactPage.addressLineFourField().type(address);
});

When("I enter {string} into the postcode field", (postCode) => {
  personContactPage.postcodeField().type(postCode);
});

And("I click save correspondence address", () => {
  personContactPage.saveAddressButton().click();
});

Then("the correspondence address is saved", () => {
  personContactPage.confirmationMessage().should("be.visible");
  personContactPage
    .confirmationMessage()
    .contains("Correspondence address saved");
});
