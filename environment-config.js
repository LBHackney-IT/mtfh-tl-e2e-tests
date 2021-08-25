const environment = Cypress.env('ENVIRONMENT')
let rootUrl = "http://local.hackney.gov.uk"
let searchUrl = "search"
let personUrl = "person"
let personCommentsUrl = "comment/person"
let tenureUrl = "tenure"
let rootComponentPort = "9000"
let property = "property"
let gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_LOCAL')

let baseUrl = `${rootUrl}:${rootComponentPort}`

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
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_PROD')
}

module.exports = {
    searchUrl,
    personUrl,
    personCommentsUrl,
    baseUrl,
    tenureUrl,
    property,
    gssoTestKey
}