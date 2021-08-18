const request = require('./requests/requests')
const addContactModel = require('./models/requests/addContactModel')
const contactEndpoint = Cypress.env('CONTACT_ENDPOINT')
const url = `${contactEndpoint}/contactDetails`



const addContact = async (targetId) => {
    const response = await request.postRequest(`${url}/${targetId}`, addContactModel.addContactModel)
    return response
}

module.exports = {
    addContact
}