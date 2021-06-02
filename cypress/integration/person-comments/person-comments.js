import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import PersonCommentsPageObjects from '../../pageObjects/personCommentsPage'
import helperText from '../../helpers/inputText'

const personCommentsPage = new PersonCommentsPageObjects()

Given('I am on the create comment for a person page {string}', (person) => {
    personCommentsPage.visit(person)
})

Then('the create comment for a person components are displayed',  () => {
    personCommentsPage.personCommentsComponentsAreDisplayed()
})

When('I enter {int} characters into the comment field', (characters) => {
    function truncateString(str, num) {
        if (str.length <= num) {
          return str
        }
        return str.toString().slice(0, num)
      }

    const inputText = truncateString(helperText.helperText, characters)
    personCommentsPage.commentContainer().type(inputText)
})

Then('the number of characters remaining is correct {int}', (characters) => {
    const difference = differenceInCharacters(characters)
    personCommentsPage.characterCountMessage().should('be.visible')
    personCommentsPage.characterCountMessage().contains(`You have ${difference} characters remaining`)
})

Then('the warning message tells me I am over by {int}', (characters) => {
    const difference = differenceInCharacters(characters)
    personCommentsPage.characterCountErrorMessage().should('be.visible')
    personCommentsPage.characterCountErrorMessage().contains(`You have ${difference} characters too many`)
})

Then('a validation error occurs', () => {
    personCommentsPage.addCommentsError().should('be.visible')
    personCommentsPage.commentDescriptionErrorLabel().should('be.visible')
    personCommentsPage.commentDescriptionError().should('be.visible')
})

function differenceInCharacters(characters) {
    return Math.abs(500-characters)
}