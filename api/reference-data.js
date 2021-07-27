const request = require('./requests/requests')
const referenceDataEndpoint = Cypress.env('REFERENCE_DATA_ENDPOINT')
const url = `https://${referenceDataEndpoint}/api/v1/reference-data`

const viewReferenceData = (category, subCategory) => {
    const response = request.getRequest(`${url}/?category=${category}&subCategory=${subCategory}`)
    return response
}

module.exports = {
    viewReferenceData
}