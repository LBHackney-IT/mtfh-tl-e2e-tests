import {
  Then,
  And,
  Given,
  defineParameterType,
  When,
} from "cypress-cucumber-preprocessor/steps";



Given("I can access to DynamoDB in AWS", async () => {
  cy.log("Connectingi to DynamoDB....")
  var AWS = require("aws-sdk");
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "localKey",
    secretAccessKey: "localSecret"
  });
  var tableName = "TenureInformation"
  var docClient = new AWS.DynamoDB.DocumentClient();
  var id = "60a6c8fc-3267-4c99-ae71-a159f6f87b28"
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


