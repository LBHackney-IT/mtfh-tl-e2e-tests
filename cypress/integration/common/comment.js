import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import TenureCommentsPageObjects from '../../pageObjects/tenureCommentsPage';
import helperText from '../../helpers/inputText'
import commentTitle from "../../helpers/commentText"
import comment from "../../helpers/commentText"
import category from "../../helpers/commentText";

const tenureCommentsPage = new TenureCommentsPageObjects()
const envConfig = require('../../../environment-config');

let validationMessageField = ""
let tenureId =""


let uniqueText =(Math.random() + 1).toString(10).substring(5);



Given('I am on the create comment page for {string} {string}', (commentType, id) => {
    switch (commentType) {
        case "tenure":
            tenureCommentsPage.visit(id)
            tenureId = id    
        break;
        case "person":
            //update here later
        break;
  
        default:
        break;
    }
  })
  
  When('I select a checkbox for {string}', (checkbox) => {
    tenureCommentsPage.Commentcheckbox(checkbox).check()
  })

  When('I create a comment', () => {
    tenureCommentsPage.addCommentTitleField().type(commentTitle.commentTitle + ' : ' + uniqueText)
    tenureCommentsPage.commentFormDescription().type(comment.comment + ' : '+ uniqueText)
    tenureCommentsPage.addCommentCategoryField().select(category.category)
  })