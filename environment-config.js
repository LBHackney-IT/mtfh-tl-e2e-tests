const environment = Cypress.env('ENVIRONMENT')
let rootUrl = "http://local.hackney.gov.uk"
let searchUrl = "search"
let personUrl = "person"
let personCommentsUrl = "comment/person"
let tenureCommentsUrl="comment/tenure"
let tenureUrl = "tenure"
let rootComponentPort = "9000"
let property = "property"
let gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_LOCAL')
let editTenureEndpoint = Cypress.env('EDIT_TENURE_ENDPOINT_LOCAL')

let baseUrl = `${rootUrl}:${rootComponentPort}`

if (environment === 'development') {
    baseUrl = "https://manage-my-home-development.hackney.gov.uk"
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_DEV')
    editTenureEndpoint = Cypress.env('EDIT_TENURE_ENDPOINT_DEVELOPMENT')
}

if (environment === 'staging') {
    baseUrl = "https://manage-my-home-staging.hackney.gov.uk"
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_STAGING')
    editTenureEndpoint = Cypress.env('EDIT_TENURE_ENDPOINT_STAGING')
}

if (environment === 'production') {
    baseUrl = "https://manage-my-home.hackney.gov.uk"
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_PROD')
    editTenureEndpoint = Cypress.env('EDIT_TENURE_ENDPOINT_PRODUCTION')
}

module.exports = {
    searchUrl,
    personUrl,
    personCommentsUrl,
    tenureCommentsUrl,
    baseUrl,
    tenureUrl,
    property,
    gssoTestKey,
    editTenureEndpoint
}