import { getRequest, postRequest } from "./requests/requests";
import { saveFixtureData } from './helpers'
import { createAssetModel } from "./models/requests/createAssetModel";

const assetEndpoint = Cypress.env('ASSET_ENDPOINT')
const tableName = "Assets";

const getProperty = async(propertyId) => {
  const response = await getRequest(`${assetEndpoint}/assets/${propertyId}`);
  return response
}

const createProperty = async() => {
  let propertyModel = createAssetModel
  const response = await postRequest(`${assetEndpoint}/assets/`, propertyModel)

  saveFixtureData(tableName, { id: response.data.id }, response.data);
  return response;
}

export default {
  createProperty,
  getProperty
}