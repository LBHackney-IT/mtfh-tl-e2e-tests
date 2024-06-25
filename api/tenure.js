import { postRequest, patchRequest, deleteRequest } from './requests/requests'
import { createTenureModel as _createTenureModel, secureTenureModel } from "./models/requests/addTenureModel";
import { saveFixtureData } from './helpers'
import person from "./person";

const tenureEndpoint = Cypress.env('TENURE_ENDPOINT')
const editTenureModel = {tenureType: {code: "", description: ""}, endOfTenureDate: null}
const tableName = "TenureInformation";

export const getTenure = (tenureId) => {
    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'GET',
            url: `${tenureEndpoint}/tenures/${tenureId}`,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` }
        }).then(response => {
            resolve(response)
        })
    });
}

export const createTenure = (tenureTypeCode) => {
    let tenureModel = _createTenureModel
    if (tenureTypeCode === "SEC") {
        tenureModel = secureTenureModel;
    }

    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'POST',
            body: tenureModel,
            url: `${tenureEndpoint}/tenures/`,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` }
        }).then(response => {
            saveFixtureData(
                tableName,
                { id: response.body.id },
                response.body,
                response
            ).then((response) => {
                resolve(response)
            });
        })
    })
}

export const createTenureWithNoOtherResponsibleHouseholdMembers = async() => {
    const requestModel = _createTenureModel
    requestModel.householdMembers[1].isResponsible = true
    const response = await postRequest(`${tenureEndpoint}/tenures/`, requestModel)
    
    const responseData = response.data;
    saveFixtureData(tableName, { id: responseData.id }, responseData);
    return response
}

export const createTenureWithStartDate = (startOfTenureDate) => {
    const requestModel = _createTenureModel
    requestModel.startOfTenureDate = startOfTenureDate

    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'POST',
            body: requestModel,
            url: `${tenureEndpoint}/tenures/`,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` }
        }).then(response => {
            saveFixtureData(
                tableName,
                { id: response.body.id },
                response.body,
                response
            ).then((response) => {
                resolve(response)
            });
        })
    })
}

export const editTenure = async (tenureId, tenureType, ifMatch) => {
    editTenureModel.tenureType.code = tenureType.substring(0,2).toUpperCase()
    editTenureModel.tenureType.description = tenureType

    const response = await patchRequest(`${tenureEndpoint}/tenures/${tenureId}`, editTenureModel, ifMatch)
    return response
}

export const deleteTenure = async(tenureId, personId) => {
    const response = await deleteRequest(`${tenureEndpoint}/tenures/${tenureId}/person/${personId}`)
    return response
}

export const addPersonToTenure = (tenureId, isResponsible, ifMatch) => {
    return new Cypress.Promise((resolve) => {
        person.createPersonWithNewTenure(tenureId, "2000-01-01").then(({ body }) => {
            const { id: personId, firstName, surname } = body;
            cy.request({
                method: 'PATCH',
                body: { fullName: `${firstName} ${surname}`, personTenureType: "Tenant", isResponsible },
                url: `${tenureEndpoint}/tenures/${tenureId}/person/${personId}`,
                headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}`, 'If-Match': ifMatch }
            }).then(response => {
                resolve(response)
            })
        })
    })
}
