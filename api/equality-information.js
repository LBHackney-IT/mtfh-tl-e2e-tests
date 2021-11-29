const request = require('./requests/requests')
const equalityDetailsModel = require('./models/requests/equalityDetailsModel')
const equalityDetailsEndpoint = Cypress.env('EQUALITY_DETAILS_ENDPOINT')
const url = `${equalityDetailsEndpoint}/equality-information`

const getEqualityDetails = async (targetId) => {
    const response = await request.getRequest(`${url}?targetId=${targetId}`)
    return response
}

const editEqualityDetails = async (targetId, etag) => {
    const response = await request.patchRequest(`${url}/${targetId}`, equalityDetailsModel.equalityDetailsModel, etag)
    return response
}

module.exports = {
    getEqualityDetails,
    editEqualityDetails
}