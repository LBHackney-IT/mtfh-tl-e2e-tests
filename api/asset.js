const request = require('./requests/requests')
const { endpoint } = require('../cypress/support/endpoints')

const getAsset = (assetId) => new Cypress.Promise((resolve) => {
    cy.request({
        method: 'GET',
        url: `${endpoint('ASSET_ENDPOINT')}/assets/${assetId}`,
        headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` },
        failOnStatusCode: false
    }).then(response => {
        resolve(response)
    })
})

module.exports = {
    getAsset
}
