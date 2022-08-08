const request = require('./requests/requests')
const addCommentModel = require('./models/requests/addCommentModel')
const commentsEndpoint = Cypress.env('COMMENTS_ENDPOINT')
const url = `https://${commentsEndpoint}/api/v1/notes`
const tableName = "ContactDetails"

const addComment = async (targetId) => {
    const response = await request.postRequest(`${url}/${targetId}`, addCommentModel.addCommentModel)
    
    const responseData = response.data;
    saveFixtureData(tableName, { id: responseData.id, targetId: targetId }, responseData);
    return response
}

module.exports = {
    addComment
}