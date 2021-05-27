const environment = Cypress.env('ENVIRONMENT')

let rootUrl = "http://local.hackney.gov.uk"
let searchUrl = "search"
let personUrl = "person"
let personCommentsUrl = `comment/${personUrl}`
let rootComponentPort = "9000"

let baseUrl = `${rootUrl}:${rootComponentPort}`

if (environment === 'dev') {
    baseUrl = "https://manage-my-home-development.hackney.gov.uk"
}

if (environment === 'staging') {
    baseUrl = "https://manage-my-home-staging.hackney.gov.uk"
}

if (environment === 'production') {
    baseUrl = "https://manage-my-home.hackney.gov.uk"
}

module.exports = {
    searchUrl,
    personUrl,
    personCommentsUrl,
    baseUrl
}