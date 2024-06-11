import DynamoDb from "./DynamoDb";
import { generateTenure } from "../../../api/models/requests/addTenureModel";
import { asset, generateAsset } from "../../../api/models/requests/createAssetModel";
import { person } from "../../../api/models/requests/createPersonModel";
import { patch } from "../../../api/models/requests/patchModel";

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
  
  // Database seed methods
  
export const seedDatabase = () => {
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
}
  
  const seedDatabaseWithTenure = (isActive) => {
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
  
    // Add tenure to persons
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
  
    // Add tenure to asset
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