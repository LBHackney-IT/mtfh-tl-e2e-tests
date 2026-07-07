import { saveNonDynamoFixture } from "../../api/helpers";
import { generateTenure } from "../../api/models/requests/addTenureModel";
import { asset, generateAsset } from "../../api/models/requests/createAssetModel";
import { person } from "../../api/models/requests/createPersonModel";
import { patch } from "../../api/models/requests/patchModel";
import { cautionaryAlert } from "../../api/models/requests/cautionaryAlertModel";
import { createCautionaryAlert } from "../../api/cautionary-alert";
import { tenureToPersonTenure, tenureToAssetTenure } from "./helpers";
import { changeOfName_Start, changeOfName_NameSubmitted } from "../../api/models/requests/processModel";

const RECORDS_TO_DELETE_FILE = 'cypress/fixtures/recordsToDelete.json';

const queueDatabaseRecord = (dbTableName, testDbRecord, testRecordKey) => {
    cy.task('dynamoDb:create', { tableName: dbTableName, item: testDbRecord });
    cy.readFile(RECORDS_TO_DELETE_FILE).then((list) => {
        list.push({ tableName: dbTableName, key: testRecordKey });
        cy.writeFile(RECORDS_TO_DELETE_FILE, list);
        cy.writeFile(`cypress/fixtures/${dbTableName}.json`, testDbRecord);
    });
};

const queueDatabaseRecordsSequentially = (records, index = 0) => {
    if (index >= records.length) {
        return;
    }

    const [dbTableName, testDbRecord, testRecordKey] = records[index];
    queueDatabaseRecord(dbTableName, testDbRecord, testRecordKey);
    cy.then(() => {
        queueDatabaseRecordsSequentially(records, index + 1);
    });
};

export const addTestRecordToDatabase = (dbTableName, testDbRecord, testRecordKey) => {
    cy.log("Seeding database");
    cy.log(
        `Adding test record to database table ${dbTableName} and creating a record of it in recordsToDelete.json file`,
    );
    queueDatabaseRecord(dbTableName, testDbRecord, testRecordKey);
    cy.log("Database seeded!");
};

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

    queueDatabaseRecordsSequentially([
        ["PatchesAndAreas", patchModel, { id: patchModel.id }],
        ["Assets", assetModel, { id: assetModel.id }],
        ["TenureInformation", tenureModel, { id: tenureModel.id }],
        ["Persons", personModel1, { id: personModel1.id }],
        ["Persons", personModel2, { id: personModel2.id }],
    ]);
};

export const seedDatabaseWithTenure = (isActive) => {
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
        isActive ? "3050-10-13" : "1998-10-13",
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

    queueDatabaseRecordsSequentially([
        ["Assets", assetModel, { id: assetModel.id }],
        ["TenureInformation", tenureModel, { id: tenureModel.id }],
        ["Persons", personModel1, { id: personModel1.id }],
        ["Persons", personModel2, { id: personModel2.id }],
    ]);
};

export const seedDatabaseWithCautionaryAlert = () => {
    cy.log("Creating cautionary alert & entities associated with it").then(() => {
        const assetModel = asset();
        const tenureModel = generateTenure({}, assetModel);
        const personModel = person();
        const personTenure = tenureToPersonTenure(tenureModel);

        personModel.tenures.push(personTenure);
        assetModel.tenure = tenureToAssetTenure(tenureModel);

        const saveNonDynamoRecord = (response) =>
            new Promise((resolve, reject) => {
                console.log("saveNonDynamoRecord data: ", response);
                try {
                    saveNonDynamoFixture("CautionaryAlerts", [response.body], response).then((response) => {
                        resolve(response);
                    });
                } catch (ex) {
                    reject(ex);
                }
            });

        const cautionaryAlertRecord = cautionaryAlert(personModel, assetModel);

        createCautionaryAlert(cautionaryAlertRecord).then((data) => {
            saveNonDynamoRecord(data).then((moreData) => {
                Promise.resolve(moreData);
            });
        });

        queueDatabaseRecordsSequentially([
            ["Assets", assetModel, { id: assetModel.id }],
            ["TenureInformation", tenureModel, { id: tenureModel.id }],
            ["Persons", personModel, { id: personModel.id }],
        ]);
    });
};

export const seedDatabaseWithChangeOfNameProcess = (state) => {
    seedDatabase();
    cy.getPersonFixture().then(({ id: personId }) => {
        let model;
        if (state === "submitted") {
            model = changeOfName_NameSubmitted(personId);
        } else if (state === "started") {
            model = changeOfName_Start(personId);
        }

        addTestRecordToDatabase("Processes", model, { id: model.id });
    });
};
