import { saveFixtureData } from './helpers'

const endpoint = Cypress.env('CONTACT_DETAILS_ENDPOINT')
import { addContactModel } from './models/requests/addContactModel'

const tableName = "ContactDetails";

export const getContactDetails = (personId) => {
    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'GET',
            url: `${endpoint}/contactDetails?targetId=${personId}`,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` },
            failOnStatusCode: false
        }).then(response => {
            resolve(response)
        })
    });
}

export const deleteContactDetails = (contactDetailsId, targetId) => {
    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'DELETE',
            url: `${endpoint}/contactDetails?id=${contactDetailsId}&targetId=${targetId}`,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` }
        }).then(response => {
            resolve(response)
        })
    });
}

export const addContactDetails = (targetId, contactType = null, contactInformation = null) => {
    let value
    if (contactType === "phone") {
        value = "011899988199"
    }
    if (contactType === "email" || contactType == null) {
        value = "test.email@hackney.gov.uk"
    }
    addContactModel.targetId = targetId
    addContactModel.contactInformation.contactType = contactType
    addContactModel.contactInformation.value = value

    if (contactInformation) {
        addContactModel.contactInformation = contactInformation
    }

    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'POST',
            body: addContactModel,
            url: `${endpoint}/contactDetails`,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` }
        }).then(response => {
            saveFixtureData(
                tableName,
                { id: response.body.id, targetId: response.body.targetId },
                response.body,
                response
            ).then((response) => {
                resolve(response)
            });
        })
    })
}
