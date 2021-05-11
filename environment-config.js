const environment = Cypress.env('ENVIRONMENT')

    // Can be used to target micro-frontend components when testing locally
    // Might be useful to have a mechanism for determining whether you want to run component tests
    // vs full e2e and stub them accordingly depending on that context
let rootUrl = "http://localhost"
let authenticationComponentPort = "8080"
let headerComponentPort = "8081"
let personComponentPort = "8082"
let searchComponentPort = "8083"
let rootComponentPort = "9000"

let baseUrl = `${rootUrl}:${rootComponentPort}`
let authenticationUrl = `${rootUrl}:${authenticationComponentPort}`
let headerUrl = `${rootUrl}:${headerComponentPort}`
let personUrl = `${rootUrl}:${personComponentPort}`
let searchUrl = `${rootUrl}:${searchComponentPort}`

if (environment === 'dev') {
    baseUrl = "https://devenvironment.com"
}

if (environment === 'staging') {
    baseUrl = "https://stagingenvironment.com"
}

if (environment === 'production') {
    baseUrl = "https://productionenvironment.com"
}

module.exports = {
    authenticationUrl,
    headerUrl,
    personUrl,
    searchUrl,
    baseUrl
}