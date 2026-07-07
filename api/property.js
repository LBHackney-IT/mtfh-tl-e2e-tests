import { getRequest, postRequest } from "./requests/requests";
import { saveFixtureData } from './helpers'
import { createAssetModel } from "./models/requests/createAssetModel";
import { endpoint } from '../cypress/support/endpoints'

const assetsUrl = () => `${endpoint('ASSET_ENDPOINT')}/assets`
const tableName = "Assets";

const getProperty = async(propertyId) => {
  const response = await getRequest(`${assetsUrl()}/${propertyId}`);
  return response
}

const createProperty = async(type) => {
  let propertyModel = createAssetModel
  propertyModel.assetType = type || propertyModel.assetType
  const response = await postRequest(`${assetsUrl()}/`, propertyModel)

  saveFixtureData(tableName, { id: response.data.id }, response.data);
  return response;
}

const createPropertyWithTenure = async() => {
  let propertyModel = createAssetModel
  createAssetModel.tenure = {
    "id": "123",
      "fullAddress": "Test E2E Street"
  }
  const response = await postRequest(`${assetsUrl()}/`, propertyModel)

  saveFixtureData(tableName, { id: response.data.id }, response.data);
  return response;
}

export default {
  createProperty,
  createPropertyWithTenure,
  getProperty
}
