const createTenureMultiHouseholdMembers = {
    "tenureType": {
        "code": "FRS",
        "description": "Freehold (Serv)"
    },
    "householdMembers": [
        {
            "id": "cbd7d7b7-c68a-4741-898d-36492b85f189",
            "type": "person",
            "fullName": "Dolphin Rio",
            "isResponsible": true,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "Tenant"
        },
        {
            "id": "cbd7d7b7-c68a-4741-898d-36492b85f189",
            "type": "person",
            "fullName": "Dolphin Rio",
            "isResponsible": false,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "HouseholdMember"
        },
        {
            "id": "00755752-60fb-4366-ae3a-880bc71545f7",
            "type": "person",
            "fullName": "Dolphin Rio",
            "isResponsible": false,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "HouseholdMember"
        }
    ],
    "tenuredAsset": {
        "id": "667c6809-d27b-40c6-a263-48670e253b2f",
        "type": "Dwelling",
        "fullAddress": "E2E test street N18 2UF",
        "uprn": "10008334555"
    },
    "startOfTenureDate": "2022-01-01"
}

module.exports = {
    createTenureMultiHouseholdMembers
}