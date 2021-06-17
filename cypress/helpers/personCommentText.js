const { v4: uuidv4 } = require('uuid');
const validComment = `This is a valid comment ${uuidv4()}`;
const testGuid = `${uuidv4()}`

module.exports = {
    validComment,
    testGuid
}