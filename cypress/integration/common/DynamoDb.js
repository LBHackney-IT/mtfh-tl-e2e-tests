
const accessKeyId = Cypress.env('AWS_ACCESS_KEY_ID')
const secretAccessKey= Cypress.env('AWS_SECRET_ACCESS_KEY')
const AWS = require("aws-sdk");

const deleteRecordFromDynamoDB = async (tableName, id)=>{
    AWS.config.update({
      region: 'eu-west-2',
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    });

  var docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});

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