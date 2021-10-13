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