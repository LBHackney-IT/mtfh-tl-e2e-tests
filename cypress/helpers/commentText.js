const { v4: uuidv4 } = require('uuid');
const commentTitle = `Test title ${uuidv4()}`;
const comment = `This is a valid comment ${uuidv4()}`;
const guid = `${uuidv4()}`

module.exports = {
    commentTitle,
    comment,
    guid
}