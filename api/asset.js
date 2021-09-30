const request = require('./requests/requests')
const assetEndpoint = Cypress.env('ASSET_ENDPOINT')

const getAsset = async(assetId) => {
    const response = await request.getRequest(`${assetEndpoint}/assets/${assetId}`)
    return response
}

module.exports = {
    getAsset
}