import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps"
import AddPersonPageObjects from '../../pageObjects/addPersonPage'
import testGuid from '../../helpers/personCommentText'

const addPersonPage = new AddPersonPageObjects()

Given('I create a person for tenure {string}', (record) => {
    addPersonPage.visit(record)
})

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

And('I enter a reason for creation', () => {
    addPersonPage.reasonForCreationContainer().type('This is a test')
})

And('I click add person', () => {
    addPersonPage.addPersonButton().click()
})

Then('the form error container is displayed', () => {
    addPersonPage.addPersonFormErrorContainer().should('be.visible')
    addPersonPage.errorSummaryBody().contains('The date cannot be in the future')
    addPersonPage.errorSummaryBody().contains('Please enter a valid National Insurance Number')
})

And('I select a gender {string}', (gender) => {
    addPersonPage.genderContainer().select(gender)
})

And('I select a nationality {string}', (nationality) => {
    addPersonPage.nationalityContainer().select(nationality)
})

And('I enter a national insurance number {string}', (nationalInsuranceNumber) => {
    addPersonPage.nationalInsuranceNumberContainer().clear()
    addPersonPage.nationalInsuranceNumberContainer().type(nationalInsuranceNumber)
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

And('I select a preferred middle name {string}', (preferredMiddleName) => {
    addPersonPage.preferredMiddleNameContainer().clear()
    addPersonPage.preferredMiddleNameContainer().type(preferredMiddleName)
})

And('I select a preferred last name {string}', (preferredLastName) => {
    if(preferredLastName === 'guid') {
        preferredLastName = testGuid.testGuid
    }
    addPersonPage.preferredLastNameContainer().clear()
    addPersonPage.preferredLastNameContainer().type(preferredLastName)
})

And('I click to add a language', () => {
    addPersonPage.addLanguageButton().click()
})

Then('the add language options are displayed', () => {
    addPersonPage.languageContainer().should('be.visible')
})

And('I select a language {string}', (language) => {
    addPersonPage.languageSelectionContainer().select(language)
})

And('I click to add an id', () => {
    addPersonPage.addIdButton().click()
})
    
Then('the add id options are displayed', () => {
    addPersonPage.idContainer().should('be.visible')
})

And('I select an id type {string}', (idType) => {
    addPersonPage.idSelectionContainer().select(idType)
})

And('I enter an id number {string}', (idNumber) => {
    addPersonPage.idNumberContainer().type(idNumber)
})

And('I select id option seen {string}', (idSeen) => {
    if(idSeen === 'Yes') {
        addPersonPage.idYesRadioButton().click()
    }
    if(idSeen === "No") {
        addPersonPage.idNoRadioButton().click()
    }
})

And('I click to add a language {int} times', (number) => {
    for (let index = 0; index < number; index++) {
        addPersonPage.addLanguageButton().click()
    }
})

And('I click to add an id {int} times', (number) => {
    for (let index = 0; index < number; index++) {
        addPersonPage.addIdButton().click()
    }
})

Then('the add language button is not displayed', () => {
    addPersonPage.addLanguageButton().should('not.exist')
})

Then('the add id button is not displayed', () => {
    addPersonPage.addIdButton().should('not.exist')
})

And('I click to remove a language {int} times', (number) => {
    for (let index = 0; index < number; index++) {
        addPersonPage.removeLanguageButton().click()
    }
})

And('I click to remove an id {int} times', (number) => {
    for (let index = 0; index < number; index++) {
        addPersonPage.removeIdButton().click()
    }
})

Then('the add language options are not displayed', () => {
    addPersonPage.languageContainer().should('not.exist')
})

Then('the add id options are not displayed', () => {
    addPersonPage.idContainer().should('not.exist')
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