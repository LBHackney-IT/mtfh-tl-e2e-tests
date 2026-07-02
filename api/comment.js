const request = require('./requests/requests')
const addCommentModel = require('./models/requests/addCommentModel')
const { endpoint } = require('../cypress/support/endpoints')
const { saveFixtureData } = require('./helpers')

const commentsUrl = () => `https://${endpoint('COMMENTS_ENDPOINT')}/api/v1/notes`
const tableName = "ContactDetails"

const addComment = async (targetId) => {
    const response = await request.postRequest(`${commentsUrl()}/${targetId}`, addCommentModel.addCommentModel)
    
    const responseData = response.data;
    saveFixtureData(tableName, { id: responseData.id, targetId: targetId }, responseData);
    return response
}

module.exports = {
    addComment
}
