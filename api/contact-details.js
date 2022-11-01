import { getRequest, deleteRequest, postRequest } from './requests/requests'
import { saveFixtureData } from './helpers'

const endpoint = Cypress.env('CONTACT_DETAILS_ENDPOINT')
import { addContactModel } from './models/requests/addContactModel'
import envConfig from "../environment-config";

const tableName = "ContactDetails";

const getContactDetails = (personId) => {
    return new Cypress.Promise((resolve, reject) => {
        cy.request({
            method: 'GET',
            url: `${endpoint}/contactDetails?targetId=${personId}`,
            headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` },
            failOnStatusCode: false
        }).then(response => {
            resolve(response)
        })
    });
}

const deleteContactDetails = (contactDetailsId, targetId) => {
    return new Cypress.Promise((resolve, reject) => {
        cy.request({
            method: 'DELETE',
            url: `${endpoint}/contactDetails?id=${contactDetailsId}&targetId=${targetId}`,
            headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` }
        }).then(response => {
            resolve(response)
        })
    });
}

const addContactDetails = (contactType, targetId) => {
    let value
    if(contactType === "phone") {
        value = "011899988199"
    }
    if(contactType === "email") {
        value = "test.email@hackney.gov.uk"
    }
    addContactModel.targetId = targetId
    addContactModel.contactInformation.contactType = contactType
    addContactModel.contactInformation.value = value

    return new Cypress.Promise((resolve, reject) => {
        cy.request({
            method: 'POST',
            body: addContactModel,
            url: `${endpoint}/contactDetails`,
            headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` }
        }).then(response => {
            saveFixtureData(tableName, {id: response.body.id, targetId: response.body.targetId }, response.body, response).then((response) => {
                resolve(response)
            });
        })
    })
}

export default {
    getContactDetails,
    deleteContactDetails,
    addContactDetails
}