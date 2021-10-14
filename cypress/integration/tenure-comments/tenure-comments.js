// import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
// import TenureCommentsPageObjects from '../../pageObjects/tenureCommentsPage'
// import helperText from '../../helpers/inputText'
// import commentTitle from "../../helpers/commentText"

// const tenureCommentsPage = new TenureCommentsPageObjects()
// const envConfig = require('../../../environment-config');

// let validationMessageField = ""
// let tenureId =""

// // Given('I am on the create comment for a tenure page {string}', (tenure) => {
// //     tenureCommentsPage.visit(tenure)
// //     tenureId = tenure
// // })

// // Then('the create comment for a tenure components are displayed',  () => {
// //     tenureCommentsPage.tenureCommentsComponentsAreDisplayed()
// // })

// // When('I enter a valid title',  () => {
// //     tenureCommentsPage.addCommentTitleField().type(commentTitle.commentTitle)
// // })

// // When('I enter {int} characters into the comment field', (characters) => {
// //     function truncateString(str, num) {
// //         if (str.length <= num) {
// //           return str
// //         }
// //         return str.toString().slice(0, num)
// //       }

// //     const inputText = truncateString(helperText.helperText, characters)
// //     tenureCommentsPage.commentContainer().type(inputText)
// // })

// // When('I select a comment category {string}',  (category) => {
// //     tenureCommentsPage.addCommentCategoryField().select(category)
// // })

// // When('I do not fill the mandatory fields:{string} {string} {string}',  (commentTitle, commentDescription, commentCategory ) => {
// //     if (commentTitle === "")
// //         {
// //             tenureCommentsPage.commentContainer().type(commentDescription);
// //             tenureCommentsPage.addCommentCategoryField().select(commentCategory)
// //             validationMessageField = "commentTitle"
            
// //         }
// //     else if(commentDescription === "")
// //         {
// //             tenureCommentsPage.addCommentTitleField().type(commentTitle)
// //             tenureCommentsPage.addCommentCategoryField().select(commentCategory)
// //             validationMessageField = "commentDescription"
  
// //         }
// //     else if (commentCategory === "")
// //         {
// //             tenureCommentsPage.addCommentTitleField().type(commentTitle)
// //             tenureCommentsPage.commentContainer().type(commentDescription)
// //             validationMessageField = "commentCategory"

// //         }
// // })
// // When('I click the Discard comment link',  () => {
// //     tenureCommentsPage.discardCommentLink().click()
// // })

// // Then('I can see the cancellation pop up for comment',  () => {
// //     tenureCommentsPage.cancellationPopUpWindow().contains('Are you sure you wish to cancel adding this comment?')
// // })

// // Then('I can cancel the comment',  () => {
// //    tenureCommentsPage.cancellationYesButton().contains('Yes').click()
// //     cy.url().should('eq', `${envConfig.baseUrl}/${envConfig.tenureUrl}/${tenureId}`)
// // })

// // Then('the number of characters remaining is correct {int}', (characters) => {
// //     const difference = differenceInCharacters(characters)
// //     tenureCommentsPage.characterCountMessage().should('be.visible')
// //     tenureCommentsPage.characterCountMessage().contains(`You have ${difference} characters remaining`)
// // })

// // Then('the warning message tells me I am over by {int}', (characters) => {
// //     const difference = differenceInCharacters(characters)
// //     tenureCommentsPage.characterCountErrorMessage().should('be.visible')
// //     tenureCommentsPage.characterCountErrorMessage().contains(`You have ${difference} characters too many`)
// // })

// // Then('a validation error occurs', () => {
// //     tenureCommentsPage.addCommentsError().should('be.visible')
// //     tenureCommentsPage.commentDescriptionError().should('be.visible')
// // })

// // Then ('I can see a specific validation message for the field {string}',(validationMessage)=>{
// //     if (validationMessageField == "commentTitle") 
// //     {
// //         tenureCommentsPage.addCommentTitleError().contains(validationMessage)
// //     }
// //     else if(validationMessageField == "commentDescription")
// //     {
// //         tenureCommentsPage.commentDescriptionError().contains(validationMessage)
// //     }
// //     else if (validationMessageField == "commentCategory")
// //     {
// //         tenureCommentsPage.addCommentCategoryError().contains(validationMessage)
// //     }
// // })

// function differenceInCharacters(characters) {
//     return Math.abs(500-characters)
// }