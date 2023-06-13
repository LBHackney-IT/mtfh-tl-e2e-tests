const environment = Cypress.env('ENVIRONMENT')
let rootUrl = "http://localdev.hackney.gov.uk"
let searchUrl = "search"
let personUrl = "person"
let personCommentsUrl = "comment/person"
let tenureCommentsUrl="comment/tenure"
let propertyCommentsUrl="comment/property"
let startSoleToJointProcessUrl="processes/soletojoint/start/tenure"
let alertPreviewUrl="cautionary-alerts/alert"

let tenureUrl = "tenure"
let rootComponentPort = "9000"
let property = "property"
let gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_LOCAL')
let baseUrl = `${rootUrl}:${rootComponentPort}`

if (environment === 'local') {
    baseUrl = "https://manage-my-home-development.hackney.gov.uk"
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_LOCAL')
}

if (environment === 'development') {
    baseUrl = "https://manage-my-home-development.hackney.gov.uk"
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_DEV')
}

if (environment === 'staging') {
    baseUrl = "https://manage-my-home-staging.hackney.gov.uk"
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_STAGING')
}

if (environment === 'production') {
    baseUrl = "https://manage-my-home.hackney.gov.uk"
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_PRODUCTION')
}

module.exports = {
    searchUrl,
    personUrl,
    personCommentsUrl,
    tenureCommentsUrl,
    propertyCommentsUrl,
    startSoleToJointProcessUrl,
    alertPreviewUrl,
    baseUrl,
    tenureUrl,
    property,
    gssoTestKey
}
