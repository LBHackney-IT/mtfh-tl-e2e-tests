const { faker } = require("@faker-js/faker");
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
        "id": "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
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
            "id": "2e03113a-f404-acdd-fe16-0eb1351526dc",
            "type": "person",
            "fullName": "FAKE_Katy FAKE_Turne",
            "isResponsible": false,
            "dateOfBirth": "1962-05-10",
            "personTenureType": "HouseholdMember"
        }
    ],
    "tenuredAsset": {
        "id": "667c6809-d27b-40c6-a263-48670e253b2f",
        "type": "Dwelling",
        "fullAddress": "ROOM 106 CAPE HOUSE 39 Dalston Lane E8 3DF",
        "uprn": "10008334555"
    },
    "startOfTenureDate": "2010-01-01"
}

const getTenureWithGuid = (tenureGuid = faker.datatype.uuid()) => {
    return {
        "id": tenureGuid,
        "charges": {
         "billingFrequency": "Weekly",
         "combinedRentCharges": 0,
         "combinedServiceCharges": 0,
         "currentBalance": -296.59,
         "originalRentCharge": 0,
         "originalServiceCharge": 0,
         "otherCharges": 0.1,
         "rent": 92.49,
         "serviceCharge": 26.3,
         "tenancyInsuranceCharge": 0
        },
        "evictionDate": "1900-01-01T00:00:00.0000000Z",
        "householdMembers": [
         {
          "id": "cff7f0ff-0851-ff4f-2739-32c9c8611592",
          "dateOfBirth": "1968-07-29T00:00:00",
          "fullName": "FAKE_Shane FAKE_Hooper",
          "isResponsible": true,
          "personTenureType": "Tenant",
          "type": "Person"
         },
         {
          "id": "447c2c0e-dcad-cba5-12f1-0185cb0de552",
          "dateOfBirth": "1995-07-21T00:00:00",
          "fullName": "FAKE_Brenda FAKE_Davies",
          "isResponsible": true,
          "personTenureType": "Tenant",
          "type": "Person"
         },
         {
          "id": "890dded5-13c7-e032-dc12-e351cb752927",
          "dateOfBirth": "1928-10-09T00:00:00",
          "fullName": "Mrs. FAKE_Alexander FAKE_Alexander",
          "isResponsible": true,
          "personTenureType": "Tenant",
          "type": "Person"
         }
        ],
        "informHousingBenefitsForChanges": false,
        "isMutualExchange": false,
        "isSublet": false,
        "legacyReferences": [
         {
          "name": "uh_tag_ref",
          "value": "043655/01"
         },
         {
          "name": "u_saff_tenancy",
          "value": "01753389"
         }
        ],
        "notices": [
         {
          "effectiveDate": "1900-01-01T00:00:00",
          "endDate": null,
          "expiryDate": "1900-01-01T00:00:00",
          "servedDate": "1900-01-01T00:00:00"
         }
        ],
        "paymentReference": "6211100504",
        "potentialEndDate": "1900-01-01T00:00:00.0000000Z",
        "startOfTenureDate": "1991-12-16T00:00:00.0000000Z",
        "subletEndDate": "1900-01-01T00:00:00.0000000Z",
        "successionDate": "1900-01-01T00:00:00.0000000Z",
        "tenuredAsset": {
         "id": "af890be6-1120-1318-29f0-e5707083298b",
         "fullAddress": "100 Marlborough Avenue E8 4SL",
         "propertyReference": "00036116",
         "type": "Dwelling",
         "uprn": "100021058036"
        },
        "tenureType": {
         "code": "SEC",
         "description": "Secure"
        },
        "terminated": {
         "isTerminated": false
        },
        "versionNumber": 0
       }
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
                id: "2e03113a-f404-acdd-fe16-0eb1351526dc",
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
            id: "667c6809-d27b-40c6-a263-48670e253b2f",
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
    tenure,
    getTenureWithGuid
}