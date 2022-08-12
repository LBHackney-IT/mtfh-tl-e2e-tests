import { getRequest, deleteRequest, postRequest } from './requests/requests'
import { saveFixtureData } from './helpers'

const endpoint = Cypress.env('CONTACT_DETAILS_ENDPOINT')
import { addContactModel } from './models/requests/addContactModel'

const tableName = "ContactDetails";

const getContactDetails = async (personId) => {
    const response = await getRequest(`${endpoint}/contactDetails?targetId=${personId}`)
    return response
}

const deleteContactDetails = async (contactDetailsId, targetId) => {
    const response = await deleteRequest(`${endpoint}/contactDetails?id=${contactDetailsId}&targetId=${targetId}`)
    return response
}

const addContactDetails = async (contactType, targetId) => {
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

    const response = await postRequest(`${endpoint}/contactDetails`, addContactModel)
    
    const responseData = response.data;
    saveFixtureData(tableName, {id: responseData.id, targetId: responseData.targetId }, responseData);
    return response
}

export default {
    getContactDetails,
    deleteContactDetails,
    addContactDetails
}