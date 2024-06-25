import { And, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { queueDeletePersonWithId } from "../../../api/helpers"
import { generateEqualityInformation } from '../../../api/models/requests/equalityDetailsModel'
import guid from '../../helpers/commentText'
import AddPersonPageObjects from '../../pageObjects/addPersonPage'
import EditPersonPageObjects from '../../pageObjects/editPersonPage'
import { addTestRecordToDatabase } from '../common/common'

const addPersonPage = new AddPersonPageObjects()
const editPersonPage = new EditPersonPageObjects()
const editEqualityDetails = require('../../../api/equality-information')
const getEqualityDetails = require('../../../api/equality-information')

And('the person has been added to the tenure', () => {
  addPersonPage.pageAnnouncement().contains('Person added to tenure')
})

And('the person is added to the tenure page {string} {string} {string}', (title, firstName, middleName) => {
  for (let index = 0; index < 10;) {
    cy.get('.mtfh-resident-details').then(($residentDetails) => {
      if ($residentDetails.text().includes(`${title} ${firstName} ${middleName} ${guid}`)) {
        cy.contains(`${title} ${firstName} ${middleName} ${guid}`)
          .should('be.visible')
      } else {
        cy.wait
        cy.reload()
        index++
      }
    })
  }

  const person = `${title} ${firstName} ${middleName} ${guid}`
  for (let i = 0; i < 10; i++) {
    addPersonPage.mainContent().then(($body) => {
      if ($body.text().includes(guid)) {
        cy.contains(person).click()
      } else {
        cy.wait(1000)
        cy.reload(true)
      }
    })
  }
},
)

And('the person page is loaded', () => {
  cy.url().should('contain', 'person')
})

And('I am on the tenure page {string}', (tenureId) => {
  cy.url().should('include', `tenure/${tenureId}`)
})

And('I click the update person button', () => {
  addPersonPage.updatePersonButton().click()
})

And(
  'the person has been updated {string} {string} {string}',
  (firstName, middleName, lastName) => {
    addPersonPage.pageAnnouncement().contains('Person updated')
    if (lastName === 'guid') {
      lastName = guid
    }
    addPersonPage
      .mainContent()
      .contains(`${firstName} ${middleName} ${lastName}`)
  },
)

And('the confirmation modal is displayed', () => {
  addPersonPage.confirmationModal().should('be.visible')
  addPersonPage.confirmationModal().contains('Yes')
  addPersonPage.confirmationModal().contains('Cancel')
  addPersonPage.confirmationModal().contains('Unsaved changes will be lost.')
})

And('the confirmation modal is not displayed', () => {
  addPersonPage.confirmationModal().should('not.exist')
})

And('the person type options are not displayed', () => {
  addPersonPage.tenureHolderRadioButton().should('not.exist')
  addPersonPage.householdMemberRadioButton().should('not.exist')
})

Then('the gender field is not displayed', () => {
  addPersonPage.genderContainer().should('not.exist')
})

And('the nationality field is not displayed', () => {
  addPersonPage.nationalityContainer().should('not.exist')
})

And('the national insurance field is not displayed', () => {
  addPersonPage.nationalInsuranceNumberContainer().should('not.exist')
})

And('the add language options are not displayed', () => {
  addPersonPage.addLanguageButton().should('not.exist')
})

And('the add id options are not displayed', () => {
  addPersonPage.addIdButton().should('not.exist')
})

And('there is a merge conflict', () => {
  cy.intercept('PATCH', '**/persons/**', (req) => {
    req.headers['If-Match'] = '0'
  }).as('edit')

  addPersonPage.updatePersonButton().click()
  cy.wait('@edit')
  editPersonPage.mergeConflictDialogBox().contains('Changes not saved')
})

And('I am on the contact details page', () => {
  cy.url()
    .should('include', 'contact')
    .then(url => {
      const personId = /((\w{4,12}-?)){5}/.exec(url)[1] // regex for id
      queueDeletePersonWithId(personId);
    });
})

And('I click the save equality information button', () => {
  addPersonPage.saveEqualityInformationButton().click()
})

Given("I edit a person's equality information", () => {
  cy.getPersonFixture().then(({ id }) => {
    addPersonPage.editPersonEqualityInformation(id)
  })
})

Then('the equality information is displayed', () => {
  addPersonPage.ageGroupSelectionBox().should('be.visible')
  addPersonPage.provideUnpaidCareSelectionField().should('be.visible')
  addPersonPage.ethnicitySelectionBox().should('be.visible')
  addPersonPage.consideredDisabledSelectionField().should('be.visible')
  addPersonPage.genderSelectionField().should('be.visible')
  addPersonPage.genderDifferentToBirthSexSelectionField().should('be.visible')
  addPersonPage.religionOrBeliefSelectionBox().should('be.visible')
  addPersonPage.pregnancyOrMaternityLeaveSelectionField().should('be.visible')
  addPersonPage.saveEqualityInformationButton().should('be.visible')
})

Then('the preferred gender term field is displayed', () => {
  addPersonPage.preferredGenderTermField().should('be.visible')
})

Then('the preferred gender term field is not displayed', () => {
  addPersonPage.preferredGenderTermField().should('not.be.visible')
})

Given("the person's equality information is reset", () => {
  cy.getPersonFixture().then(({ id: personId }) => {
    cy.log('Getting etag from the person...')
    getEqualityDetails.getEqualityDetails(personId).then(getResponse => {
      cy.log(`Status code ${getResponse.status} returned`)
      if (getResponse.status === 200) {
        cy.log('etag captured!')
        cy.log(getResponse.headers.etag)

        cy.log('Updating equality information...')
        editEqualityDetails.editEqualityDetails(
          getResponse.data.id,
          getResponse.headers.etag,
        ).then(patchResponse => {
          cy.log(`Status code ${patchResponse.status} returned`)
          assert.deepEqual(patchResponse.status, 200)
          cy.log('Equality information updated!')
        })
      }
    })
  })
})

When('I select an age group {string}', (ageGroup) => {
  addPersonPage.ageGroupSelectionBox().select(ageGroup)
})

Then('I select a carer option {string}', (carerOption) => {
  addPersonPage
    .provideUnpaidCareSelectionField()
    .within(() => {
      return cy.contains(carerOption)
    })
    .click()
})

And('I select a disability option {string}', (disabilityOption) => {
  addPersonPage
    .consideredDisabledSelectionField()
    .within(() => {
      return cy.contains(disabilityOption)
    })
    .click()
})

And('I select an ethnicity {string}', (ethnicity) => {
  addPersonPage.ethnicitySelectionBox().select(ethnicity)
})

And('I select a gender {string}', (gender) => {
  if (gender === 'Male') {
    cy.get('#equality-information-form-radio-genderValue-m').click()
  }
  if (gender === 'Female') {
    cy.get('#equality-information-form-radio-genderValue-f').click()
  }
  if (gender === 'Other') {
    cy.get('#equality-information-form-radio-genderValue-o').click()
  }
})

And('I enter {string} into the gender term field', (genderTerm) => {
  addPersonPage.preferredGenderTermField().type(genderTerm)
})

And('I select a gender identity option {string}', (genderIdentity) => {
  addPersonPage
    .genderDifferentToBirthSexSelectionField()
    .within(() => {
      return cy.contains(genderIdentity)
    })
    .click()
})

And('I select a religion or belief {string}', (religionOrBelief) => {
  addPersonPage.religionOrBeliefSelectionBox().select(religionOrBelief)
})

And('I select a sexual orientation {string}', (sexualOrientation) => {
  addPersonPage.sexualOrientationSelectionBox().select(sexualOrientation)
})

And(
  'I select a pregnancy or maternity option {string}',
  (pregnancyOrMaternityOption) => {
    addPersonPage
      .pregnancyOrMaternityLeaveSelectionField()
      .within(() => {
        return cy.contains(pregnancyOrMaternityOption)
      })
      .click()
  },
)

And('I click save equality information', () => {
  addPersonPage.saveEqualityInformationButton().click()
})

Then('the equality information is saved {string}', () => {
  addPersonPage.mainContent().contains('Person updated')
})

And('the sexual orientation information is not displayed', () => {
  addPersonPage.sexualOrientationSelectionBox().should('not.exist')
})

Then('the sexual orientation information is displayed', () => {
  addPersonPage.sexualOrientationSelectionBox().should('be.visible')
})

Then("I browse to the 'Add Person to Tenure' page for the tenure", () => {
  cy.getTenureFixture().then((tenure) => {
    cy.reload()
    cy.visit(`${Cypress.config("baseUrl")}/tenure/${tenure.id}/edit/person/new`)
  })
});

Then("I visit the 'Edit person' page for the person", () => {
  cy.getPersonFixture().then(({ id: personGuid }) => {
    editPersonPage.visit(personGuid)
  })
})

// Database seed methods

Then("I seed blank equality information to the database, for such person", () => {
  cy.getPersonFixture().then(({ id: personGuid }) => {
    addTestRecordToDatabase("EqualityInformation", generateEqualityInformation(personGuid))
  })
})
