const { faker } = require("@faker-js/faker")

const addCommentModel = {
    "description": "Add a comment",
    "targetType": "person",
    "targetId": faker.datatype.uuid(),
    "createdAt": "2021-07-22T12:10:50.179Z",
    "author": {
        "id": "113481393954704381867",
        "email": "sam.greig@hackney.gov.uk",
        "fullName": "Sam Greig"
    }
}

module.exports = {
    addCommentModel
}