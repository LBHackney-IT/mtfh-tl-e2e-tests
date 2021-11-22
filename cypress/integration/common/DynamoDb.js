
const accessKeyId = Cypress.env('AWS_ACCESS_KEY_ID')
const secretAccessKey= Cypress.env('AWS_SECRET_ACCESS_KEY')
const AWS = require("aws-sdk");

const deleteRecordFromDynamoDB = async (tableName, id)=>{
  var docClient = new AWS.DynamoDB.DocumentClient();

  AWS.config.update({
    region: 'eu-west-2',
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
    console.log("A record is deleted from DynamoDb: ", result);
    return result;
    })
    .catch(deleteError => {
    console.log("A record is not deleted: ", deleteError);
    throw deleteError;
    });
}
}

const conditionallyRemoveAttachedTenuresFromDynamoDB = async (id) => {

  var docClient = new AWS.DynamoDB.DocumentClient();

  AWS.config.update({
    region: 'eu-west-2',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });

  updateRecord(id)

  function updateRecord(id) {
    return docClient
    .update({
      TableName: "Assets",
      Key: {
        id: id
      },
      UpdateExpression: "SET tenure = Null",
      ConditionExpression: "tenure = Null"
    })
    .promise()
    .then(result => {
      console.log("The tenure(s) have been removed: ", result);
      return result;
    })
    .catch(deleteError => {
      console.log("The tenure(s) have not been removed: ", deleteError);
      throw deleteError;
    })
  }
}

module.exports = {
  conditionallyRemoveAttachedTenuresFromDynamoDB,
  deleteRecordFromDynamoDB
}