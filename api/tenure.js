const request = require('./requests/requests')
const tenureEndpoint = Cypress.env('TENURE_ENDPOINT')

const editTenureModel = {tenureType: {code: "", description: ""}, endOfTenureDate: null}

const getTenure = async(tenureId) => {
    const response = await request.getRequest(`${tenureEndpoint}/tenures/${tenureId}`)
    return response
}

const editTenure = async(tenureId, tenureType, ifMatch) => {
    editTenureModel.tenureType.code = tenureType.substring(0,2).toUpperCase()
    editTenureModel.tenureType.description = tenureType
    const response = await request.patchRequest(`${tenureEndpoint}/tenures/${tenureId}`, editTenureModel, ifMatch)
    return response
}

const deleteTenure = async(tenureId, personId) => {
    const response = await request.deleteRequest(`${tenureEndpoint}/tenures/${tenureId}/person/${personId}`)
    return response
}

module.exports = {
    getTenure,
    editTenure,
    deleteTenure
}