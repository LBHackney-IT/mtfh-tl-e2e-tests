import { And, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { generateAsset } from "../../../api/models/requests/createAssetModel";
import { person } from "../../../api/models/requests/createPersonModel";
import AddPersonPageObjects from "../../pageObjects/addPersonPage";
import CreateTenurePageObjects from "../../pageObjects/createTenurePage";
import ModalPageObjects from "../../pageObjects/sharedComponents/modal";
import DynamoDb from "../common/DynamoDb";

const createTenurePage = new CreateTenurePageObjects()
const addPersonPage = new AddPersonPageObjects()
const modal = new ModalPageObjects()
const tenure = require('../../../api/tenure')

Then('the new tenure landing page is displayed', () => {
    createTenurePage.addPropertyHeading().should('be.visible')
    createTenurePage.propertyAddress().should('be.visible')
})

When('I select a tenure type {string}', (tenureType) => {
    createTenurePage.tenureTypeSelection().select(tenureType)
})

And('I enter a tenure start date {string} {string} {string}', (day, month, year) => {
    createTenurePage.tenureStartDateDayContainer().type(day)
    createTenurePage.tenureStartDateMonthContainer().type(month)
    createTenurePage.tenureStartDateYearContainer().type(year)
})

And('I enter a tenure end date {string} {string} {string}', (day, month, year) => {
    createTenurePage.tenureEndDateDayContainer().type(day)
    createTenurePage.tenureEndDateMonthContainer().type(month)
    createTenurePage.tenureEndDateYearContainer().type(year)
})

And('I click the cancel button', () => {
    createTenurePage.cancelButton().click({ force: true })
})

Then('a create tenure error is triggered {string}', (error) => {
    createTenurePage.errorContainer().should('be.visible')
    createTenurePage.errorBody().contains(error)
})

And('the person search is displayed', () => {
    createTenurePage.searchContainer().should('be.visible')
    createTenurePage.searchButton().should('be.visible')
})

Then('the cancel confirmation modal is displayed', () => {
    modal.modalBody().should('be.visible')
})

And('the tenure person search is displayed', () => {
    createTenurePage.searchContainer().should('be.visible')
    createTenurePage.searchButton().should('be.visible')
    createTenurePage.main().contains('Property type')
    createTenurePage.main().contains('UPRN')
    createTenurePage.main().contains('Property reference')
})

Then('the edit tenure information is displayed', () => {
    createTenurePage.tenureTypeSelection().should('be.visible')
    createTenurePage.tenureStartDateDayContainer().should('be.visible')
    createTenurePage.tenureStartDateMonthContainer().should('be.visible')
    createTenurePage.tenureStartDateYearContainer().should('be.visible')
    cy.getTenureFixture(({ id: tenureId }) => {
        cy.url().should('include', `tenure/${tenureId}/edit`)
    })
})

And('I click done button', () => {
    createTenurePage.doneButton().click()
})

When('I edit a Tenure {string}', (id) => {
    if (id) {
        createTenurePage.editTenure(id)
        return;
    }
    cy.getTenureFixture().then(async (tenureInfo) => {
        createTenurePage.editTenure(tenureInfo.id)
    })
})

Then('the tenure cannot be edited warning message is displayed', () => {
    createTenurePage.errorMessageContainer().should('be.visible')
    createTenurePage.errorMessageContainer().contains('This tenure is no longer active and cannot be edited.')
})

When('I add {int} named tenure holder', (tenureHolders) => {
    cy.wait(10000) // Allows enough time to retrieve tenure with the latest version
    for (let i = 0; i < tenureHolders; i++) {
        createTenurePage.addAsNamedTenureHolderButton().eq(i).click()
    }
})

Then('the person is added to the tenure', () => {
    // createTenurePage.pageAnnouncementContainer().should('be.visible')
    createTenurePage.pageAnnouncementContainer().should('contain', 'Person added to tenure');
})

Then('the person is not added to the tenure', () => {
    createTenurePage.pageAnnouncementContainer().should('be.visible')
    createTenurePage.pageAnnouncementContainer().contains('Person added to tenure')
})

When('I add {int} household member', (householdMembers) => {
    cy.wait(10000) // Allows enough time to retrieve tenure with the latest version
    for (let i = 0; i < householdMembers; i++) {
        createTenurePage.addAsHouseholdMember().eq(i).click()
    }
})

Then('a new tenure error message appears {string}', (error) => {
    createTenurePage.pageAnnouncementContainer().should('be.visible')
    createTenurePage.pageAnnouncementContainer().contains(error)
})

And('the create new person button is not enabled', () => {
    createTenurePage.createNewPersonButton().should('have.attr', 'aria-disabled').and('equal', 'true')
})

And('I click create new person', () => {
    createTenurePage.createNewPersonButton().click()
})

And('I am on the create new person for a new tenure page', () => {
    cy.url().should('include', '/person/new/')
})

Then('I am on the create contact for a new tenure page', () => {
    cy.url().should('include', '/person/new/add/')
    cy.url().should('include', '/contact')
})

And('the person is added to the list of tenures {string} {string} {string} {string} {string} {string} {string}', (title, firstName, middleName, lastName, day, month, year) => {
    createTenurePage.addedHouseholdMembersContainer().contains(`${title} ${firstName} ${middleName} ${lastName}`)
    createTenurePage.addedHouseholdMembersContainer().contains(`${day}/${month}/${year},`)
})

When('I navigate to a create person for new tenure {string} {string}', (property, tenure) => {
    createTenurePage.createNewPerson(property, tenure)
})

Given('I delete all existing persons from the tenure {string}', async (tenureId) => {
    // GET the list of people from the tenure
    const getResponse = await tenure.getTenure(tenureId)
    cy.log(`Status code ${getResponse.status} returned`)
    assert.deepEqual(getResponse.status, 200)

    const householdMembers = getResponse.data.householdMembers;

    // DELETE any existing person from the tenure
    for (let i = 0; i < householdMembers.length; i++) {
        const deleteResponse = await tenure.deleteTenure(tenureId, householdMembers[i].id)
        cy.log(`Status code ${deleteResponse.status} returned`)
        assert.deepEqual(deleteResponse.status, 204)
    }
    cy.log(`${householdMembers.length} person records deleted`)
})

And('I click remove person', () => {
    createTenurePage.confirmRemovePersonButton().click()
})

Then('the tenure end date is editable', () => {
    createTenurePage.tenureEndDateDayContainer().should('be.enabled')
    createTenurePage.tenureEndDateMonthContainer().should('be.enabled')
    createTenurePage.tenureEndDateYearContainer().should('be.enabled')
});
Then("the information text is displayed", () => {
    modal.modalBody().should('be.visible');
    modal.modalBody().should('contain', 'Are you sure you want to change the status of the tenure to inactive? The tenure will no longer be editable.');
});

When("I enter a tenure end date as {string} {string} {string}", (day, month, year) => {
    createTenurePage.tenureEndDateDayContainer().clear().type(day);
    createTenurePage.tenureEndDateMonthContainer().clear().type(month);
    createTenurePage.tenureEndDateYearContainer().clear().type(year);
});

Then("the tenure information is displayed with the page heading Tenure updated", () => {
    createTenurePage.confirmTenureUpdatedText().should('contain', 'Tenure updated');
})

// Database seed methods

Given("I seeded the database with an asset {string} with no attached tenure", (assetGuid) => {
    cy.log("Seeding database").then(() => {
      const assetModel = generateAsset(assetGuid)
      const personModel1 = person();
      const personModel2 = person();
  
      return new Cypress.Promise((resolve) => {
        Promise.all([
          DynamoDb.createRecord("Assets", assetModel),
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
  
//   Given("I seeded the database with an asset {string} with a previous tenure", (assetGuid) => {
//     cy.log("Seeding database").then(() => {
//       const patchModel = patch;
//       const assetModel = generateAsset(assetGuid, { patch: patchModel })
//       const personModel1 = person();
//       const personModel2 = person();
//       const tenureModel = tenure({}, assetModel, [personModel1, { isResponsible: true, personTenureType: "Tenant", ...personModel2 }]);
  
//       const personTenure = {
//         id: tenureModel.id,
//         startDate: tenureModel.startOfTenureDate,
//         endDate: tenureModel.endOfTenureDate,
//         assetFullAddress: tenureModel.tenuredAsset.fullAddress,
//         assetId: tenureModel.tenuredAsset.id,
//         uprn: tenureModel.tenuredAsset.uprn,
//         isActive: false,
//         type: tenureModel.tenureType.description,
//         propertyReference: tenureModel.tenuredAsset.propertyReference,
//       }
  
//       personModel1.tenures.push(personTenure);
//       personModel2.tenures.push(personTenure);
  
//       assetModel.tenure = {
//         endOfTenureDate: tenureModel.endOfTenureDate,
//         id: tenureModel.id,
//         paymentReference: tenureModel.paymentReference,
//         startOfTenureDate: tenureModel.startOfTenureDate,
//         type: tenureModel.tenureType.description,
//       }
  
//       // Add expired/previous tenure to asset
//       assetModel.tenure = {
//         endOfTenureDate: "2022-07-29T00:00:00",
//         id: tenureModel.id,
//         paymentReference: tenureModel.paymentReference,
//         startOfTenureDate: "2020-07-29T00:00:00",
//         type: tenureModel.tenureType.description,
//       }
  
//       return new Cypress.Promise((resolve) => {
//         Promise.all([
//           DynamoDb.createRecord("PatchesAndAreas", patchModel),
//           DynamoDb.createRecord("Assets", assetModel),
//           DynamoDb.createRecord("TenureInformation", tenureModel),
//           DynamoDb.createRecord("Persons", personModel1),
//           DynamoDb.createRecord("Persons", personModel2),
//         ]).then(() => {
//           resolve()
//         })
//       }).then(() => {
//         cy.log("Database seeded!");
//       })
//     })
//   })