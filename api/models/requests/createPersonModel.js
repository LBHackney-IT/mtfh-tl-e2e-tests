import { faker } from '@faker-js/faker';

export const createPersonModel = {
    "firstName": "Add",
    "middleName": "Person",
    "surname": "API E2E Test",
    "title": "Mr",
    "languages": [],
    "reason": "API test",
    "personTypes": [
        "Tenant"
    ],
    "dateOfBirth": "2021-01-01",
    "identifications": [],
    "tenures": [
        {
            "id": "54eae587-19b5-9381-c613-91da61648936",
            "startDate": "2004-09-20T00:00:00",
            "endDate": "2015-07-19T00:00:00",
            "assetFullAddress": "23 Brunswick House  Thurtle Road E2 8PJ",
            "assetId": "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
            "uprn": "100022991794",
            "isActive": false,
            "type": "Secure"
        }
    ],
    "nationalInsuranceNo": null
}

export const getPersonWithGuid = (personGuid) => {
    return {
        "id": personGuid,
        "title": "Mr",
        "preferredTitle": "",
        "preferredFirstName": "",
        "preferredSurname": "",
        "preferredMiddleName": "",
        "firstName": "John",
        "middleName": "",
        "surname": "Doe",
        "placeOfBirth": "",
        "dateOfBirth": "1990-01-01",
        "reason": "Test",
        "personTypes": [
            "HouseholdMember"
        ],
        "links": [],
        "tenures": [
            {
                "assetFullAddress": "Gge 49 Lincoln Court 1-66 Bethune Road Hackney London N16 5EB",
                "assetId": "6d69a68b-5c0d-3040-cb9b-a67df30b87f0",
                "startDate": "2022-12-12T00:00:00.0000000Z",
                "endDate": "2023-12-11T00:00:00.0000000Z",
                "id": "528f5a7e-1050-446a-ab55-41b34ad4ac71",
                "type": "Commercial Let",
                "uprn": "",
                "paymentReference": "3750091302",
                "propertyReference": "00050091",
                "isActive": true
            }
        ],
        "isAMinor": false,
        "dateOfDeath": null
    }
}

export const person = (tenure) => {
    return {
        id: faker.datatype.uuid(),
        title: "Mr",
        firstName: "Add",
        middleName: "Person",
        surname: "API E2E Test",
        placeOfBirth: faker.address.city(),
        dateOfBirth: "2002-02-19T18:12:39.258Z",
        personTypes: ["Tenant"],
        reason: faker.lorem.sentence(),
        tenures: tenure ? [{
            id: tenure.id,
            startDate: tenure.startOfTenureDate,
            endDate: tenure.endOfTenureDate,
            assetFullAddress: tenure.tenuredAsset.fullAddress,
            assetId: tenure.tenuredAsset.id,
            uprn: tenure.tenuredAsset.uprn,
            isActive: false,
            type: tenure.tenureType.description,
        }] : [],
    }
}