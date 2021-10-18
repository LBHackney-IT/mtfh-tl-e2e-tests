const { v4: uuidv4 } = require('uuid');
const commentTitle = `Test title ${uuidv4()}`;
const validComment = `This is a valid comment ${uuidv4()}`;
const testGuid = `${uuidv4()}`

module.exports = {
    commentTitle,
    validComment,
    testGuid
}