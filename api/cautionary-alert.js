
const cautionaryAlertEndpoint =  Cypress.env('CAUTIONARY_ALERT_ENDPOINT')
const url = `${cautionaryAlertEndpoint}/cautionary-alerts`

export const createCautionaryAlert = (cautionaryAlert) => new Cypress.Promise((resolve) => {
        cy.request({
            method: 'POST',
            body: cautionaryAlert,
            url,
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` }
        }).then(response => {
            resolve(response);
        })
    });