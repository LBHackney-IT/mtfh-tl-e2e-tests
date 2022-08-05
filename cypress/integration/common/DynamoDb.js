import AWS from "aws-sdk";

export const deleteRecordFromDynamoDB = async ({tableName, key}) => {
  
  AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack); // credentials not loaded
  })
  
  const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});
  
  try {
      const result = await docClient.delete({ TableName: tableName, Key: key })
                                    .promise();
      console.log(`A record has been deleted from DynamoDb table ${tableName}: `, result)
      return result;

  } catch (deleteError) {
      console.log('A record is not deleted: ', deleteError)
      throw deleteError
  }
}

export default { 
  deleteRecordFromDynamoDB
};