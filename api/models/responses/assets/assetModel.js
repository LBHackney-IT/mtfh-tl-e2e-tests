const assetModelWithValidAssetType = {
    "id": "49202bdc-5d97-a46c-289c-997df568500f",
    "assetId": "100022932832",
    "assetType": "Dwelling",
    "rootAsset": "ROOT",
    "parentAssetIds": "ROOT",
    "assetLocation": {
        "floorNo": "",
        "totalBlockFloors": 0,
        "parentAssets": []
    },
    "assetAddress": {
        "uprn": "100022932832",
        "addressLine1": "10 PUMP HOUSE CHAPEL PLACE",
        "addressLine2": "HACKNEY",
        "addressLine3": "LONDON",
        "addressLine4": "",
        "postCode": "EC2A 3DQ",
        "postPreamble": ""
    },
    "assetManagement": {
        "agent": "",
        "areaOfficeName": null,
        "isCouncilProperty": false,
        "managingOrganisation": "London Borough of Hackney",
        "managingOrganisationId": "c01e3146-e630-c2cd-e709-18ef57bf3724",
        "owner": "OOB",
        "isTMOManaged": false,
        "propertyOccupiedStatus": null,
        "isNoRepairsMaintenance": false
    },
    "assetCharacteristics": {
        "numberOfBedrooms": 2,
        "numberOfLifts": 1,
        "numberOfLivingRooms": 0,
        "windowType": "",
        "yearConstructed": "0"
    },
    "tenure": null
}

const assetModelWithInvalidAssetType = {
    "id": "5372e973-2857-98df-a343-4acfb76af535",
    "assetId": "00072668",
    "assetType": "Lift",
    "rootAsset": "adfe539c-819c-8676-6431-de63f66a10d3",
    "parentAssetIds": "656feda1-896f-b136-da84-163ee4f1be6c#adfe539c-819c-8676-6431-de63f66a10d3#9d74cb55-b354-3fa6-4e97-706dab3bc9d2#028b25b2-f4ee-0022-b466-a6e972a8a3d2",
    "assetLocation": {
        "floorNo": "",
        "totalBlockFloors": 0,
        "parentAssets": [
            {
                "type": "NA",
                "id": "656feda1-896f-b136-da84-163ee4f1be6c",
                "name": "Hackney Homes Limited"
            },
            {
                "type": "Low Rise Block (2 storeys or less)",
                "id": "028b25b2-f4ee-0022-b466-a6e972a8a3d2",
                "name": ""
            },
            {
                "type": "Estate",
                "id": "adfe539c-819c-8676-6431-de63f66a10d3",
                "name": "Wyke Estate"
            },
            {
                "type": "Low Rise Block (2 storeys or less)",
                "id": "9d74cb55-b354-3fa6-4e97-706dab3bc9d2",
                "name": ""
            }
        ]
    },
    "assetAddress": {
        "uprn": "",
        "addressLine1": "Lift 4L 1196 111-121 Anderson Road",
        "addressLine2": "Hackney",
        "addressLine3": "London",
        "addressLine4": "",
        "postCode": "E9 6HJ",
        "postPreamble": ""
    },
    "assetManagement": {
        "agent": "Hackney Homes",
        "areaOfficeName": "Wyke TMO (HN)",
        "isCouncilProperty": false,
        "managingOrganisation": "Wyke Tenants and Residents Co-operative",
        "managingOrganisationId": "bcf63270-4e09-7336-ce58-38a146edcdb4",
        "owner": "LBH",
        "isTMOManaged": true,
        "propertyOccupiedStatus": null,
        "isNoRepairsMaintenance": false
    },
    "assetCharacteristics": {
        "numberOfBedrooms": 0,
        "numberOfLifts": 0,
        "numberOfLivingRooms": 0,
        "windowType": "",
        "yearConstructed": "1957"
    },
    "tenure": null
}

module.exports = {
    assetModelWithValidAssetType,
    assetModelWithInvalidAssetType
}