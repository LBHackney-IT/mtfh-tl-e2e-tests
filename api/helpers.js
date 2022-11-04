export const saveFixtureData = (tableName, keys, fixtureData, response) => new Cypress.Promise((resolve, reject) => {
    const filename = "cypress/fixtures/recordsToDelete.json";

    cy.readFile(filename).then((list) => {
        list.push({ tableName: tableName, key: keys })
        cy.writeFile(filename, list)
    })

    if (fixtureData)
        cy.writeFile(`cypress/fixtures/${tableName}.json`, fixtureData)

    if (response)
        resolve(response)

    resolve(fixtureData)
})

export const queueDeletePersonWithId = (id) => {
    saveFixtureData("Persons", { id: id })
}