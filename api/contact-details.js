import { deleteRequest } from './requests/requests'
import { saveFixtureData } from './helpers'

const endpoint = Cypress.env('CONTACT_DETAILS_ENDPOINT')
import { addContactModel } from './models/requests/addContactModel'

const tableName = "ContactDetails";

const getContactDetails = (personId) => {
    return new Promise((resolve, reject) => {
        cy.getRequest(`${endpoint}/contactDetails?targetId=${personId}`).then(response => {
            resolve(response);
        })
    });
}

const deleteContactDetails = async (contactDetailsId, targetId) => {
    const response = await deleteRequest(`${endpoint}/contactDetails?id=${contactDetailsId}&targetId=${targetId}`)
    return response
}

const addContactDetails = async (contactType, targetId) => {
    let value
    if (contactType === "phone") {
        value = "011899988199"
    }
    if (contactType === "email") {
        value = "test.email@hackney.gov.uk"
    }
    addContactModel.targetId = targetId
    addContactModel.contactInformation.contactType = contactType
    addContactModel.contactInformation.value = value

    return new Promise((resolve, reject) => {
        cy.postRequest(`${endpoint}/contactDetails`, addContactModel).then(response => {
            saveFixtureData(tableName, { id: response.data.id, targetId }, response.data);
            resolve(response);
        })
    });
}

export default {
    getContactDetails,
    deleteContactDetails,
    addContactDetails
}