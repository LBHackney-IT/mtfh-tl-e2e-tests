import { postRequest, patchRequest, getRequest } from './requests/requests'
import { saveFixtureData } from './helpers'

import { createPersonModel } from './models/requests/createPersonModel'
import { editPersonModel } from './models/requests/editPersonModel'

const personEndpoint =  Cypress.env('PERSON_ENDPOINT')
const url = `${personEndpoint}/persons`
const tableName = "Persons";

const createPerson = async () => {
    const response = await postRequest(url, createPersonModel);

    const responseData = response.data;
    saveFixtureData(tableName, { id: responseData.id }, responseData);
    return response;
}

const createPersonWithNewTenure = async (tenureId, dateOfBirth) => {
    const requestModel = createPersonModel
    requestModel.dateOfBirth = dateOfBirth || requestModel.dateOfBirth
    requestModel.tenures[0].id = tenureId
    requestModel.tenures[0].endDate = "2100-07-19T00:00:00"

    const response = await postRequest(url, requestModel)
    
    const responseData = response.data;
    saveFixtureData(tableName, { id: responseData.id }, responseData);
    cy.log(responseData.id)
    return response
}

const editPerson = async (personId) => {
    const response = await patchRequest(`${url}/${personId}`, editPersonModel)
    return response
}

const viewPerson = (personId) => {
    const response = getRequest(`${url}/${personId}`)
    return response
}

export default {
    createPerson,
    createPersonWithNewTenure,
    editPerson,
    viewPerson
}