const request = require('./requests/requests')
const createPersonModel = require('./models/requests/createPersonModel')
const editPersonModel = require('./models/requests/editPersonModel')
const personEndpoint = Cypress.env('PERSON_ENDPOINT')
const url = `${personEndpoint}/persons`

const createPerson = async () => {
    const response = await request.postRequest(url, createPersonModel.createPersonModel)
    return response
}

const createPersonWithNewTenure =async (tenureId) => {
    const payload = {
        "firstName": "Frodo",
        "middleName": "e2e test",
        "surname": "Baggins",
        "title": "Mr",
        "languages": [],
        "reason": "API test in e2e",
        "personTypes": [
            "Tenant"
        ],
        "dateOfBirth": "1990-01-01",
        "identifications": [],
        "tenures": [
            {
                "id": tenureId,
                "startDate": "2004-09-20T00:00:00",
                "endDate": "2015-07-19T00:00:00",
                "assetFullAddress": "Test House London Road E1 8PJ",
                "assetId": "99f16a78-4a57-f179-28c6-dacf35a0b805",
                "uprn": "100022991794",
                "isActive": false,
                "type": "Secure"
            }
        ],
        "nationalInsuranceNo": null
    }
    const response = await request.postRequest(url, payload)
    return response
}

const editPerson = async (personId) => {
    const response = await request.patchRequest(`${url}/${personId}`, editPersonModel.editPersonModel)
    return response
}

const viewPerson = (personId) => {
    const response = request.getRequest(`${url}/${personId}`)
    return response
}

module.exports = {
    createPerson,
    createPersonWithNewTenure,
    editPerson,
    viewPerson
}