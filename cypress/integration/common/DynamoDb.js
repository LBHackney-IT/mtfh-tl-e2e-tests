
const accessKeyId = Cypress.env('DYNAMODB_ACCESS_KEY')
const secretAccessKey= Cypress.env('DYNAMODB_SECRET_ACCESS_KEY')
const AWS = require("aws-sdk");

const deleteRecordFromDynamoDB = async (tableName, id)=>{
    var docClient = new AWS.DynamoDB.DocumentClient();
  
    AWS.config.update({
      region: 'eu-west-2',
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    });

    AWS.config.getCredentials(function(err) {
      if (err) console.log(err.stack);
      // credentials not loaded
      else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
      }ij
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
      console.log("A record is deleted from DynamoDb: ", result);
      return result;
      })
      .catch(deleteError => {
      console.log("A record is not deleted: ", deleteError);
      throw deleteError;
      });
  }
}

module.exports = {
  deleteRecordFromDynamoDB
}