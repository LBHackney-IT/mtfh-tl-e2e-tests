const { faker } = require("@faker-js/faker");

const defaultPatch = [
  {
    "id": faker.datatype.uuid(),
    "parentId": faker.datatype.uuid(),
    "name": "SN4",
    "patchType": "patch",
    "domain": "MMH",
    "responsibleEntities": []
  }
]

const createAssetModel = {
  "id": "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
  "assetId": "12876875",
  "assetAddress": {
    "uprn": "100021065786",
    "addressLine1": "Powell Road",
    "addressLine2": "Hackney",
    "addressLine3": "London",
    "addressLine4": "",
    "postCode": "E5 8DH",
    "postPreamble": "1 Newcome House"
  },
  "assetManagement": {
    "agent": "HAH",
    "areaOfficeName": "Clapton Panel Area Team",
    "isCouncilProperty": true,
    "managingOrganisation": "LBH",
    "managingOrganisationId": "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
    "owner": "London Borough of Hackney",
    "isTMOManaged": true,
    "propertyOccupiedStatus": "DS",
    "isNoRepairsMaintenance": false,
    "isTemporaryAccomodation": false
  },
  "assetCharacteristics": {
    "numberOfBedrooms": 2,
    "numberOfLifts": 3,
    "numberOfLivingRooms": 1,
    "windowType": "DBL",
    "yearConstructed": "1978",
    "assetPropertyFolderLink": "https://drive.google.com/drive/folders/1a32xUYx-wRNR1NTjE4pJGV07aswYirflU",
    "epcExpiryDate": "2017-06-26T00:00:00",
    "fireSafetyCertificateExpiryDate": "2017-06-26T00:00:00",
    "gasSafetyCertificateExpiryDate": "2017-06-26T00:00:00",
    "elecCertificateExpiryDate": "2017-06-26T00:00:00",
    "optionToTax": true,
    "hasStairs": true,
    "numberOfStairs": 20,
    "hasRampAccess": true,
    "hasCommunalAreas": true,
    "hasPrivateBathroom": true,
    "numberOfBathrooms": 2,
    "bathroomFloor": "2",
    "hasPrivateKitchen": true,
    "numberOfKitchens": 2,
    "kitchenfloor": "0",
    "alertSystemExpiryDate": "2017-06-26T00:00:00",
    "epcScore": "80 c",
    "numberOfFloors": 0,
    "accessibilityComments": "step into the shower",
    "numberOfBedSpaces": 2,
    "numberOfCots": 12,
    "sleepingArrangementNotes": "Ground Floor",
    "numberOfShowers": 4,
    "kitchenNotes": "Shared, on 1st and 3rd floors",
    "isStepFree": true
  },
  "parentId": "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
  "assetType": "Dwelling",
  "assetLocation": {
    "floorNo": "G",
    "totalBlockFloors": 4,
    "parentAssets": [
      {
        "type": "block",
        "id": "6f22e9ae-3e8a-4e0e-af46-db02eb87f8e6",
        "name": "Stone Bridge Estate"
      }
    ]
  },
}

const generateAsset = (assetGuid = faker.datatype.uuid(), uprn = faker.random.numeric(11).toString(), patch = defaultPatch) => {
  return {
    "id": assetGuid,
    "assetId": "00054811",
    "assetType": "LettableNonDwelling",
    "rootAsset": "ROOT",
    "isActive": false,
    "parentAssetIds": "ROOT",
    "assetLocation": {
      "floorNo": "0",
      "totalBlockFloors": 0,
      "parentAssets": []
    },
    "assetAddress": {
      "uprn": uprn,
      "addressLine1": "123 Test Asset",
      "addressLine2": "Hackney",
      "addressLine3": "LONDON",
      "addressLine4": "",
      "postCode": "E2 8EB",
      "postPreamble": ""
    },
    "assetManagement": {
      "agent": "Hackney Homes",
      "areaOfficeName": "Shoreditch Panel Area Team",
      "isCouncilProperty": true,
      "managingOrganisation": "London Borough of Hackney",
      "managingOrganisationId": "c01e3146-e630-c2cd-e709-18ef57bf3724",
      "owner": "LBH",
      "isTMOManaged": false,
      "propertyOccupiedStatus": "VR",
      "isNoRepairsMaintenance": false
    },
    "assetCharacteristics": {
      "numberOfBedrooms": 0,
      "numberOfLifts": 0,
      "numberOfLivingRooms": 0,
      "windowType": "",
      "yearConstructed": "0"
    },
    "patches": [...patch]
  }
}

const generateNewAsset = (assetGuid = faker.datatype.uuid(), assetId = faker.random.numeric(7).toString()) => {
  return {
    "id": assetGuid,
    "assetId": assetId,
    "assetType": "Dwelling",
    "parentAssetIds": "",
    "isActive": true,
    "assetLocation": {
      "floorNo": "",
      "totalBlockFloors": null,
      "parentAssets": []
    },
    "assetAddress": {
      "uprn": "",
      "postPreamble": "",
      "addressLine1": "47 Test Road",
      "addressLine2": "",
      "addressLine3": "",
      "addressLine4": "",
      "postCode": "MK40 2RF"
    },
    "assetManagement": {
      "agent": "",
      "areaOfficeName": "",
      "isCouncilProperty": true,
      "managingOrganisation": "London Borough of Hackney",
      "isTMOManaged": false,
      "managingOrganisationId": "c01e3146-e630-c2cd-e709-18ef57bf3724"
    },
    "assetCharacteristics": {
      "numberOfBedrooms": null,
      "numberOfLivingRooms": null,
      "yearConstructed": "",
      "windowType": "",
      "numberOfLifts": null
    }
  }
}

const asset = (patch) => {
  return {
    ...createAssetModel,
    id: faker.datatype.uuid(),
    patches: [patch]
  }
}

module.exports = {
  asset,
  createAssetModel,
  generateAsset,
  generateNewAsset
}