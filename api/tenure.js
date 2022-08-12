import { getRequest, postRequest, patchRequest, deleteRequest } from './requests/requests'
import { createTenureModel as _createTenureModel } from './models/requests/addTenureModel'
import { saveFixtureData } from './helpers'

const tenureEndpoint = Cypress.env('TENURE_ENDPOINT')
const editTenureModel = {tenureType: {code: "", description: ""}, endOfTenureDate: null}
const tableName = "TenureInformation";

const getTenure = async(tenureId) => {
    const response = await getRequest(`${tenureEndpoint}/tenures/${tenureId}`)
    return response
}

const createTenure = async() => {
    const response = await postRequest(`${tenureEndpoint}/tenures/`, _createTenureModel)
    
    const responseData = response.data;
    saveFixtureData(tableName, { id: responseData.id }, responseData);
    return response;
}

const createTenureWithNoOtherResponsibleHouseholdMembers = async() => {
    const requestModel = _createTenureModel
    requestModel.householdMembers[1].isResponsible = true
    const response = await postRequest(`${tenureEndpoint}/tenures/`, requestModel)
    
    const responseData = response.data;
    saveFixtureData(tableName, { id: responseData.id }, responseData);
    return response
}

const createTenureWithStartDate = async(startOfTenureDate) => {
    const requestModel = _createTenureModel
    requestModel.startOfTenureDate =startOfTenureDate
    const response = await postRequest(`${tenureEndpoint}/tenures/`, requestModel)
    
    const responseData = response.data;
    saveFixtureData(tableName, { id: responseData.id }, responseData);
    return response
}

const editTenure = async(tenureId, tenureType, ifMatch) => {
    editTenureModel.tenureType.code = tenureType.substring(0,2).toUpperCase()
    editTenureModel.tenureType.description = tenureType
    const response = await patchRequest(`${tenureEndpoint}/tenures/${tenureId}`, editTenureModel, ifMatch)
    return response
}

const deleteTenure = async(tenureId, personId) => {
    const response = await deleteRequest(`${tenureEndpoint}/tenures/${tenureId}/person/${personId}`)
    return response
}

export default {
    getTenure,
    editTenure,
    deleteTenure,
    createTenure,
    createTenureWithStartDate,
    createTenureWithNoOtherResponsibleHouseholdMembers
}