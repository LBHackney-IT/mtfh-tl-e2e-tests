import './commands';
import "cypress-real-events/support";
import 'cypress-axe'
require("cypress-plugin-tab");
require('cypress-xpath');
import DynamoDb from "../../api/database/DynamoDb";
import registerCypressGrep from '@cypress/grep';

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

registerCypressGrep();

// TODO: Move this to a helper file
const clearDatabase = () => {
    const filename = "cypress/fixtures/recordsToDelete.json";
    cy.readFile(filename).then((recordsToDelete) => {
        if (recordsToDelete.length) {
            return new Cypress.Promise((resolve) => {
                Promise.all(
                    recordsToDelete.map((record) => DynamoDb.deleteRecord(record))
                ).then(() => {
                    resolve();
                });
            }).then(() => {
                cy.writeFile(filename, []);
                cy.log("Test database records cleared!");
            });
        }
    });
};

before(() => {
    clearDatabase();
});

after(() => {
    clearDatabase();
});
