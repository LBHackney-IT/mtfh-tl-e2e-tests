import {
  Then,
  And,
  Given,
  defineParameterType,
  When,
} from "cypress-cucumber-preprocessor/steps";

const tenureEndpoint = Cypress.env('DYNAMODB_ENDPOINT')
const region  = Cypress.env('DYNAMODB_REGION')
const accessKeyId = Cypress.env('DYNAMODB_REGION')
const secretAccessKey= Cypress.env('DYNAMODB_SECRET_ACCESS_KEY')



Given("I can access to DynamoDB in AWS", async () => {
  cy.log("Connectingi to DynamoDB....")
  var AWS = require("aws-sdk");
  AWS.config.update({
    region: region,
    endpoint: tenureEndpoint,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });
  var docClient = new AWS.DynamoDB.DocumentClient();
  var id = "7fa8cf84-92ba-4a11-890e-b754b0f58a18"

  deleteOrder(id)

  function deleteOrder(id) {
    return docClient
     .delete({
      TableName: "TenureInformation",
      Key: {
       id: id
      }
     })
     .promise()
     .then(result => {
      console.log("tenure is deleted!", result);
      return result;
     })
     .catch(deleteError => {
      console.log(`tenure is not deleted :(`, deleteError);
      throw deleteError;
     });
   }

});


