const saveFixtureData = (tableName, keys, fixtureData) => {
    const filename = "cypress/fixtures/recordsToDelete.json";

    cy.readFile(filename).then((list) => {
        list.push({ tableName: tableName, key: keys })
        cy.writeFile(filename, list)
    })

    if(fixtureData)
        cy.writeFile(`cypress/fixtures/${tableName}.json`, fixtureData)
}

const queueDeletePersonWithId = (id) => {
    saveFixtureData("Persons", { id: id })
}

export default {
    saveFixtureData,
    queueDeletePersonWithId
}