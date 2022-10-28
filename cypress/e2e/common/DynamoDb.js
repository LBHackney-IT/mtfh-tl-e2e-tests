import AWS from 'aws-sdk';
import property from "../../../api/property";

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
      if (tableName === "Assets") {
        try {
          const response = await property.getProperty(key.id)
          const asset = response.data;
          if (asset && asset.tenure) {
            const result = await docClient.delete({ TableName: "TenureInformation", Key: { id: asset.tenure.id } })
              .promise();
            console.log(`A record has been deleted from DynamoDb table ${tableName}: `, result)
          }
        } catch (err) {
          console.log(err)
        }
      }

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