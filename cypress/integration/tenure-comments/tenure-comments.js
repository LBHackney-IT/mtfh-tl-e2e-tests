import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import TenureCommentsPageObjects from '../../pageObjects/tenureCommentsPage'
import helperText from '../../helpers/inputText'
import commentTitle from "../../helpers/commentText";


const tenureCommentsPage = new TenureCommentsPageObjects()

Given('I am on the create comment for a tenure page {string}', (tenure) => {
    tenureCommentsPage.visit(tenure)
})

Then('the create comment for a tenure components are displayed',  () => {
    tenureCommentsPage.tenureCommentsComponentsAreDisplayed()
})

When('I enter {int} characters into the comment field', (characters) => {
    function truncateString(str, num) {
        if (str.length <= num) {
          return str
        }
        return str.toString().slice(0, num)
      }

    const inputText = truncateString(helperText.helperText, characters)
    tenureCommentsPage.commentContainer().type(inputText)
})

When('I select a comment category {string}',  (category) => {
    tenureCommentsPage.addCommentCategoryField().select(category)
})

Then('the number of characters remaining is correct {int}', (characters) => {
    const difference = differenceInCharacters(characters)
    tenureCommentsPage.characterCountMessage().should('be.visible')
    tenureCommentsPage.characterCountMessage().contains(`You have ${difference} characters remaining`)
})

Then('the warning message tells me I am over by {int}', (characters) => {
    const difference = differenceInCharacters(characters)
    tenureCommentsPage.characterCountErrorMessage().should('be.visible')
    tenureCommentsPage.characterCountErrorMessage().contains(`You have ${difference} characters too many`)
})

Then('a validation error occurs', () => {
    tenureCommentsPage.addCommentsError().should('be.visible')
    tenureCommentsPage.commentDescriptionError().should('be.visible')
})

function differenceInCharacters(characters) {
    return Math.abs(500-characters)
}