const { faker } = require("@faker-js/faker");

const createTenureModel = {
    "tenureType": {
        "code": "FRS",
        "description": "Freehold (Serv)"
    },
    "householdMembers": [
        {
            "id": faker.datatype.uuid(),
            "type": "person",
            "fullName": "Dolphin Hackney",
            "isResponsible": true,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "Tenant"
        },
        {
            "id": faker.datatype.uuid(),
            "type": "person",
            "fullName": "FAKE_Katy FAKE_Turne",
            "isResponsible": false,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "HouseholdMember"
        },
        {
            "id": faker.datatype.uuid(),
            "type": "person",
            "fullName": "Whales Hackney",
            "isResponsible": true,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "HouseholdMember"
        }
    ],
    "tenuredAsset": {
        "id": faker.datatype.uuid(),
        "type": "Dwelling",
        "fullAddress": "E2E test street N18 2UF",
        "uprn": "10008334555"
    },
    "startOfTenureDate": "2010-01-01"
}

const secureTenureModel = {
    "tenureType": {
        "code": "SEC",
        "description": "Secure"
    },
    "paymentReference": "9156853502",
    "householdMembers": [
        {
            "id": faker.datatype.uuid(),
            "type": "person",
            "fullName": "FAKE_Katy FAKE_Turne",
            "isResponsible": false,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "HouseholdMember"
        }
    ],
    "tenuredAsset": {
        "id": faker.datatype.uuid(),
        "type": "Dwelling",
        "fullAddress": "ROOM 106 CAPE HOUSE 39 Dalston Lane E8 3DF",
        "uprn": "10008334555"
    },
    "startOfTenureDate": "2010-01-01"
}

const tenure = (data, asset, householdMembers) => {
    const { id: assetId, assetType, assetAddress } = asset;
    let newHouseholdMembers = []
    if (householdMembers) {
        newHouseholdMembers = householdMembers.map(person => {
           return {
               isResponsible: person.isResponsible,
               fullName: `${person.firstName} ${person.surname}` ,
               personTenureType: person.personTenureType,
               type: "person",
               id: person.id,
           }
        })
    }
    return {
        id: faker.datatype.uuid(),
        tenureType: {
            code: "SEC",
            description: "Secure"
        },
        paymentReference: "9156853502",
        householdMembers: [
            ...newHouseholdMembers,
            {
                id: faker.datatype.uuid(),
                type: "person",
                fullName: "FAKE_Katy FAKE_Turne",
                isResponsible: false,
                dateOfBirth: "1962-05-10",
                personTenureType: "HouseholdMember"
            }
        ],
        tenuredAsset: asset ? {
            id: assetId,
            propertyReference: asset.assetId,
            type: assetType,
            uprn: assetAddress.uprn,
            fullAddress: `${assetAddress.addressLine1} ${assetAddress.addressLine2} ${assetAddress.addressLine3} ${assetAddress.postCode}`
        } : {
            id: faker.datatype.uuid(),
            propertyReference: "1234567",
            type: "Dwelling",
            fullAddress: "ROOM 106 CAPE HOUSE 39 Dalston Lane E8 3DF",
            uprn: "10008334555"
        },
        ...data,
        startOfTenureDate: data.startOfTenureData || "2010-01-01",
    }
}

module.exports = {
    createTenureModel,
    secureTenureModel,
    tenure
}