import { patchRequest, getRequest } from './requests/requests'
import { saveFixtureData } from './helpers'
import { endpoint } from '../cypress/support/endpoints'

import { createPersonModel } from './models/requests/createPersonModel'
import { editPersonModel } from './models/requests/editPersonModel'

const personsUrl = () => `${endpoint('PERSON_ENDPOINT')}/persons`
const tableName = "Persons";

const createPerson = () => {
    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'POST',
            body: createPersonModel,
            url: personsUrl(),
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
            url: personsUrl(),
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` }
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

export const editPerson = async (personId) => {
    const response = await patchRequest(`${personsUrl()}/${personId}`, editPersonModel)
    return response
}

const viewPerson = (personId) => {
    const response = getRequest(`${personsUrl()}/${personId}`)
    return response
}

export default {
    createPerson,
    createPersonWithNewTenure,
    editPerson,
    viewPerson
}