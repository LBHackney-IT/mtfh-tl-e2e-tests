const request = require('./requests/requests')
const equalityDetailsModel = require('./models/requests/equalityDetailsModel')
const envConfig = require("../environment-config");
const { saveFixtureData } = require("./helpers");
const equalityDetailsEndpoint = Cypress.env('EQUALITY_DETAILS_ENDPOINT')
const url = `${equalityDetailsEndpoint}/equality-information`

const getEqualityDetails = (targetId) => {
    return new Cypress.Promise((resolve, reject) => {
        cy.request({
            method: 'GET',
            url: `${url}?targetId=${targetId}`,
            headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` },
            failOnStatusCode: false
        }).then(response => {
            resolve(response)
        })
    });
}

const editEqualityDetails = async (targetId, ifMatch) => {
    return new Cypress.Promise((resolve, reject) => {
        cy.request({
            method: 'PATCH',
            body: equalityDetailsModel.equalityDetailsModel,
            url: `${url}/${targetId}`,
            headers: { Authorization: `Bearer ${envConfig.gssoTestKey}`, 'If-Match': ifMatch }
        }).then((response) => {
            resolve(response)
        })
    });
}

module.exports = {
    getEqualityDetails,
    editEqualityDetails
}