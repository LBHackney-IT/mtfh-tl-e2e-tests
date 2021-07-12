const post = require('./requests/postRequest')
const model = require('./models/personCommentModel')
const personCommentUrl = Cypress.env('PERSON_COMMENT_ENDPOINT')
let response

const personCommentPost = async () => {
    response = await post.postRequest(`https://${personCommentUrl}/api/v1/persons`, model.personCommentModel)
    return response
}

module.exports = {
    personCommentPost
}