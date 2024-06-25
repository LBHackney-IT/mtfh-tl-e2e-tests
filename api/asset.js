const request = require('./requests/requests')
const assetEndpoint = Cypress.env('ASSET_ENDPOINT')

const getAsset = (assetId) => new Cypress.Promise((resolve) => {
    cy.request({
        method: 'GET',
        url: `${assetEndpoint}/assets/${assetId}`,
        headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` },
        failOnStatusCode: false
    }).then(response => {
        resolve(response)
    })
})

module.exports = {
    getAsset
}