
import { endpoint } from '../cypress/support/endpoints'

const cautionaryAlertsUrl = () => `${endpoint('CAUTIONARY_ALERT_ENDPOINT')}/cautionary-alerts`

export const createCautionaryAlert = (cautionaryAlert) => new Cypress.Promise((resolve) => {
        cy.request({
            method: 'POST',
            body: cautionaryAlert,
            url: cautionaryAlertsUrl(),
            headers: { Authorization: `Bearer ${Cypress.config("gssoTestKey")}` }
        }).then(response => {
            resolve(response);
        })
    });