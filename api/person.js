const post = require('./requests/postRequest')
const model = require('./models/requests/createPersonModel')
const personUrl = Cypress.env('CREATE_PERSON_ENDPOINT')
let response

const createPerson = async () => {
    response = await post.postRequest(`https://${personUrl}/api/v1/persons`, model.createPersonModel)
    return response
}

module.exports = {
    createPerson
}