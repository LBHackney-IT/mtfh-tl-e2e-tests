import AWS from 'aws-sdk';

const deleteRecordFromDynamoDB = async ({tableName, key}) => {
  const accessKeyId = Cypress.env('AWS_ACCESS_KEY_ID')
  const secretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY')
  const sessionToken = Cypress.env('AWS_SESSION_TOKEN')

  AWS.config.update({
    region: 'eu-west-2',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    sessionToken: sessionToken
  });
  
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
}