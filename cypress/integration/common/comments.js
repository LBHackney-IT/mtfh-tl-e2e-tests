import { Given, Then, When } from "cypress-cucumber-preprocessor/steps"
import TenureCommentsPageObjects from '../../pageObjects/tenureCommentsPage'
import PersonCommentsPageObjects from "../../pageObjects/personCommentsPage"
import TenurePageObjects from "../../pageObjects/tenurePage"
import PersonPageObjects from "../../pageObjects/personPage"
import helperText from '../../helpers/inputText'
import commentTitle from "../../helpers/commentText"
import comment from "../../helpers/commentText"
import category from "../../helpers/commentText"

const tenureCommentsPage = new TenureCommentsPageObjects()
const personCommentsPage = new PersonCommentsPageObjects()
const tenurePage = new TenurePageObjects()
const personPage = new PersonPageObjects()
const envConfig = require('../../../environment-config')

let tenureId = ""
let personId = ""
let uniqueText =(Math.random() + 1).toString(10).substring(5)
let commentGroup=""
let validationMessageField = ""

Given('I am on the create comment page for {string} {string}', (commentType, id) => {
    commentGroup = commentType
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.visit(id)
            tenureId = id    
            break;
        case "person":
            personCommentsPage.visit(id)
            personId = id
            break;
        default:
            break;
    }
})

When('I enter a valid title',  () => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.addCommentTitleField().type(commentTitle.commentTitle)
            break;
        case "person":
            personCommentsPage.addCommentTitleField().type(commentTitle.commentTitle)
            break;
        default:
            break;
    }
})

When('I select a checkbox for {string}', (checkbox) => {
    switch (commentGroup) {
        case "tenure":    
            tenureCommentsPage.Commentcheckbox(checkbox).check()
            break;
        case "person":
            personCommentsPage.Commentcheckbox(checkbox).check()
            break;
        default:
            break;
    }
})

When('I enter a valid comment', () => {
    switch (commentGroup) {
        case "tenure":    
            tenureCommentsPage.commentContainer().type(comment.comment);
            break;
        case "person":
            personCommentsPage.commentContainer().type(comment.comment);
            break;
        default:
            break;
    }
})

When('I select a comment category {string}',  (category) => {
    switch (commentGroup) {
        case "tenure":    
            tenureCommentsPage.addCommentCategoryField().select(category)
            break;
        case "person":
            personCommentsPage.addCommentCategoryField().select(category)
            break;
        default:
            break;
    }
})

When('I create a comment', () => {
    switch (commentGroup) {
        case "tenure":    
            tenureCommentsPage.addCommentTitleField().type(commentTitle.commentTitle + ' : ' + uniqueText)
            tenureCommentsPage.commentFormDescription().type(comment.comment + ' : '+ uniqueText)
            tenureCommentsPage.addCommentCategoryField().select(category.category)
            tenureCommentsPage.submitCommentButton().click()
            break;
        case "person":
            personCommentsPage.addCommentTitleField().type(commentTitle.commentTitle + ' : ' + uniqueText)
            personCommentsPage.commentFormDescription().type(comment.comment + ' : '+ uniqueText)
            personCommentsPage.addCommentCategoryField().select(category.category)
            personCommentsPage.submitCommentButton().click()
            break;
        default:
            break;
    }
})

Then('I click the save comment button', () => {
    switch (commentGroup) {
        case "tenure":    
            tenureCommentsPage.submitCommentButton().click();
            break;
        case "person":
            personCommentsPage.submitCommentButton().click();
            break;
        default:
            break;
    }
})

Then('the comment is submitted', () => {
    switch (commentGroup) {
        case "tenure":    
            tenureCommentsPage.pageAnnouncementHeader().should("be.visible");
            tenureCommentsPage.pageAnnouncementHeader().contains("Comment successfully saved");  
            break;
        case "person":
            personCommentsPage.pageAnnouncementHeader().should("be.visible");
            personCommentsPage.pageAnnouncementHeader().contains("Comment successfully saved");            
            break;
        default:
            break;
    }
})

Then('I can see the same comments in the linked entities', () => {
    switch (commentGroup) {
        case "tenure":    
            tenurePage.comment().contains(uniqueText)
            tenurePage.viewResidentButton().click()
            personPage.comment().contains(uniqueText)
            break;
        case "person":
            personPage.comment().contains(uniqueText)
            personPage.viewTenureButton().click()
            tenurePage.comment().contains(uniqueText)
            break;
        default:
            break;
    }
})

Then('the create comment for a person components are displayed', () => {
    switch (commentGroup) {
        case "tenure":    
            tenureCommentsPage.addCommentForm().should('be.visible')
            tenureCommentsPage.submitCommentButton().should('be.visible')
            break;
        case "person":
            personCommentsPage.addCommentForm().should('be.visible')
            personCommentsPage.submitCommentButton().should('be.visible')
        default:
            break;
    }  
})

// Field validation related steps
When('I enter {int} characters into the comment field', (characters) => {
    const inputText = truncateString(helperText.helperText, characters)
    switch (commentGroup) {
        case "tenure":    
            tenureCommentsPage.commentContainer().type(inputText)
            break;
        case "person":
            personCommentsPage.commentContainer().type(inputText)
            break;
        default:
            break;
    }
})

When('I do not fill the mandatory fields:{string} {string} {string}',  (commentTitle, commentDescription, commentCategory ) => {
    
    switch (commentGroup) {
        case "tenure":    
        if (commentTitle === "")
            {
                tenureCommentsPage.commentContainer().type(commentDescription);
                tenureCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentTitle"
                
            }
        else if(commentDescription === "")
            {
                tenureCommentsPage.addCommentTitleField().type(commentTitle)
                tenureCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentDescription"
    
            }
        else if (commentCategory === "")
            {
                tenureCommentsPage.addCommentTitleField().type(commentTitle)
                tenureCommentsPage.commentContainer().type(commentDescription)
                validationMessageField = "commentCategory"
            }
        break;
        case "person":
            if (commentTitle === "")
            {
                personCommentsPage.commentContainer().type(commentDescription);
                personCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentTitle"
                
            }
        else if(commentDescription === "")
            {
                personCommentsPage.addCommentTitleField().type(commentTitle)
                personCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentDescription"
    
            }
        else if (commentCategory === "") 
            {
                personCommentsPage.addCommentTitleField().type(commentTitle)
                personCommentsPage.commentContainer().type(commentDescription)
                validationMessageField = "commentCategory"
            }
        default:
            break;
    }
    
    
    
    
    if (commentTitle === "")
        {
            tenureCommentsPage.commentContainer().type(commentDescription);
            tenureCommentsPage.addCommentCategoryField().select(commentCategory)
            validationMessageField = "commentTitle"
            
        }
    else if(commentDescription === "")
        {
            tenureCommentsPage.addCommentTitleField().type(commentTitle)
            tenureCommentsPage.addCommentCategoryField().select(commentCategory)
            validationMessageField = "commentDescription"
  
        }
    else if (commentCategory === "")
        {
            tenureCommentsPage.addCommentTitleField().type(commentTitle)
            tenureCommentsPage.commentContainer().type(commentDescription)
            validationMessageField = "commentCategory"
        }
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
    personCommentsPage.commentDescriptionError().should('be.visible')
})

function differenceInCharacters(characters) {
    return Math.abs(500-characters)
}

function truncateString(str, num) {
    if (str.length <= num) {
    return str
    }
    return str.toString().slice(0, num)
}