import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import AddPersonPageObjects from '../../pageObjects/addPersonPage'
import EditPersonPageObjects from '../../pageObjects/editPersonPage'
import PersonContactPageObjects from '../../pageObjects/personContactPage'
import guid from '../../helpers/commentText'

const addPersonPage = new AddPersonPageObjects()
const editPersonPage = new EditPersonPageObjects()
const personContactPage = new PersonContactPageObjects()
const contactDetails = require('../../../api/contact-details')

Then('the add a new person tenure page is correct', () => {
    addPersonPage.addPersonPageIsDisplayed()
})

And('the person has been added to the tenure', () => {
    addPersonPage.pageAnnouncement().contains('Person added to tenure')
})

And('the person is added to the tenure page {string} {string} {string}', (title, firstName, middleName) => {
    
    for (let index = 0; index < 10;) {
        cy.get('.mtfh-resident-details').then(($residentDetails) => {
            if ($residentDetails.text().includes(`${title} ${firstName} ${middleName} ${guid}`)) {
                cy.contains(`${title} ${firstName} ${middleName} ${guid}`).should('be.visible')
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
})

And('the person page is loaded', () => {
    cy.url().should('contain', 'person')
})

And('I am on the tenure page {string}', (tenureId) => {
    cy.url().should('include', `tenure/${tenureId}`)
})

And('I edit the person {string} {string} {string} {string}', (title, personType, firstName, middleName) => {
    cy.intercept('GET', '/edit', (req) => {
        etag = req.headers
    })
    if(personType === 'Named tenure holder') {
        cy.contains(`View ${title} ${firstName} ${middleName} ${guid}`).click()
    } else {
        cy.contains(`${title} ${firstName} ${middleName} ${guid}`).click()
    }
})

And('I click the update person button', () => {
    addPersonPage.updatePersonButton().click()
})

And('the person has been updated {string} {string} {string}', (firstName, middleName, lastName) => {
    addPersonPage.pageAnnouncement().contains('Person updated')
    if(lastName === 'guid') {
        lastName = guid
    }
    addPersonPage.mainContent().contains(`${firstName} ${middleName} ${lastName}`)
})

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
    cy.intercept('PATCH','**/persons/**', (req) => {
        req.headers['If-Match'] = '0'
    }).as('edit')
    
    addPersonPage.updatePersonButton().click()
    cy.wait('@edit')
    editPersonPage.mergeConflictDialogBox().contains('Changes not saved')
})

When('I edit a person\'s contact details {string}', (person) => {
    addPersonPage.editPersonContactDetails(person)
})

And('I click add a correspondence address', () => {
    personContactPage.addCorrespondenceAddressButton().click()
})

Then('the correspondence address fields are displayed', () => { 
    personContactPage.addressLineOneField().should('be.visible')
    personContactPage.addressLineTwoField().should('be.visible')
    personContactPage.addressLineThreeField().should('be.visible')
    personContactPage.addressLineFourField().should('be.visible')
    // personContactPage.postcodeLookupButton().should('be.visible')
    // personContactPage.postcodeLookupField().should('be.visible')
    personContactPage.postcodeField().should('be.visible')
})

When('I enter a postcode into the lookup field {string}', (postCode) => {
    personContactPage.postcodeLookupField().type(postCode)
})

And('I click look up', () => {
    personContactPage.postcodeLookupButton().click()
})

Then('the select address selection box is populated {string}', (postCode) => {
    personContactPage.addressLineOneField().should('not.be.empty')
    personContactPage.addressLineTwoField().should('not.be.empty')
    personContactPage.addressLineThreeField().should('not.be.empty')
    personContactPage.addressLineFourField().should('not.be.empty')
    personContactPage.postcodeField().contains(postCode)
})

Then('an invalid postcode error is thrown', () => {
    personContactPage.postcodeLookupErrorContainer().should('be.visible')
    personContactPage.postcodeLookupErrorContainer().contains('Please enter a valid postcode')
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
    personContactPage.confirmationMessage().contains('Correspondence address saved')
})

And('I delete all of the correspondence addresses for {string}', async (personId) => {
    // GET the list of correspondence addresses for a person
    const getResponse = await contactDetails.getContactDetails(personId)
    cy.log(`Status code ${getResponse.status} returned`)
    assert.deepEqual(getResponse.status, 200)

    const correspondenceAddresses = getResponse.data.results;

    // DELETE any existing correspondence addresses for a person
    for(let i = 0; i < correspondenceAddresses.length; i++) {
        if(correspondenceAddresses[i].contactInformation.subType === "correspondenceAddress") {
            cy.log(`id=${correspondenceAddresses[i].id}`)
            cy.log(`tid=${correspondenceAddresses[i].targetId}`)
            const deleteResponse = await contactDetails.deleteContactDetails(correspondenceAddresses[i].id, correspondenceAddresses[i].targetId)
            assert.deepEqual(deleteResponse.status, 200)
        }
    }
})

Given('I have the maximum number of {string} for {string}', async (contactType, personId) => {
    const getResponse = await contactDetails.getContactDetails(personId)
    cy.log(`Status code ${getResponse.status} returned`)
    assert.deepEqual(getResponse.status, 200)

    const details = getResponse.data.results;
    let requiredContactType = 0

    for(let i = 0; i < details.length; i++) {
        if(details[i].contactInformation.contactType === contactType) {
            requiredContactType++
        }
    }

    // POST new contact details if not at maximum
    for(let i = 0; i < (5-requiredContactType); i++) {
        const postResponse = await contactDetails.addContactDetails(contactType, personId)
        assert.deepEqual(postResponse.status, 201)
    }
})

Then('I cannot add any more contacts for {string}', (contactType) => {

    if(contactType === "email") {
        personContactPage.mainContent().contains('You cannot add more than 5 email addresses')
        personContactPage.addEmailAddressButton().should('be.disabled')
    }

    if(contactType === "phone") {
        personContactPage.mainContent().contains("You cannot add more than 5 phone numbers")
        personContactPage.addPhoneNumberButton().should('be.disabled')
    }
})