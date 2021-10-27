const createTenureModel = {
    "tenureType": {
        "code": "FRS",
        "description": "Freehold (Serv)"
    },
    "householdMembers": [
        {
        "id": "5270ebf3-7ec5-4825-8273-6843ad7781db",
        "type": "person",
        "fullName": "Dolphin Rio",
        "isResponsible": true,
        "dateOfBirth": "1962-05-10",
        "personTenureType": "Tenant"
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