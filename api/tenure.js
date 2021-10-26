const request = require('./requests/requests')
const tenureEndpoint = Cypress.env('TENURE_ENDPOINT')
const createTenureModel = require ('./models/requests/addTenureModel')
const editTenureModel = {tenureType: {code: "", description: ""}, endOfTenureDate: null}

const getTenure = async(tenureId) => {
    const response = await request.getRequest(`${tenureEndpoint}/tenures/${tenureId}`)
    return response
}

const createTenure = async() => {
    const response = await request.postRequest(`${tenureEndpoint}/tenures/`, createTenureModel.createTenureModel)
    return response
}

const createTenureWithStartDate = async(startOfTenureDate) => {
    const payload = createTenureModel.createTenureModel
    payload.startOfTenureDate =startOfTenureDate
    const response = await request.postRequest(`${tenureEndpoint}/tenures/`, payload)
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
    deleteTenure,
    createTenure,
    createTenureWithStartDate
}