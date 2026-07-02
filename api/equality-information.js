const equalityDetailsModel = require('./models/requests/equalityDetailsModel')
const { endpoint } = require('../cypress/support/endpoints')

const equalityInformationUrl = () => `${endpoint('EQUALITY_DETAILS_ENDPOINT')}/equality-information`

const getEqualityDetails = (targetId) => {
    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'GET',
            url: `${equalityInformationUrl()}?targetId=${targetId}`,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` },
            failOnStatusCode: false
        }).then(response => {
            resolve(response)
        })
    });
}

const editEqualityDetails = (targetId, ifMatch) => {
    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'PATCH',
            body: equalityDetailsModel.equalityDetailsModel,
            url: `${equalityInformationUrl()}/${targetId}`,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}`, 'If-Match': ifMatch }
        }).then((response) => {
            resolve(response)
        })
    });
}

module.exports = {
    getEqualityDetails,
    editEqualityDetails
}
