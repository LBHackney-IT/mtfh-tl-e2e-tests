const request = require('./requests/requests')
const envConfig = require("../environment-config");
const assetEndpoint = Cypress.env('ASSET_ENDPOINT')

const getAsset = (assetId) => new Cypress.Promise((resolve) => {
    cy.request({
        method: 'GET',
        url: `${assetEndpoint}/assets/${assetId}`,
        headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` },
        failOnStatusCode: false
    }).then(response => {
        resolve(response)
    })
})

module.exports = {
    getAsset
}