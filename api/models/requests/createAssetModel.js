const { faker } = require("@faker-js/faker");

const createAssetModel = {
  "id": faker.datatype.uuid(),
  "assetId": "12876875",
  "areaId": "3887a798-1e38-4265-9279-bd8097d23b8d",
  "patchId": "e611b1af-e2cc-45ee-8f17-cd8c09307121",
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

const defaultAssetCharacteristics = {
  "numberOfBedrooms": null,
  "numberOfLivingRooms": null,
  "yearConstructed": "",
  "windowType": "",
  "numberOfLifts": null
};
const defaultAssetLocation = {
  "floorNo": "",
  "totalBlockFloors": null,
  "parentAssets": []
};
const defaultAssetAddress = {
  "uprn": "00014579215",
  "postPreamble": "",
  "addressLine1": "123 Test Road",
  "addressLine2": "",
  "addressLine3": "",
  "addressLine4": "",
  "postCode": "E9 6PT"
};
const defaultAssetManagement = {
  "agent": "",
  "areaOfficeName": "",
  "isCouncilProperty": true,
  "managingOrganisation": "London Borough of Hackney",
  "isTMOManaged": false,
  "managingOrganisationId": "c01e3146-e630-c2cd-e709-18ef57bf3724"
};

const assetModelControlledSubmodels = ({
  assetLocation,
  assetCharacteristics
}) => {
  const assetLocationInternal = assetLocation
    ? assetLocation
    : defaultAssetLocation;

  const assetAddressInternal = defaultAssetAddress;
  const assetManagementInternal = defaultAssetManagement;

  const assetCharacteristicsInternal = assetCharacteristics
    ? assetCharacteristics
    : defaultAssetCharacteristics;

  return {
    "id": faker.datatype.uuid(),
    "assetId": "0014062023",
    "areaId": "3887a798-1e38-4265-9279-bd8097d23b8d",
    "patchId": "e611b1af-e2cc-45ee-8f17-cd8c09307121",
    "assetType": "Dwelling",
    "parentAssetIds": "463f556b-fbe6-4216-84f3-99b64ccafe6b",
    "isActive": true,
    "assetLocation": assetLocationInternal,
    "assetAddress": assetAddressInternal,
    "assetManagement": assetManagementInternal,
    "assetCharacteristics": assetCharacteristicsInternal,
  };
};

const generateAsset = (assetGuid = faker.datatype.uuid(), uprn = faker.random.numeric(11).toString()) => {
  return {
    "id": assetGuid,
    "assetId": "00054811",
    "areaId": "3887a798-1e38-4265-9279-bd8097d23b8d",
    "patchId": "e611b1af-e2cc-45ee-8f17-cd8c09307121",
    "assetType": "LettableNonDwelling",
    "rootAsset": "ROOT",
    "isActive": false,
    "parentAssetIds": "14edf718-19ff-ff43-4679-f8ef404fa029",
    "assetLocation": {
      "floorNo": "",
      "totalBlockFloors": 0,
      "parentAssets": [
        {
          "type": "Estate",
          "id": "14edf718-19ff-ff43-4679-f8ef404fa029",
          "name": "Random Test Estate"
        }
      ]
    },
    "assetAddress": {
      "uprn": uprn,
      "addressLine1": `${faker.random.numeric(2).toString()} Test Asset`,
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
  }
}

const generateNewAsset = (assetGuid = faker.datatype.uuid(), assetId = faker.random.numeric(8).toString()) => {
  return {
    "id": assetGuid,
    "assetId": assetId,
    "areaId": "3887a798-1e38-4265-9279-bd8097d23b8d",
    "patchId": "e611b1af-e2cc-45ee-8f17-cd8c09307121",
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

const asset = () => {
  return createAssetModel
}

const randomInt = (min, max) => faker.datatype.number({ min: min, max: max });
const randomItem = (collection) => collection[randomInt(0, collection.length - 1)];

const assetCharacteristicsModel = () => {
  // some possible states:
  const windowStates = ['D', 'DBL', 'S', 'SNG'];
  const architectureStates = ['PRE45MR-FLT', '45-64MR-FLT', 'POST74MR-FLT', '65-74MR-FLT', 'POST74HSE', 'PRE45HSE', '65-74HSE'];
  const propFactorStates = [1.5, 3, 4, 4.5, 5];
  const heatingStates = ['FGC', 'FCH', 'FEC', 'FUF', 'NEF', 'PCB', 'UNK', 'FMC'];

  // random values
  const singleBeds = randomInt(0, 6);
  const doubleBeds = randomInt(0, 6);
  const assetFloors = randomInt(0, 4);
  const livingRooms = 1;
  const year = randomInt(1960, 2070).toString();
  const windows = randomItem(windowStates);
  const architecture = randomItem(architectureStates);
  const propFactor = randomItem(propFactorStates);
  const heating = randomItem(heatingStates);

  return {
    numberOfBedrooms: singleBeds + doubleBeds,
    numberOfLifts: 1,
    numberOfLivingRooms: livingRooms,
    windowType: windows,
    yearConstructed: year,
    numberOfSingleBeds: singleBeds,
    numberOfDoubleBeds: doubleBeds,
    numberOfFloors: assetFloors,
    heating: heating,
    propertyFactor: propFactor,
    architecturalType: architecture,
  };
};

module.exports = {
  asset,
  createAssetModel,
  assetModelControlledSubmodels,
  defaultAssetLocation,
  assetCharacteristicsModel,
  generateAsset,
  generateNewAsset
};