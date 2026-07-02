const request = require('./requests/requests')
const { endpoint } = require('../cypress/support/endpoints')

const referenceDataUrl = () => `https://${endpoint('REFERENCE_DATA_ENDPOINT')}/api/v1/reference-data`

const viewReferenceData = (category, subCategory) => {
    const response = request.getRequest(`${referenceDataUrl()}/?category=${category}&subCategory=${subCategory}`)
    return response
}

module.exports = {
    viewReferenceData
}
