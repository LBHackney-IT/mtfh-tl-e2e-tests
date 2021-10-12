import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import TenureCommentsPageObjects from '../../pageObjects/tenureCommentsPage';
import helperText from '../../helpers/inputText'
import commentTitle from "../../helpers/commentText"

const tenureCommentsPage = new TenureCommentsPageObjects()
const envConfig = require('../../../environment-config');

let validationMessageField = ""
let tenureId =""

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