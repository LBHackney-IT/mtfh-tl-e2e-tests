const request = require('./requests/requests')
const tenureEndpoint = Cypress.env('TENURE_ENDPOINT')


const createTenureModel =
{
    "tenureType": {
        "code": "FRS",
        "description": "Freehold (Serv)"
    },
    "tenuredAsset": {
        "id": "667c6809-d27b-40c6-a263-48670e253b2f",
        "type": "Dwelling",
        "fullAddress": "E2E test street N18 2UF",
        "uprn": "10008334555"
    },
    "startOfTenureDate": "2022-01-01"
}
const editTenureModel = {tenureType: {code: "", description: ""}, endOfTenureDate: null}


const getTenure = async(tenureId) => {
    const response = await request.getRequest(`${tenureEndpoint}/tenures/${tenureId}`)
    return response
}

const createTenure = async(tenureId, tenureType) => {
    const response = await request.postRequest(`${tenureEndpoint}/tenures/`, createTenureModel)
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
    createTenure
}