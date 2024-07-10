import DynamoDb from "../../api/database/DynamoDb";
import { generateTenure } from "../../api/models/requests/addTenureModel";
import { asset, generateAsset } from "../../api/models/requests/createAssetModel";
import { person } from "../../api/models/requests/createPersonModel";
import { patch } from "../../api/models/requests/patchModel";

export const addTestRecordToDatabase = (dbTableName, testDbRecord) => {
  cy.log("Seeding database").then(async () => {
    cy.log(
      `Adding test record to database table ${dbTableName} and creating a record of it in recordsToDelete.json file`
    );
    return new Cypress.Promise((resolve) => {
      DynamoDb.createRecord(dbTableName, testDbRecord).then(() => {
        resolve();
      });
    }).then(() => {
      cy.log("Database seeded!");
    });
  });
};

export const getAssetViewUrlByGuid = (assetGuid) => {
  return `${Cypress.config("baseUrl")}/property/${assetGuid}`;
};

export const getAssetEditUrlByGuid = (assetGuid) => {
  return `${Cypress.config("baseUrl")}/property/edit/${assetGuid}/`
}

export const seedDatabase = () => {
  // Seed the database with a patch, asset, tenure, and two persons (one responsible)
  const patchModel = patch;
  const assetModel = asset(patchModel);
  const personModel1 = person();
  const personModel2 = person();
  const tenureModel = generateTenure({}, assetModel, [
    personModel1,
    { isResponsible: true, personTenureType: "Tenant", ...personModel2 },
  ]);

  const personTenure = {
    id: tenureModel.id,
    startDate: tenureModel.startOfTenureDate,
    endDate: tenureModel.endOfTenureDate,
    assetFullAddress: tenureModel.tenuredAsset.fullAddress,
    assetId: tenureModel.tenuredAsset.id,
    uprn: tenureModel.tenuredAsset.uprn,
    isActive: false,
    type: tenureModel.tenureType.description,
    propertyReference: tenureModel.tenuredAsset.propertyReference,
  };

  personModel1.tenures.push(personTenure);
  personModel2.tenures.push(personTenure);

  assetModel.tenure = {
    endOfTenureDate: tenureModel.endOfTenureDate,
    id: tenureModel.id,
    paymentReference: tenureModel.paymentReference,
    startOfTenureDate: tenureModel.startOfTenureDate,
    type: tenureModel.tenureType.description,
  };

  addTestRecordToDatabase("PatchesAndAreas", patchModel);
  addTestRecordToDatabase("Assets", assetModel);
  addTestRecordToDatabase("TenureInformation", tenureModel);
  addTestRecordToDatabase("Persons", personModel1);
  addTestRecordToDatabase("Persons", personModel2);
};

export const seedDatabaseWithTenure = (isActive) => {
  // Seed the database with a patch, asset, tenure, and two persons (one responsible)
  const assetModel = generateAsset();
  const personModel1 = person();
  const personModel2 = person();
  const tenureModel = generateTenure(
    {},
    assetModel,
    [
      personModel1,
      { isResponsible: true, personTenureType: "Tenant", ...personModel2 },
    ],
    undefined,
    "1990-10-13",
    isActive ? "3050-10-13" : "1998-10-13"
  );

  const personTenure = {
    id: tenureModel.id,
    startDate: tenureModel.startOfTenureDate,
    endDate: tenureModel.endOfTenureDate,
    assetFullAddress: tenureModel.tenuredAsset.fullAddress,
    assetId: tenureModel.tenuredAsset.id,
    uprn: tenureModel.tenuredAsset.uprn,
    isActive: isActive,
    type: tenureModel.tenureType.description,
    propertyReference: tenureModel.tenuredAsset.propertyReference,
  };

  personModel1.tenures.push(personTenure);
  personModel2.tenures.push(personTenure);

  assetModel.tenure = {
    endOfTenureDate: tenureModel.endOfTenureDate,
    id: tenureModel.id,
    paymentReference: tenureModel.paymentReference,
    startOfTenureDate: tenureModel.startOfTenureDate,
    type: tenureModel.tenureType.description,
  };

  addTestRecordToDatabase("Assets", assetModel);
  addTestRecordToDatabase("TenureInformation", tenureModel);
  addTestRecordToDatabase("Persons", personModel1);
  addTestRecordToDatabase("Persons", personModel2);
};

export const seedDatabaseWithCautionaryAlert = () => {
    cy.log("Creating cautionary alert & entities associated with it")
    .then(() => {
      const assetModel = asset();
      const tenureModel = generateTenure({}, assetModel);
      const personModel = person();
      const personTenure = tenureToPersonTenure(tenureModel);

      personModel.tenures.push(personTenure);
      assetModel.tenure = tenureToAssetTenure(tenureModel);

      const saveNonDynamoRecord = (response) => new Promise((resolve, reject) => {
        console.log("saveNonDynamoRecord data: ", response)
        try {
          saveNonDynamoFixture(
            "CautionaryAlerts",
            [response.body],
            response,
          ).then((response) => {
            resolve(response)
          });
        }
        catch (ex) {
          reject(ex);
        }
      });

      const cautionaryAlertRecord = cautionaryAlert(personModel, assetModel);

      createCautionaryAlert(cautionaryAlertRecord).then((data) => {
        saveNonDynamoRecord(data).then((moreData) => {
          Promise.resolve(moreData);
        });
      });

      addTestRecordToDatabase("Assets", assetModel)
      addTestRecordToDatabase("TenureInformation", tenureModel)
      addTestRecordToDatabase("Persons", personModel)
    });
}
