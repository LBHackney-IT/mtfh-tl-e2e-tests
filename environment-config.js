const environment = Cypress.env('ENVIRONMENT')
let rootUrl = "http://local.hackney.gov.uk"
let searchUrl = "search"
let personUrl = "person"
let personCommentsUrl = "comment/person"
let tenureCommentsUrl="comment/tenure"
let propertyCommentsUrl="comment/property"

let tenureUrl = "tenure"
let rootComponentPort = "9000"
let property = "property"
let gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_LOCAL')


let baseUrl = `${rootUrl}:${rootComponentPort}`
const AWS = require("aws-sdk");

const endpoint = Cypress.env('DYNAMODB_ENDPOINT')
const region  = Cypress.env('DYNAMODB_REGION')
const accessKeyId = Cypress.env('DYNAMODB_REGION')
const secretAccessKey= Cypress.env('DYNAMODB_SECRET_ACCESS_KEY')

if (environment === 'local') {
    baseUrl = "http://local.hackney.gov.uk"
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_DEV')

    AWS.config.update({
        region: region,
        endpoint: endpoint,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });
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
    gssoTestKey = Cypress.env('E2E_ACCESS_TOKEN_PROD')
}

module.exports = {
    searchUrl,
    personUrl,
    personCommentsUrl,
    tenureCommentsUrl,
    propertyCommentsUrl,
    baseUrl,
    tenureUrl,
    property,
    gssoTestKey
}