import { patchRequest, getRequest } from './requests/requests'
import { saveFixtureData } from './helpers'

import { createPersonModel } from './models/requests/createPersonModel'
import { editPersonModel } from './models/requests/editPersonModel'

const personEndpoint =  Cypress.env('PERSON_ENDPOINT')
const url = `${personEndpoint}/persons`
const tableName = "Persons";

const createPerson = () => {
    return new Promise((resolve, reject) => {
        cy.postRequest(url, createPersonModel).then(response => {
            saveFixtureData(tableName, { id: response.data.id }, response.data);
            resolve(response);
        })
    });
}

export const createPersonWithNewTenure = async (tenureId, dateOfBirth) => {
    const requestModel = createPersonModel
    requestModel.dateOfBirth = dateOfBirth || requestModel.dateOfBirth
    requestModel.tenures[0].id = tenureId
    requestModel.tenures[0].endDate = "2100-07-19T00:00:00"

    return new Promise((resolve, reject) => {
        cy.postRequest(url, requestModel).then(response => {
            saveFixtureData(tableName, { id: response.data.id }, response.data);
            resolve(response);
        })
    });
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
    editPerson,
    viewPerson
}