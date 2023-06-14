import {
  Then,
  And,
  Given,
  defineParameterType,
  When,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import AddPersonPageObjects from "../../pageObjects/addPersonPage";
import FooterPageObjects from "../../pageObjects/sharedComponents/footer";
import HeaderPageObjects from "../../pageObjects/sharedComponents/header";
import ModalPageObjects from "../../pageObjects/sharedComponents/modal";
import NavigationPageObjects from "../../pageObjects/sharedComponents/navigation"
import PersonContactPageObjects from "../../pageObjects/personContactPage";
import PersonPageObjects from "../../pageObjects/personPage";
import PropertyPageObjects from "../../pageObjects/propertyPage"
import SearchPageObjects from "../../pageObjects/searchPage";
import TenurePageObjects from "../../pageObjects/tenurePage";
import ActivityHistoryPageObjects from "../../pageObjects/activityHistoryPersonPage";
import ChangeOfNamePageObjects from "../../pageObjects/changeOfNamePage";


import comment from "../../../api/comment";
import contactDetails from "../../../api/contact-details";
import { getTenure, editTenure } from "../../../api/tenure";
import createCautionaryAlert from "../../../api/cautionary-alert";
import referenceData from "../../../api/reference-data";
import date from "date-and-time";
import dynamoDb from "../../../cypress/e2e/common/DynamoDb";


import { hasToggle } from "../../helpers/hasToggle";
import { guid } from "../../helpers/commentText";
import property from "../../../api/property";
import { searchPersonResults } from "../../support/searchPersonResults";
import { searchPropertyResults } from "../../support/searchPropertyResults";
import DynamoDb from "./DynamoDb";

import { patch } from "../../../api/models/requests/patchModel"
import { asset } from "../../../api/models/requests/createAssetModel"
import { person } from "../../../api/models/requests/createPersonModel"
import { tenure } from "../../../api/models/requests/addTenureModel";
import { cautionaryAlert } from "../../../api/models/requests/cautionaryAlertModel";
import { saveNonDynamoFixture } from "../../../api/helpers"

const envConfig = require("../../../environment-config");
const activityHistory = new ActivityHistoryPageObjects();
const addPersonPage = new AddPersonPageObjects();
const footer = new FooterPageObjects();
const header = new HeaderPageObjects();
const modal = new ModalPageObjects();
const navigation = new NavigationPageObjects();
const personContactPage = new PersonContactPageObjects();
const personPage = new PersonPageObjects();
const propertyPage = new PropertyPageObjects();
const searchPage = new SearchPageObjects();
const tenurePage = new TenurePageObjects();
const changeOfNamePage = new ChangeOfNamePageObjects();
const changeOfName = new ChangeOfNamePageObjects();
const emailAdd = 'AutomationTest@test.com';
const phoneNumber = '07788123456';

let dateCaptureDay;
let dateCaptureTime;
let personId = "";
let propertyId = "";

const endpoint = Cypress.env('PERSON_ENDPOINT')

const tenureToPersonTenure = (tenure) => ({
  id: tenure.id,
  startDate: tenure.startOfTenureDate,
  endDate: tenure.endOfTenureDate,
  assetFullAddress: tenure.tenuredAsset.fullAddress,
  assetId: tenure.tenuredAsset.id,
  uprn: tenure.tenuredAsset.uprn,
  isActive: false,
  type: tenure.tenureType.description,
  propertyReference: tenure.tenuredAsset.propertyReference,
});

const tenureToAssetTenure = (tenure) => ({
  endOfTenureDate: tenure.endOfTenureDate,
  id: tenure.id,
  paymentReference: tenure.paymentReference,
  startOfTenureDate: tenure.startOfTenureDate,
  type: tenure.tenureType.description,
});

defineParameterType({
  name: "boolean",
  regexp: /true|false/,
  transformer: (s) => (s === "true" ? true : false),
});

Given("The feature {string} is {boolean}", function (feature, on) {
  if (hasToggle(feature) !== on) {
    return this.skip();
  }
});

// API
Given(
  "I want to check the reference data API with a category of {string} {string}",
  async (category, subCategory) => {
    cy.log("Retrieving reference data");
    const response = await referenceData.viewReferenceData(
      category,
      subCategory
    );
    cy.log(`Status code ${response.status} returned`);
    assert.deepEqual(response.status, 200);
  }
);

Given("I edit a tenure {string} {string}", (tenureId, tenureType) => {
  getTenure(tenureId).then(response => {
    cy.log(`Status code ${response.status} returned`)
    assert.deepEqual(response.status, 200)
    cy.log('etag captured!')

    cy.log('Updating tenure...')
    editTenure(tenureId, tenureType, response.headers.etag).then(response => {
      cy.log(`Status code ${response.status} returned`)
      assert.deepEqual(response.status, 204)
      cy.log('Tenure updated!')
    })
  })
})

Given("I create a new person", () => {
  cy.log("Creating Person record");
  person.createPerson().then(response => {
    cy.log(`Status code ${response.status} returned`);
    cy.log(`Person record ${response.body.id} created!`);
    assert.deepEqual(response.status, 201);
    personId = response.body.id;
  });
});


Given("I create a new {string} tenure", (tenureTypeCode) => {
  cy.log("Creating new tenure record").then(() => {
    return tenure.createTenure(tenureTypeCode).then((response) => {
      cy.log(`Tenure created!`);
    })
  })
});

Given("I create a person with new tenure", () => {
  cy.log("Creating Person record");
  cy.getTenureFixture().then(({ id: tenureId }) => {
    cy.log('Tenure Id inside person request', tenureId)
    person.createPersonWithNewTenure(tenureId).then(response => {
      cy.log(`Status code ${response.status} returned`);
      cy.log(`Person record ${response.body.id} created!`);
      assert.deepEqual(response.status, 201);
      personId = response.body.id
    });
  })

});

Given("I create person and add to a tenure {string}", (isResponsible) => {
  cy.getTenureFixture().then(({ id: tenureId }) => {
    cy.log('Getting etag from the tenure...')
    tenure.getTenure(tenureId).then(response => {
      cy.log(`Tenure received`)
      assert.deepEqual(response.status, 200)

      cy.log("Creating Person record");
      cy.log('Tenure Id inside person request', tenureId)
      tenure.addPersonToTenure(tenureId, isResponsible === "true", response.headers.etag).then(response => {
        cy.log(`Status code ${response.status} returned`);
        assert.deepEqual(response.status, 204);
        cy.log(`Person added!`);
      });
    })
  })
});

Then("I want to view a person", async () => {
  cy.log(`Checking Person record ${personId}`);
  const response = await person.viewPerson(personId);
  cy.log(`Status code ${response.status} returned`);
  cy.log(`Person record ${personId} read!`);
  cy.log(`${personId}`)
  cy.log(endpoint)
  assert.deepEqual(response.status, 200);
});

And("I want to edit a person", async () => {
  cy.log(`Updating Person record ${personId}`);
  const response = await person.editPerson(personId);
  cy.log(`Status code ${response.status} returned`);
  cy.log(`Person record ${personId} updated!`);
  assert.deepEqual(response.status, 204);
});

And("I want to add contact details {string}", async (type) => {
  cy.log(`Creating contact details for record ${personId}`)
  const response = await contactDetails.addContactDetails(type, personId);
  cy.log(`Status code ${response.status} returned`);
  cy.log(`Contact details for record ${response.data.id} created!`);
  assert.deepEqual(response.status, 201);
});

And("I want to add a comment", async () => {
  // TODO: Pass in the personId to the request JSON object
  // cy.log(`Creating comment for record ${personId}`)
  const response = await comment.addComment(personId);
  cy.log(`Status code ${response.status} returned`);
  cy.log(`Comment for record ${response.data.id} created!`);
  assert.deepEqual(response.status, 201);
});

// Generic
Given("I am logged in", () => {
  cy.login();
  window.localStorage.setItem(
    "features",
    JSON.stringify(Cypress.config("featureToggles"))
  );
});

Given("I am logged out", () => {
  cy.logout();
});

Then("the page breadcrumb is displayed", () => {
  const breadCrumb = cy.get('[class*="govuk-back-link lbh-back-link"]');
  breadCrumb.should("be.visible");
});

And('I click on the breadcrumb', () => {
  navigation.backButton().click()
})

Then('I am taken to the search page', () => {
  // cy.url().should('contain', "search")
  cy.findAllByText("Search Results");
})

And('I click on the view property button', () => {
  //navigation.viewPropertyButton().click();
  // cy.get(':nth-child(10) > [data-layer="Content"]').click();
  cy.get(".lbh-heading-h2 > .govuk-link").click();
});

And("I click on the view property button for a person", () => {
  // cy.get(".mtfh-layout__aside").then($body => {
  //   if ($body.find('#accordion-heading-additional-tenure-details').length > 0) {
  //     cy.get('#accordion-heading-additional-tenure-details').click();
  //     navigation.viewPropertyButton().click();
  //   } else {
  //     navigation.viewPropertyButton().click();
  //   }
  // });
  cy.get(':nth-child(1) > .govuk-link').click();
});

// Page Header shared steps
Then("the page header is visible", () => {
  header.headerIsDisplayed();
});

// Page Footer shared steps
And("the page footer is visible", () => {
  footer.footerIsDisplayed();
});

Then("the page footer links are visible", () => {
  footer.footerLinksAreDisplayed();
});

And("the page footer links are correct", () => {
  footer.footerLinksAreCorrect();
});

When("I am using a mobile viewport {string}", (device) => {
  cy.viewport(`${device}`);
});

// Search page shared steps
Given("I am on the search page", () => {
  searchPage.visit();
});

When("I enter any of the following criteria {string}", (searchTerm) => {
  if (searchTerm === "guid") {
    searchTerm = guid;
  }
  searchPage.searchContainer().clear().type(searchTerm);
});

When("I click on the radio button for {string}", (searchType) => {
  if (searchType === "Person") {
    searchPage.personRadioButton().click();
  }
  if (searchType === "Tenure") {
    searchPage.tenureRadioButton().click();
  }
  if (searchPage === "Property") {
    searchPage.propertyRadionButton().click()
  }
});

And("I click on the search button", () => {
  searchPage.searchButton().click();
});

Then(
  "the search results are displayed by best match {string}",
  (searchTerm) => {
    if (searchTerm === "guid") {
      searchTerm = guid;
    }
    searchPage
      .searchResults()
      .contains(searchTerm.replace(/\*/g, ""), { matchCase: false });
  }
);
Then(
  "search results are displayed by the best match {string}",
  (searchTerm) => {
    if (searchTerm === "guid") {
      searchTerm = guid;
    }
    searchPage
      .searchResults()
      .contains(searchTerm.replace(/\s/g, ""), { matchCase: false });
  }
);

Then("the default sort option is correct", () => {
  searchPage.sortByOption().contains("Best match");
});

When("I select to sort by {string}", (filter) => {
  searchPage.sortByOption().select(filter);
});

When("I set the number of results to {int}", (results) => {
  searchPage.numberOfResultsDisplayed(results);
});

Then("the correct number of {int} are displayed", (results) => {
  searchPage.paginationSummary().contains(results);
  searchPage.filterStatus().contains(results);
});

// Accessibility
And("have no detectable a11y violations", () => {
  cy.checkA11y(null, null, axeTerminalLog, { skipFailures: true });

  function axeTerminalLog(violations) {
    cy.task(
      "log",
      `${violations.length} accessibility violation${violations.length === 1 ? "" : "s"
      } ${violations.length === 1 ? "was" : "were"} detected`
    );

    const violationData = violations.map(
      ({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
      })
    );
    cy.task("table", violationData);
  }
});

// Person-contact
And("I click the done button", () => {
  const now = new Date();
  personContactPage.doneButton().click();
  dateCaptureDay = date.format(now, "DD/MM/YY");
  dateCaptureTime = date.format(now, "HH:mm");
});

And("I click the add email address button", () => {
  personContactPage.addEmailAddressButton().click();
});

And("I enter an email address {string}", (emailAddress) => {
  personContactPage.emailAddressField().type(emailAddress);
});

And("I enter an email description {string}", (emailDescription) => {
  personContactPage.emailAddressDescription().type(emailDescription);
});

And("I click save email address", () => {
  personContactPage.saveEmailAddressButton().click();
});

And("I click the add phone number button", () => {
  personContactPage.addPhoneNumberButton().click();
});

And("I enter a phone number {string}", (phoneNumber) => {
  personContactPage.phoneNumberField().type(phoneNumber);
});

And("I select a phone number type {string}", (phoneType) => {
  switch (phoneType) {
    case "Mobile":
      personContactPage.phoneNumberMobileType().click();
      break;

    case "Work":
      personContactPage.phoneNumberWorkType().click();
      break;

    case "Home":
      personContactPage.phoneNumberHomeType().click();
      break;

    case "Other":
      personContactPage.phoneNumberOtherType().click();
      break;

    default:
      cy.log("Please select a valid phone number type");
      break;
  }
});

And("I enter a phone number description {string}", (phoneDescription) => {
  personContactPage.phoneNumberDescription().type(phoneDescription);
});

And("I click save phone number", () => {
  personContactPage.savePhoneNumberButton().click();
});

And(
  "the email information is captured {string} {string}",
  (email, emailDescription) => {
    personContactPage.pageWarning().should("not.exist");
    personContactPage.pageAnnouncementHeader().should("be.visible");
    personContactPage.mainContent().contains("Email address saved");
    personContactPage.fieldsetContent().contains(email);
    personContactPage.fieldsetContent().contains(emailDescription);
  }
);

And(
  "the phone information is captured {string} {string} {string}",
  (phoneNumber, phoneType, phoneDescription) => {
    personContactPage.pageWarning().should("not.exist");
    personContactPage.pageAnnouncementHeader().should("be.visible");
    personContactPage.mainContent().contains("Phone number saved");
    personContactPage.fieldsetContent().contains(phoneNumber);
    personContactPage.fieldsetContent().contains(phoneType);
    personContactPage.fieldsetContent().contains(phoneDescription);
  }
);

And("I click remove email address", () => {
  personContactPage.removeEmailAddressButton().click();
});

And("the remove email address modal is displayed", () => {
  modal.modalBody().should("be.visible");
});

And("the modal is not displayed", () => {
  modal.modalBody().should("not.exist");
});

And("I click remove phone number", () => {
  personContactPage.removePhoneNumberButton().click();
});

And("the remove phone number modal is displayed", () => {
  modal.modalBody().should("be.visible");
});

// Person page
And("I click edit person", () => {
  personPage.editPersonButton().click();
});

Given('I view a person {string}', (id) => {
  personPage.visit(id || personId)
})

And("I am on the person page for {string}", (person) => {
  cy.url().should("include", person);
});

And("I am on the tenure page for {string}", (tenure) => {
  cy.url().should("include", tenure);
});

Then('the personal details are displayed on the sidebar', () => {
  personPage.sidebar().contains('Date of birth')
  personPage.sidebar().contains('Phone 1')
  personPage.sidebar().contains('Email 1')
  personPage.sidebar().contains('Correspondence address 1')
})

// Create/edit person page
Given("I create a person for tenure", () => {
  cy.getTenureFixture().then((tenure) => {
    addPersonPage.visit(tenure.id);
  })
});

And("I select a preferred middle name {string}", (preferredMiddleName) => {
  if (preferredMiddleName === "guid") {
    preferredMiddleName = guid;
  }
  addPersonPage.preferredMiddleNameContainer().clear();
  addPersonPage.preferredMiddleNameContainer().type(preferredMiddleName);
});

And("I select a preferred last name {string}", (preferredLastName) => {
  if (preferredLastName === "guid") {
    preferredLastName = guid;
  }
  addPersonPage.preferredLastNameContainer().clear();
  addPersonPage.preferredLastNameContainer().type(preferredLastName);
});

And("I enter a reason for creation", () => {
  addPersonPage.reasonForCreationContainer().type("This is a test");
});

And("I click add person", () => {
  addPersonPage.addPersonButton().click();
});

When("I click update person button", () => {
  addPersonPage.updatePersonButton().click();
  const now = new Date();
  // personContactPage.doneButton().click();
  dateCaptureDay = date.format(now, "DD/MM/YY");
  dateCaptureTime = date.format(now, "H:mm");
});

And("I click cancel", () => {
  addPersonPage.cancelButton().click();
});

Given("I am on the edit person page for {string}", (person) => {
  cy.visit(`${envConfig.baseUrl}/person/${person}/edit`);
});

Then("the activity history is correct", () => {
  activityHistory.activityTableRow().eq(0).contains(guid);
  activityHistory.activityTableRow().eq(0).contains(dateCaptureDay);
  activityHistory.activityTableRow().eq(0).contains(dateCaptureTime);
});

Then('the add a new person tenure page is correct', () => {
  addPersonPage.addPersonPageIsDisplayed()
})

// Tenure page
When('I view a tenure {string}', (id) => {
  cy.getTenureFixture().then(({ id: tenureId }) => {
    tenurePage.visit(id || tenureId)
  })
})

Then('the tenure information is displayed', () => {
  tenurePage.tenureDetailsContainer().should("be.visible");
  tenurePage.tenureDetailsContainer().contains("Status");
  tenurePage.tenureDetailsContainer().contains("Start date");
  tenurePage.tenureDetailsContainer().contains("End date");
  tenurePage.tenureDetailsContainer().contains("Type");
})

Then('the message New tenure completed is displayed', () => {
  //tenurePage.newTenureCompleted().should('be.visible');
  cy.findAllByText('New tenure completed');
})

And('I click edit tenure', () => {
  tenurePage.editTenureButton().click()
})

And('the edit tenure button is not displayed', () => {
  tenurePage.editTenureButton().should('not.exist')
})

// Property page
Given("I create a new property", async () => {
  const record = { tableName: "Assets", key: { id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6" } }
  await dynamoDb.deleteRecordFromDynamoDB(record)
  cy.log("Creating Property record");
  const response = await property.createProperty();
  cy.log(`Status code ${response.status} returned`);
  assert.deepEqual(response.status, 201);
  cy.log(`Property record ${response.data.id} created`);
  propertyId = response.data.id;
})

Given("I create a new property {string}", async (type) => {
  const record = { tableName: "Assets", key: { id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6" } }
  await dynamoDb.deleteRecordFromDynamoDB(record)
  cy.log("Creating Property record");
  const response = await property.createProperty(type);
  cy.log(`Status code ${response.status} returned`);
  assert.deepEqual(response.status, 201);
  cy.log(`Property record ${response.data.id} created`);
  propertyId = response.data.id;
})

Given("I create a new property with tenure", async () => {
  const record = { tableName: "Assets", key: { id: "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6" } }
  await dynamoDb.deleteRecordFromDynamoDB(record)
  cy.log("Creating Property record");
  const response = await property.createPropertyWithTenure();
  cy.log(`Status code ${response.status} returned`);
  assert.deepEqual(response.status, 201);
  cy.log(`Property record ${response.data.id} created`);
  propertyId = response.data.id;
})
When("I view a property {string}", (id) => {
  cy.getAssetFixture().then(({ id: propertyId }) => {
    propertyPage.visit(id || propertyId);
  })
});

Then('the property information is displayed', () => {
  propertyPage.propertyViewSidebar().should('be.visible')
  propertyPage.propertyViewSidebar().contains('Type')
  propertyPage.propertyViewSidebar().contains('UPRN')
  propertyPage.propertyViewSidebar().contains('Reference')
})

Then('I am on the create new tenure page {string}', (id) => {
  cy.getAssetFixture().then(({ id: propertyId }) => {
    cy.url().should('contain', `tenure/${id || propertyId}/add`)
  })
})

When('I click on the new tenure button', () => {
  propertyPage.newTenureButton().click()
})
And('the residents information is displayed', () => {
  tenurePage.residentsDetailsAreDisplayed()
})

When('I click on the add new person to tenure button', () => {
  tenurePage.addNewPersonToTenureButton().click()
})

And('I click the modal cancel button', () => {
  modal.cancelButton().click({ force: true })
})

And('I click the confirm button', () => {
  modal.confirmationButton().click({ force: true })
})

Then('the cancel modal is displayed', () => {
  modal.modalBody().should('be.visible')
})

Then('the warning modal is displayed', () => {
  modal.modalBody().should('be.visible')
})

When('I click cancel on the modal', () => {
  modal.cancelButton().click()
})

And('I click yes on the modal', () => {
  modal.confirmationButton().click()
})

// Add person
And('I select a title {string}', (title) => {
  addPersonPage.personTitleSelection().select(title)
})

When('I select person type {string}', (personType) => {
  if (personType === 'Named tenure holder') {
    addPersonPage.tenureHolderRadioButton().click()
  }
  if (personType === 'Household member') {
    addPersonPage.householdMemberRadioButton().click()
  }
})

And('I enter a first name {string}', (firstName) => {
  addPersonPage.firstNameContainer().clear()
  addPersonPage.firstNameContainer().type(firstName)
})

And('I enter a middle name {string}', (middleName) => {
  addPersonPage.middleNameContainer().clear()
  addPersonPage.middleNameContainer().type(middleName)
})

And('I enter a last name {string}', (lastName) => {
  if (lastName === 'guid') {
    lastName = guid
  }
  addPersonPage.lastNameContainer().clear()
  addPersonPage.lastNameContainer().type(lastName)
})

And('I enter a date of birth {string} {string} {string}', (day, month, year) => {
  addPersonPage.dateOfBirthDayContainer().clear()
  addPersonPage.dateOfBirthDayContainer().type(day)
  addPersonPage.dateOfBirthMonthContainer().clear()
  addPersonPage.dateOfBirthMonthContainer().type(month)
  addPersonPage.dateOfBirthYearContainer().clear()
  addPersonPage.dateOfBirthYearContainer().type(year)
})

Then('the form error container is displayed', () => {
  addPersonPage.addPersonFormErrorContainer().should('be.visible')
  addPersonPage.errorSummaryBody().contains('This date cannot be in the future')
})

And('I enter a place of birth {string}', (placeOfBirth) => {
  addPersonPage.placeOfBirthContainer().clear()
  addPersonPage.placeOfBirthContainer().type(placeOfBirth)
})

And('I select a preferred title {string}', (preferredTitle) => {
  addPersonPage.preferredTitleContainer().select(preferredTitle)
})

And('I select a preferred first name {string}', (preferredFirstName) => {
  addPersonPage.preferredFirstNameContainer().clear()
  addPersonPage.preferredFirstNameContainer().type(preferredFirstName)
})

And('the named tenure holder button is not active', () => {
  addPersonPage.tenureHolderRadioButton().should('have.attr', 'disabled')
})

And('the named tenure holder button is active', () => {
  addPersonPage.tenureHolderRadioButton().should('have.attr', 'disabled')
})

And('I remove one of the tenure holders', () => {
  addPersonPage.removePersonFromTenure().click()
})

And('I click the next button', () => {
  cy.contains('Next').click()
});

Given("I am on the MMH home page", () => {
  changeOfNamePage.visitHomePage();
});
When("I enter {string} as search criteria", (textSearch) => {
  changeOfNamePage.textSearch().should('exist');
  changeOfNamePage.searchField().clear().type(textSearch);
});
When("I select {string} and click on search button", (entity) => {
  switch (entity) {
    case 'Person':
      changeOfNamePage.radiobuttonPerson().click();
      changeOfNamePage.searchButton().click();
      break;
    case 'property':
      changeOfNamePage.radiobuttonProperty().click();
      changeOfNamePage.searchButton().click();
      break;
    case 'Tenure':
      changeOfNamePage.radiobuttonTenure().click();
      changeOfNamePage.searchButton().click();
      break;
  }

});
Then("I am on the Person search results page for {string}", (personSearch) => {
  cy.findAllByText('Search Results').should('exist');
  cy.get('#limit-field').select('40 items');//.click();
  searchPersonResults(personSearch);
});
Then("I am on the Property search results page for {string}", (propertySearch) => {
  cy.findAllByText('Search Results').should('exist');
  cy.get('#limit-field').select('40 items');//.click();
  searchPropertyResults(propertySearch);
})
When("I select person", () => {
  cy.get('@searchPersonResult').then(res => {
    for (let i = 0; i < res.results.persons.length; i++) {
      let person = res.results.persons[i];
      if (person.tenures.length === 1) {
        if (person.tenures[0].type === "Secure" && person.tenures[0].isActive === true) {
          cy.log(person.firstname);
          let title;
          if (person.title === 'Ms' || person.title === 'Mrs') {
            title = person.title + "."
          } else title = person.title;
          let fullname = title + " " + person.firstname + " " + person.surname;
          cy.findByRole('link', { name: fullname }).click();
          break;
        } else {
          i++;
        }
      } else i++;
    }
  });
});

When("I select person who is InActive", () => {
  cy.get('@searchPersonResult').then(res => {
    for (let i = 0; i < res.results.persons.length; i++) {
      let person = res.results.persons[i];
      if (person.tenures.length === 1) {
        if (person.tenures[0].type === "Secure" && person.tenures[0].isActive === false) {
          cy.log(person.firstname);
          let title;
          if (person.title === 'Ms' || person.title === 'Mrs') {
            title = person.title + "."
          } else title = person.title;
          let fullname = title + " " + person.firstname + " " + person.surname;
          cy.findByRole('link', { name: fullname }).click();
          break;
        } else {
          i++;
        }
      } else i++;
    }
  });
});
//property

When("I select person and click on checkbox", () => {
  cy.get('@searchPersonResult').then(res => {
    for (const person of res.results.persons) {
      let title = person.title;
      if (['Ms', 'Mrs'].includes(title)) {
        title = title + ".";
      }
      const fullname = `${title} ${person.firstname} ${person.surname}`;
      cy.findByRole('link', { name: fullname }).click();
      break;
    }
  });
})
When("I select property", () => {
  cy.get(':nth-child(1) > .mtfh-search-card > .mtfh-link-overlay > .govuk-link').click();
})
Then("I can see the same comments in the Person details page", () => {
  cy.contains('Test Comment 123');
})

Then("I can see the same comments in the Property details page", () => {
  cy.contains('Test Comment 123');
});

When("I click on Save email address without entering any data", () => {
  cy.get('.mtfh-fieldset__content > :nth-child(1) > .govuk-button').click();
  cy.contains('Save email address').click();
});
Then("Validation error message is displayed for email address", () => {
  cy.get('#contact-details-email-address-error').should('contain', 'You must enter an email address to proceed');
});
When("I click on Save Phone number without entering any data", () => {
  cy.get('.mtfh-fieldset__content > :nth-child(2) > .govuk-button').click();
  cy.contains('Save phone number').click();
});
Then("Validation error message is displayed for phone number", () => {
  cy.get('#contact-details-phone-number-error').should('contain', 'You must enter a phone number to proceed');
  cy.get('#contact-details-phone-type-error').should('contain', 'You must select an option to proceed');
  cy.get('.lbh-dialog__close > svg').click();
});
When("I click on the link 'the contact details'", () => {
  cy.contains('the contact details,').click();
});

Then("{string} modal dialog is displayed", (header) => {
  modal.modalBody().should('contain', header);
  modal.modalBody().should('contain', 'Add an email address');
  changeOfName.buttonReturnToApplication().should('exist');
});
When("I select Return to Application", () => {
  changeOfName.buttonReturnToApplication().click();
});
Then("modal dialog is closed and I am on the supporting documents page", () => {
  changeOfName.statusActiveCheck().should('contain.text', "Request Documents");
});
When("I enter data email address and phone number", () => {
  cy.get('.mtfh-fieldset__content > :nth-child(1) > .govuk-button').click();
  changeOfName.emailAddress().clear().type(emailAdd);
  cy.contains('Save email address').click();
  //cy.contains(`Email address: ${emailAdd}`);
  cy.contains('Add a phone number').click();
  cy.get('#contact-details-phone-number-field').type(phoneNumber);
  cy.get('#contact-details-phone-type-mobile').click();
  cy.contains('Save phone number').click();
  changeOfName.buttonReturnToApplication().click();
});
And("I click on Remove email address and Remove phone number", () => {
  cy.get('[data-testid=button-remove-email]').click();
  cy.get('[data-testid=button-confirm-remove-email]').click();
  cy.get('[data-testid=button-remove-phone]').click();
  cy.get('[data-testid=button-confirm-remove-phone]').click();
  changeOfName.buttonReturnToApplication().click();
  // contactDetails.getContactDetails(personId).then(getResponse => {
  //   cy.log(`Status code ${getResponse.status} returned`)
  //   if (getResponse.status === 200) {
  //     const results = getResponse.data.results
  //     results.forEach(({id, targetId, contactInformation }) => {
  //       if (contactInformation.contactType === "phone") {
  //         cy.log(`id=${id}`)
  //         cy.log(`tid=${targetId}`)
  //         contactDetails.deleteContactDetails(
  //             id,
  //             targetId,
  //         ).then(deleteResponse => {
  //           assert.deepEqual(deleteResponse.status, 200)
  //
  //         })
  //       }
  //     })
  //   }
  // })
});
// And("I click on Remove phone number" , () => {
//   let phoneBtn = cy.get('[data-testid=button-remove-phone]');
//   for(let i = 0; i < phoneBtn.length; i++) {
//    phoneBtn[i].click();
//     cy.get('[data-testid=button-confirm-remove-phone]').click();
//   }
//   changeOfName.buttonReturnToApplication().click();
// });

Then("email address and phone number are null", () => {
  cy.contains(emailAdd).should('not.exist');
  cy.contains(phoneNumber).should('not.exist');
})

And("the details email address and phone number are displayed", () => {
  cy.contains(emailAdd);
  cy.contains(phoneNumber);
});
Then("Status Stepper is at {string}", (status) => {
  changeOfName.statusActiveCheck().should('be.visible');
  changeOfName.statusActiveCheck().should('contain.text', status);
});
And("I can see the text add the contact details", () => {
  cy.contains('Please add the contact details, it will automatically update the tenant’s contact details as well.');
});

Given("I seeded the database", () => {
  cy.log("Seeding database").then(() => {
    const patchModel = patch;
    const assetModel = asset(patchModel);
    const personModel1 = person();
    const personModel2 = person();
    const tenureModel = tenure({}, assetModel, [personModel1, { isResponsible: true, personTenureType: "Tenant", ...personModel2 }]);

    const personTenure = {
      id: tenureModel.id,
      startDate: tenureModel.startOfTenureDate,
      endDate: tenureModel.endOfTenureDate,
      assetFullAddress: tenureModel.tenuredAsset.fullAddress,
      assetId: tenureModel.tenuredAsset.id,
      uprn: tenureModel.tenuredAsset.uprn,
      isActive: false,
      type: tenureModel.tenureType.description,
      propertyReference: tenureModel.tenuredAsset.propertyReference,
    }

    personModel1.tenures.push(personTenure);
    personModel2.tenures.push(personTenure);

    assetModel.tenure = {
      endOfTenureDate: tenureModel.endOfTenureDate,
      id: tenureModel.id,
      paymentReference: tenureModel.paymentReference,
      startOfTenureDate: tenureModel.startOfTenureDate,
      type: tenureModel.tenureType.description,
    }

    return new Cypress.Promise((resolve) => {
      Promise.all([
        DynamoDb.createRecord("PatchesAndAreas", patchModel),
        DynamoDb.createRecord("Assets", assetModel),
        DynamoDb.createRecord("TenureInformation", tenureModel),
        DynamoDb.createRecord("Persons", personModel1),
        DynamoDb.createRecord("Persons", personModel2),
      ]).then(() => {
        resolve()
      })
    }).then(() => {
      cy.log("Database seeded!");
    })
  })
})

Given("I seeded the database with an asset {string}", (assetGuid) => {
  cy.log("Adding asset to database").then(() => {
    // const patchModel = patch;
    // const assetModel = asset(patchModel, assetGuid);
    // const tenureModel = tenure({}, assetModel);

    const assetModel = {
      "id": assetGuid,
      "assetId": "0014062023",
      "assetType": "Dwelling",
      "parentAssetIds": "463f556b-fbe6-4216-84f3-99b64ccafe6b",
      "isActive": true,
      "assetLocation": {
        "floorNo": "",
        "totalBlockFloors": null,
        "parentAssets": []
      },
      "assetAddress": {
        "uprn": "",
        "postPreamble": "",
        "addressLine1": "12 Pitcairn House",
        "addressLine2": "",
        "addressLine3": "",
        "addressLine4": "",
        "postCode": "E9 6PT"
      },
      "assetManagement": {
        "agent": "",
        "areaOfficeName": "",
        "isCouncilProperty": true,
        "managingOrganisation": "London Borough of Hackney",
        "isTMOManaged": false,
        "managingOrganisationId": "c01e3146-e630-c2cd-e709-18ef57bf3724"
      },
      "assetCharacteristics": {
        "numberOfBedrooms": null,
        "numberOfLivingRooms": null,
        "yearConstructed": "",
        "windowType": "",
        "numberOfLifts": null
      }
    }

    return new Cypress.Promise((resolve) => {
      Promise.all([
        DynamoDb.createRecord("Assets", assetModel),
      ]).then(() => {
        resolve()
      })
    }).then(() => {
      cy.log("Asset added to db!");
    })
  })
})

Given("There's a person with a cautionary alert", () => {
  cy
    .log("Creating cautoinary alert & entities associated with it")
    .then(() => {
      const patchModel = patch;
      const assetModel = asset(patchModel);
      const tenureModel = tenure({}, assetModel);
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

      return new Cypress.Promise((resolve) => {
        Promise.all([
          DynamoDb.createRecord("PatchesAndAreas", patchModel),
          DynamoDb.createRecord("Assets", assetModel),
          DynamoDb.createRecord("TenureInformation", tenureModel),
          DynamoDb.createRecord("Persons", personModel)
        ]).then(() => {
          resolve();
        });
      }).then(() => {
        cy.log("CA related data created.");
      })
    });
});

Given("I create a tenure {string} {string}", (startOfTenureDate, isResponsible) => {
  cy.log("Creating tenure").then(() => {
    const assetModel = asset(patch);
    const tenureModel = tenure({ startOfTenureDate }, assetModel);
    if (isResponsible === "true") {
      tenureModel.householdMembers[0].isResponsible = true;
    }
    return new Cypress.Promise((resolve) => {
      DynamoDb.createRecord("TenureInformation", tenureModel).then(() => {
        resolve()
      })
    })
  }).then(() => {
    cy.log("Tenure created!")
  });

})

After(() => {
  const filename = "cypress/fixtures/recordsToDelete.json";
  cy.readFile(filename)
    .then(data => {
      return new Cypress.Promise((resolve) => {
        Promise.all(data.map(record => dynamoDb.deleteRecord(record)))
          .then(() => {
            resolve()
          })
      }).then(() => {
        cy.writeFile(filename, []);
        cy.log("Test database records cleared!")
      })
    });
})

beforeEach(() => {
  const filename = "cypress/fixtures/recordsToDelete.json";
  cy.readFile(filename)
    .then(recordsToDelete => {
      if (recordsToDelete.length) {
        cy.log("Removing test database records from database (see recordsToDelete.json file).")

        return new Cypress.Promise((resolve) => {
          Promise.all(recordsToDelete.map(record => dynamoDb.deleteRecord(record)))
            .then(() => {
              resolve()
            })
        }).then(() => {
          cy.writeFile(filename, []);
          cy.log("Test database records cleared!")
        })
      }
    });
});