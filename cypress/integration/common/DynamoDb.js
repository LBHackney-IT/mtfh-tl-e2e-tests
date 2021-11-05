
const tenureEndpoint = Cypress.env('DYNAMODB_ENDPOINT')
const region  = Cypress.env('DYNAMODB_REGION')
const accessKeyId = Cypress.env('DYNAMODB_REGION')
const secretAccessKey= Cypress.env('DYNAMODB_SECRET_ACCESS_KEY')
const AWS = require("aws-sdk");

const deleteRecordFromDynamoDB = async (tableName, id)=>{
    var docClient = new AWS.DynamoDB.DocumentClient();
    AWS.config.update({
      region: region,
      endpoint: tenureEndpoint,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    });

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
      console.log("Id is deleted from DynamoDb: ", result);
      return result;
      })
      .catch(deleteError => {
      console.log("Id is not deleted: ", deleteError);
      throw deleteError;
      });
  }
}

module.exports = {
  deleteRecordFromDynamoDB
}