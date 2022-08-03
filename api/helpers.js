const saveFixtureData = (tableName, keys, fixtureData) => {
    const filename = "cypress/fixtures/recordsToDelete.json";

    cy.readFile(filename).then((list) => {
        list.push({ tableName: tableName, key: keys })
        cy.writeFile(filename, list)
    })

    cy.writeFile(`cypress/fixtures/${tableName}.json`, fixtureData)
}

export default {
    saveFixtureData
}