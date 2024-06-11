import { seedDatabase } from "./common/DbHelpers";

import ActivityHistoryPageObjects from '../pageObjects/activityHistoryPersonPage';
const activityHistoryObjects = new ActivityHistoryPageObjects()

describe('Activity History for a person', () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should view activity history', () => {
        cy.getPersonFixture().then((person) => {
            activityHistoryObjects.visit(person.id)
            cy.intercept("GET", `*/api/v1/activityhistory?pageSize=5&targetId=${person.id}`, { fixture: "activity-history-person.json" }).as("getActivityHistory")
            cy.wait("@getActivityHistory")
            
            activityHistoryObjects.activityTable().should('be.visible')
            activityHistoryObjects.tableHeaders().forEach(tableHeader => {
                cy.contains(tableHeader).should('be.visible')
            })

            cy.contains(person.firstName).should('be.visible')
            cy.contains(person.surname).should('be.visible')

            activityHistoryObjects.closeActivityHistory().click()
            cy.url().should("include", person.id);
        });
    });

    // Uncomment the following code for the 'Update activity history' scenario
    // it('should update activity history', () => {
    //   cy.visit('/edit-person'); // Assuming the edit person page URL is '/edit-person'
    //   cy.selectPreferredMiddleName('<preferredLastName>'); // Assuming you have a custom Cypress command for selecting a preferred middle name
    //   cy.get('.update-button').click(); // Assuming the update person button has a class 'update-button'
    //   cy.visit('/activity-history'); // Assuming the activity history page URL is '/activity-history'
    //   cy.get('.activity-history').should('be.visible'); // Assuming the activity history is displayed in a container with class 'activity-history'
    //   cy.get('.activity-history').should('contain', '<person>'); // Assuming the activity history should contain the person's name
    //   cy.get('.activity-history').should('contain', '<preferredLastName>'); // Assuming the activity history should contain the preferred middle name
    // });
});
