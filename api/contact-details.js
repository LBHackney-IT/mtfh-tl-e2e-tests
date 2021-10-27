const request = require('./requests/requests')
const personEndpoint = Cypress.env('CONTACT_DETAILS_ENDPOINT')

const getContactDetails = async (personId) => {
    const response = await request.getRequest(`${personEndpoint}/contactDetails?targetId=${personId}`)
    return response
}

const deleteContactDetails = async (contactDetailsId, targetId) => {
    const response = await request.deleteRequest(`${personEndpoint}/contactDetails?id=${contactDetailsId}&targetId=${targetId}`)
    return response
}

module.exports = {
    getContactDetails,
    deleteContactDetails
}