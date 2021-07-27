const request = require('./requests/requests')
const addContactModel = require('./models/requests/addContactModel')
const contactEndpoint = Cypress.env('CONTACT_ENDPOINT')
const url = `https://${contactEndpoint}/api/v1/contactDetails`



const addContact = async (targetId) => {
    const response = await request.postRequest(url, addContactModel.addContactModel)
    return response
}

module.exports = {
    addContact
}