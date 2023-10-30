import { And, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import EditPersonContactDetailsPageObjects from '../../pageObjects/editPersonContactDetailsPage'
import EditPersonPageObjects from '../../pageObjects/editPersonPage'
import PersonContactPageObjects from '../../pageObjects/personContactPage'

const envConfig = require('../../../environment-config')
const editPersonContactDetailsPage = new EditPersonContactDetailsPageObjects()
const editPersonPage = new EditPersonPageObjects()
const personContactPage = new PersonContactPageObjects()
const contactDetails = require('../../../api/contact-details')
const editEqualityDetails = require('../../../api/equality-information')
const getEqualityDetails = require('../../../api/equality-information')

When("I edit a person's contact details", () => {
  cy.getPersonFixture().then((person) => {
    editPersonContactDetailsPage.editPersonContactDetails(person.id)
  })
})

Then('I cannot add any more contacts for {string}', (contactType) => {
  if (contactType === 'email') {
    personContactPage
      .mainContent()
      .contains('You cannot add more than 5 email addresses')
    personContactPage.addEmailAddressButton().should('be.disabled')
  }

  if (contactType === 'phone') {
    personContactPage
      .mainContent()
      .contains('You cannot add more than 5 phone numbers')
    personContactPage.addPhoneNumberButton().should('be.disabled')
  }
})

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

And('I click add a correspondence address', () => {
  personContactPage.addCorrespondenceAddressButton().click()
})

Then('the correspondence address fields are displayed', () => {
  personContactPage.addressLineOneField().should('be.visible')
  personContactPage.addressLineTwoField().should('be.visible')
  personContactPage.addressLineThreeField().should('be.visible')
  personContactPage.addressLineFourField().should('be.visible')
  personContactPage.postcodeLookupButton().should('be.visible')
  personContactPage.postcodeLookupField().should('be.visible')
  personContactPage.postcodeField().should('be.visible')
})

When('I enter a postcode into the lookup field {string}', (postCode) => {
  personContactPage.postcodeLookupField().type(postCode)
})

And('I click look up', () => {
  personContactPage.postcodeLookupButton().click()
})

Then('an invalid postcode error is thrown', () => {
  personContactPage.postcodeLookupErrorContainer().should('be.visible')
  personContactPage
    .postcodeLookupErrorContainer()
    .contains('Please enter a valid postcode')
})

When('I enter {string} into address line 1', (address) => {
  personContactPage.addressLineOneField().type(address)
})

When('I enter {string} into address line 2', (address) => {
  personContactPage.addressLineTwoField().type(address)
})

When('I enter {string} into address line 3', (address) => {
  personContactPage.addressLineThreeField().type(address)
})

When('I enter {string} into address line 4', (address) => {
  personContactPage.addressLineFourField().type(address)
})

When('I enter {string} into the postcode field', (postCode) => {
  personContactPage.postcodeField().type(postCode)
})

And('I click save correspondence address', () => {
  personContactPage.saveAddressButton().click()
})

Then('the correspondence address is saved', () => {
  personContactPage.confirmationMessage().should('be.visible')
  personContactPage
    .confirmationMessage()
    .contains('Correspondence address saved')
})

