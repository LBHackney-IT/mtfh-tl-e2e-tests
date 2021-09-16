import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import AddPersonPageObjects from '../../pageObjects/addPersonPage'
import EditPersonPageObjects from '../../pageObjects/editPersonPage'
import testGuid from '../../helpers/personCommentText'

const addPersonPage = new AddPersonPageObjects()
const editPersonPage = new EditPersonPageObjects()

Then('the add a new person tenure page is correct', () => {
    addPersonPage.addPersonPageIsDisplayed()
})

And('I select a title {string}', (title) => {
    addPersonPage.personTitleSelection().select(title)
})

When('I select person type {string}', (personType) => {
    if(personType === 'Named tenure holder') {
        addPersonPage.tenureHolderRadioButton().click()
    }
    if(personType === 'Household member') {
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
    if(lastName === 'guid') {
        lastName = testGuid.testGuid
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
    addPersonPage.errorSummaryBody().contains('The date cannot be in the future')
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

And('the person has been added to the tenure', () => {
    addPersonPage.pageAnnouncement().contains('Person added to tenure')
})

And('the person is added to the tenure page {string} {string} {string}', (title, firstName, middleName) => {
    
    for (let index = 0; index < 10;) {
        cy.get('.mtfh-resident-details').then(($residentDetails) => {
            if ($residentDetails.text().includes(`${title} ${firstName} ${middleName} ${testGuid.testGuid}`)) {
                cy.contains(`${title} ${firstName} ${middleName} ${testGuid.testGuid}`).should('be.visible')
            } else {
                cy.wait
                cy.reload()
                index++
            }
        })
    }
    
    const person = `${title} ${firstName} ${middleName} ${testGuid.testGuid}`
    for (let i = 0; i < 10; i++) {
        addPersonPage.mainContent().then(($body) => {
            if ($body.text().includes(testGuid.testGuid)) {
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
        cy.contains(`View ${title} ${firstName} ${middleName} ${testGuid.testGuid}`).click()
    } else {
        cy.contains(`${title} ${firstName} ${middleName} ${testGuid.testGuid}`).click()
    }
})

And('I click the update person button', () => {
    addPersonPage.updatePersonButton().click()
})

And('the person has been updated {string} {string} {string}', (firstName, middleName, lastName) => {
    addPersonPage.pageAnnouncement().contains('Person updated')
    if(lastName === 'guid') {
        lastName = testGuid.testGuid
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