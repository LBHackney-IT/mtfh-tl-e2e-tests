
const tenureEndpoint = Cypress.env('DYNAMODB_ENDPOINT')
const region  = Cypress.env('DYNAMODB_REGION')
const accessKeyId = Cypress.env('DYNAMODB_REGION')
const secretAccessKey= Cypress.env('DYNAMODB_SECRET_ACCESS_KEY')
// const fs = require('fs')

const deleteRecordFromDynamoDB = async (tableName, id)=>{
  var AWS = require("aws-sdk");
  AWS.config.update({
    region: region,
    endpoint: tenureEndpoint,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });
  var docClient = new AWS.DynamoDB.DocumentClient();

  deleteRecord(id)

  function deleteRecord(id) {
    return docClient
      .delete({
      TableName: tableName,
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
}

module.exports = {
  deleteRecordFromDynamoDB,
}