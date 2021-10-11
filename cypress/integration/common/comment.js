import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import TenureCommentsPageObjects from '../../pageObjects/tenureCommentsPage';
import helperText from '../../helpers/inputText'
import commentTitle from "../../helpers/commentText"

const tenureCommentsPage = new TenureCommentsPageObjects()
const envConfig = require('../../../environment-config');

let validationMessageField = ""
let tenureId =""

// Given('I am on the create comment page for {string} {string}', (commentType, id) => {
//     console.log('commentType and id',commentType, id)
//     switch (commentType) {
//         case "tenures":
//             tenureCommentsPage.visit(id)
//             tenureId = id    
//         break;
        
//         case "person":
//         break;
  
//         default:
//         break;
//     }
//   })

// Given('test', () => {
//     switch (commentType) {
//         case "tenant":
//             tenureCommentsPage.visit(id)
//             tenureId = id    
//         break;
        
//         case "person":
//         break;

//         default:
//         break;
//     }
// })
