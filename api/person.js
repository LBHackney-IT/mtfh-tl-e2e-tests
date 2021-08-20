const request = require('./requests/requests')
const createPersonModel = require('./models/requests/createPersonModel')
const editPersonModel = require('./models/requests/editPersonModel')
const personEndpoint = Cypress.env('PERSON_ENDPOINT')
const url = `${personEndpoint}/persons`

const createPerson = async () => {
    const response = await request.postRequest(url, createPersonModel.createPersonModel)
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
    editPerson,
    viewPerson
}