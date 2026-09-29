const RECORDS_TO_DELETE_FILE = "cypress/fixtures/recordsToDelete.json";

// In-memory buffer for deletes queued from intercept callbacks.
// Calling cy.readFile/cy.writeFile from after:response injects commands into the
// Cypress queue and breaks chained DOM commands (e.g. .clear().type()).
const pendingRecordsToDelete = [];

export const flushPendingRecordsToDelete = () => {
    if (!pendingRecordsToDelete.length) {
        return cy.wrap(null, { log: false });
    }

    const pending = pendingRecordsToDelete.splice(0, pendingRecordsToDelete.length);
    return cy.readFile(RECORDS_TO_DELETE_FILE).then((list) => {
        return cy.writeFile(RECORDS_TO_DELETE_FILE, list.concat(pending));
    });
};

const enqueueRecordToDelete = (tableName, keys) => {
    pendingRecordsToDelete.push({ tableName, key: keys });
};

export const saveFixtureData = (tableName, keys, fixtureData, response) => new Cypress.Promise((resolve, reject) => {
    cy.readFile(RECORDS_TO_DELETE_FILE).then((list) => {
        list.push({ tableName: tableName, key: keys })
        cy.writeFile(RECORDS_TO_DELETE_FILE, list)
        if (fixtureData) {
            cy.writeFile(`cypress/fixtures/${tableName}.json`, fixtureData)
        }
    })

    if (response)
        resolve(response)
    else
        resolve(fixtureData)
})

export const saveNonDynamoFixture = (entityName, fixtureData, response) => new Cypress.Promise((resolve, reject) => {
  if (fixtureData)
    cy.writeFile(`cypress/fixtures/${entityName}.json`, fixtureData);

  if (response)
    resolve(response);

  resolve(fixtureData);
});

export const queueDeletePersonWithId = (id) => {
    enqueueRecordToDelete("Persons", { id: id })
}

export const queueDeleteTenureWithId = (id) => {
    enqueueRecordToDelete("Tenures", { id: id })
}

export const queueDeleteProcessWithId = (id) => {
    enqueueRecordToDelete("Processes", { id: id })
}

export const queueDeleteContactDetailsWithId = (id, targetId) => {
    enqueueRecordToDelete("ContactDetails", { id: id, targetId: targetId })
}
