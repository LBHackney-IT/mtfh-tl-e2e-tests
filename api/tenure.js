import { getRequest, postRequest, patchRequest, deleteRequest } from './requests/requests'
import { createTenureModel as _createTenureModel, secureTenureModel } from "./models/requests/addTenureModel";
import { saveFixtureData } from './helpers'
import person from "./person";

const tenureEndpoint = Cypress.env('TENURE_ENDPOINT')
const editTenureModel = {tenureType: {code: "", description: ""}, endOfTenureDate: null}
const tableName = "TenureInformation";

const getTenure = async(tenureId) => {
    const response = await getRequest(`${tenureEndpoint}/tenures/${tenureId}`)
    return response
}

const createTenure = async(tenureTypeCode) => {
    let tenureModel = _createTenureModel
    if (tenureTypeCode === "SEC") {
        tenureModel = secureTenureModel;
    }
    return new Promise((resolve, reject) => {
        cy.postRequest(`${tenureEndpoint}/tenures/`, tenureModel).then(response => {
            saveFixtureData(tableName, { id: response.data.id }, response.data);
            resolve(response);
        })
    });
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

const addPersonToTenure = async(tenureId, isResponsible, ifMatch) => {
    const { id: personId, firstName, surname } = (await person.createPersonWithNewTenure(tenureId, "2000-01-01")).data
    const response = await patchRequest(
      `${tenureEndpoint}/tenures/${tenureId}/person/${personId}`,
      { fullName: `${firstName} ${surname}`, personTenureType: "Tenant", isResponsible },
      ifMatch
    )
    return response
}

export default {
    addPersonToTenure,
    getTenure,
    editTenure,
    deleteTenure,
    createTenure,
    createTenureWithStartDate,
    createTenureWithNoOtherResponsibleHouseholdMembers
}