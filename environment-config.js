const environment = Cypress.env('ENVIRONMENT')

let baseUrl = "http://localhost:9000"
console.log(environment)

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
    baseUrl
}