const request = require('./requests/requests')
const addCommentModel = require('./models/requests/addCommentModel')
const commentsEndpoint = Cypress.env('COMMENTS_ENDPOINT')
const url = `https://${commentsEndpoint}/api/v1/notes`



const addComment = async (targetId) => {
    const response = await request.postRequest(`${url}/${targetId}`, addCommentModel.addCommentModel)
    return response
}

module.exports = {
    addComment
}