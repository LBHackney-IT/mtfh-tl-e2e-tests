import { patchRequest, getRequest } from './requests/requests'
import { saveFixtureData } from './helpers'

import { createPersonModel } from './models/requests/createPersonModel'
import { editPersonModel } from './models/requests/editPersonModel'

const personEndpoint =  Cypress.env('PERSON_ENDPOINT')
const url = `${personEndpoint}/persons`
const tableName = "Persons";

const createPerson = () => {
    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'POST',
            body: createPersonModel,
            url,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` }
        }).then(response => {
            saveFixtureData(
                tableName,
                { id: response.body.id },
                response.body,
                response,
            ).then((response) => {
                resolve(response)
            });
        })
    })
}

const createPersonWithNewTenure = (tenureId, dateOfBirth) => {
    const requestModel = createPersonModel
    requestModel.dateOfBirth = dateOfBirth || requestModel.dateOfBirth
    requestModel.tenures[0].id = tenureId
    requestModel.tenures[0].endDate = "2100-07-19T00:00:00"

    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'POST',
            body: requestModel,
            url,
            headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` }
        }).then((response) => {
            saveFixtureData(
                tableName,
                { id: response.body.id },
                response.body,
                response,
            ).then((response) => {
                resolve(response)
            });
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
    createPersonWithNewTenure,
    editPerson,
    viewPerson
}