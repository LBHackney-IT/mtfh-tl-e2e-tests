const AWS = require('aws-sdk');
const axios = require('axios');

const REGION = 'eu-west-2';

function getDocClient() {
  const accessKeyId = process.env.CYPRESS_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CYPRESS_AWS_SECRET_ACCESS_KEY;
  const sessionToken = process.env.CYPRESS_AWS_SESSION_TOKEN;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'AWS credentials are required for DynamoDB tasks. Set CYPRESS_AWS_ACCESS_KEY_ID and CYPRESS_AWS_SECRET_ACCESS_KEY.',
    );
  }

  AWS.config.update({
    region: REGION,
    accessKeyId,
    secretAccessKey,
    sessionToken,
  });

  return new AWS.DynamoDB.DocumentClient({ region: REGION });
}

async function getProperty(assetId, assetEndpoint, token) {
  try {
    const response = await axios.get(`${assetEndpoint}/assets/${assetId}`, {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: (status) => status < 500,
    });

    if (response.status === 404) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log(`Could not fetch asset ${assetId} during cleanup:`, error.message);
    return null;
  }
}

async function deleteRecord(record, { assetEndpoint, token }) {
  const { tableName, key } = record;
  const docClient = getDocClient();

  try {
    if (tableName === 'Assets') {
      const asset = await getProperty(key.id, assetEndpoint, token);
      if (asset?.tenure) {
        await docClient
          .delete({ TableName: 'TenureInformation', Key: { id: asset.tenure.id } })
          .promise();
      }
    }

    const result = await docClient.delete({ TableName: tableName, Key: key }).promise();
    console.log(`A record has been deleted from DynamoDb table ${tableName}:`, result);
    return result;
  } catch (deleteError) {
    console.log('A record is not deleted:', deleteError);
    throw deleteError;
  }
}

async function createRecord({ tableName, item }) {
  const docClient = getDocClient();

  await docClient
    .put({
      TableName: tableName,
      Item: item,
    })
    .promise();

  return null;
}

function registerDynamoDbTasks(on, getRuntimeConfig) {
  on('task', {
    'dynamoDb:create': createRecord,
    'dynamoDb:delete': (record) => {
      const config = getRuntimeConfig();
      return deleteRecord(record, {
        assetEndpoint: config.env.ASSET_ENDPOINT,
        token: config.gssoTestKey,
      });
    },
  });
}

module.exports = {
  registerDynamoDbTasks,
};
