const { v4: uuidv4 } = require('uuid');
const commentTitle = 'E2E Test title'
const comment = 'This is a valid comment for e2e test'
const guid = `${uuidv4()}`
const category ='Rehousing'

module.exports = {
    commentTitle,
    comment,
    guid,
    category 
}