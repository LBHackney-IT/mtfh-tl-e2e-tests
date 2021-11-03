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
    endpoint: "http://localhost:8000"
  });
  var tableName = "TenureInformation"
  var docClient = new AWS.DynamoDB.DocumentClient();
});



// function deleteOrder(orderId) {
//   return docClient
//    .delete({
//     TableName: "pizza-orders",
//     Key: {
//      orderId: orderId
//     }
//    })
//    .promise()
//    .then(result => {
//     console.log("Order is deleted!", result);
//     return result;
//    })
//    .catch(deleteError => {
//     console.log(`Oops, order is not deleted :(`, deleteError);
//     throw deleteError;
//    });
//  }