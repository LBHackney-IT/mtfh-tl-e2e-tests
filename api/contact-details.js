const request = require('./requests/requests')
const personEndpoint = Cypress.env('CONTACT_DETAILS_ENDPOINT')
const contactDetails = require('./models/requests/addContactModel')

const getContactDetails = async (personId) => {
    const response = await request.getRequest(`${personEndpoint}/contactDetails?targetId=${personId}`)
    return response
}

const deleteContactDetails = async (contactDetailsId, targetId) => {
    const response = await request.deleteRequest(`${personEndpoint}/contactDetails?id=${contactDetailsId}&targetId=${targetId}`)
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
    contactDetails.addContactModel.targetId = targetId
    contactDetails.addContactModel.contactInformation.contactType = contactType
    contactDetails.addContactModel.contactInformation.value = value
    const response = await request.postRequest(`${personEndpoint}/contactDetails`, contactDetails.addContactModel)
    return response
}

module.exports = {
    getContactDetails,
    deleteContactDetails,
    addContactDetails
}