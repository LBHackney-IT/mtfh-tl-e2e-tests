import AWS from 'aws-sdk';
import property from "../../../api/property";
import { saveFixtureData } from "../../../api/helpers";

const REGION = "eu-west-2"
const accessKeyId = Cypress.env('AWS_ACCESS_KEY_ID')
const secretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY')
const sessionToken = Cypress.env('AWS_SESSION_TOKEN')

AWS.config.update({
  region: REGION,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  sessionToken: sessionToken
});

const docClient = new AWS.DynamoDB.DocumentClient({region: REGION});

const deleteRecord = async ({tableName, key}) => {
    try {
      if (tableName === "Assets") {
        const response = await property.getProperty(key.id)
        const asset = response.data;
        if (asset && asset.tenure) {
          const result = await docClient.delete({ TableName: "TenureInformation", Key: { id: asset.tenure.id } })
            .promise();
          console.log(`A record has been deleted from DynamoDb table ${tableName}: `, result)
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

const createRecord = (tableName, item) => new Promise((resolve, reject) => {
  docClient.put({
    TableName: tableName,
    Item: item
  }, (err, data) => {
    if (err) {
      reject(err);
    } else {
      saveFixtureData(
        tableName,
        { id: item.id },
        item,
      ).then((data) => {
        resolve(data)
      });
    }
  })
})

export default {
  deleteRecord,
  createRecord,
}