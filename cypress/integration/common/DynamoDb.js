import { DynamoDB } from 'aws-sdk'

const deleteRecordFromDynamoDB = async ({tableName, key}) => {
  const accessKeyId = Cypress.env('AWS_ACCESS_KEY_ID')
  const secretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY')
  const sessionToken = Cypress.env('AWS_SESSION_TOKEN')

  const docClient = new DynamoDB.DocumentClient({
    region: 'eu-west-2',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    sessionToken: sessionToken,
  })

  deleteRecord(tableName, key)

  async function deleteRecord(tableName, key) {
    try {
        const result_1 = await docClient
            .delete({
                    TableName: tableName,
                    Key: key,
                    })
            .promise()

        console.log(`A record has been deleted from DynamoDb table ${tableName}: `, result_1,)
        return result_1
    } catch (deleteError) {
        console.log('A record is not deleted: ', deleteError)
        throw deleteError
    }
  }
}

export default {
  deleteRecordFromDynamoDB,
}
