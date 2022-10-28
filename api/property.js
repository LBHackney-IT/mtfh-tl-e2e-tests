import { getRequest, postRequest } from "./requests/requests";
import { saveFixtureData } from './helpers'
import { createAssetModel } from "./models/requests/createAssetModel";
import dynamoDb from "../cypress/e2e/common/DynamoDb";

const assetEndpoint = Cypress.env('ASSET_ENDPOINT')
const tableName = "Assets";

const getProperty = async(propertyId) => {
  const response = await getRequest(`${assetEndpoint}/assets/${propertyId}`);
  return response
}

const createProperty = async (type) => {
  let propertyModel = createAssetModel
  propertyModel.assetType = type || propertyModel.assetType

  return new Promise((resolve, reject) => {
    cy.postRequest(`${assetEndpoint}/assets/`, propertyModel).then(response => {
      saveFixtureData(tableName, { id: response.data.id }, response.data).then(() => {
        resolve(response)
      });
    })
  })
}

const createPropertyWithTenure = async() => {
  let propertyModel = createAssetModel
  createAssetModel.tenure = {
    "id": "123",
    "fullAddress": "Test E2E Street"
  }
  const response = await postRequest(`${assetEndpoint}/assets/`, propertyModel)

  saveFixtureData(tableName, { id: response.data.id }, response.data);
  return response;
}

export default {
  createProperty,
  createPropertyWithTenure,
  getProperty
}