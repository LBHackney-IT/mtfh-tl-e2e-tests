import envConfig from "../environment-config";

const cautionaryAlertEndpoint =  Cypress.env('CAUTIONARY_ALERT_ENDPOINT')
const url = `${cautionaryAlertEndpoint}/cautionary-alerts`

const createCautionaryAlert = (cautionaryAlert) => new Cypress.Promise((resolve) => {
        cy.request({
            method: 'POST',
            body: cautionaryAlert,
            url,
            headers: { Authorization: `Bearer ${envConfig.gssoTestKey}` }
        }).then(response => {
            resolve(response);
        })
    });


export default createCautionaryAlert;
