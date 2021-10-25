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


// https://gos4l9my1a.execute-api.eu-west-2.amazonaws.com/development/api/v1/contactDetails?id=a4e8d069-fe75-4fcc-b694-e8b26e6156bb&targetId=279bf08c-0c9e-4d81-e24a-8930e8b37a68

module.exports = {
    getContactDetails,
    deleteContactDetails
}