const createTenureModel = {
    "tenureType": {
        "code": "FRS",
        "description": "Freehold (Serv)"
    },
    "householdMembers": [
        {
            "id": "5270ebf3-7ec5-4825-8273-6843ad7781db",
            "type": "person",
            "fullName": "Dolphin Hackney",
            "isResponsible": true,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "Tenant"
        },
        {
            "id": "2e03113a-f404-acdd-fe16-0eb1351526dc",
            "type": "person",
            "fullName": "FAKE_Katy FAKE_Turne",
            "isResponsible": false,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "HouseholdMember"
        },
        {
            "id": "1a622732-c9ad-4599-b5ba-4c144728c9f4",
            "type": "person",
            "fullName": "Whales Hackney",
            "isResponsible": true,
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
    "startOfTenureDate": "2010-01-01"
}

module.exports = {
    createTenureModel
}