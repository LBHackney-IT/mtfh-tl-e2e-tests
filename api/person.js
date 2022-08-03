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

const createPersonWithNewTenure = async (tenureId) => {
    const requestModel = createPersonModel
    requestModel.tenures.id = tenureId

    const response = await postRequest(url, requestModel)
    
    const responseData = response.data;
    saveFixtureData(tableName, { id: responseData.id }, responseData);
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