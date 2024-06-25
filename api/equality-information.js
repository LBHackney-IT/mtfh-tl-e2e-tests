const equalityDetailsModel = require('./models/requests/equalityDetailsModel')
const equalityDetailsEndpoint = Cypress.env('EQUALITY_DETAILS_ENDPOINT')
const url = `${equalityDetailsEndpoint}/equality-information`

const getEqualityDetails = (targetId) => {
    return new Cypress.Promise((resolve) => {
        cy.request({
            method: 'GET',
            url: `${url}?targetId=${targetId}`,
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
            url: `${url}/${targetId}`,
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