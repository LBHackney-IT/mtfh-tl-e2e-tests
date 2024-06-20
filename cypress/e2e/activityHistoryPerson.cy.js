import date from "date-and-time";
import { seedDatabase } from "../helpers/DbHelpers";
import { editPerson } from "../../api/person";
import { editPersonModel } from "../../api/models/requests/editPersonModel";
import ActivityHistoryPageObjects from '../pageObjects/activityHistoryPage';

const activityHistory = new ActivityHistoryPageObjects("person");
const tags = ['@activity-history', '@authentication', '@common', '@root'];


describe('Activity History for a person', { 'tags': tags }, () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should view activity history', { tags: "@SmokeTest" }, () => {
        cy.getPersonFixture().then((person) => {
            // Given & When
            activityHistory.visit(person.id, true)
            
            // Then
            cy.contains(person.firstName).should('be.visible')
            cy.contains(person.surname).should('be.visible')

            activityHistory.activityTable().should('be.visible')
            activityHistory.tableHeaders().forEach(tableHeader => {
                cy.contains(tableHeader).should('be.visible')
            })

            cy.getActivityHistoryPersonFixture().then((activityHistoryRecord) => {
                // TODO: Possibly move to helper
                // Validate the first row of the activity history table
                const firstRow = activityHistory.activityTableRow().first();
                const firstActivityItem = activityHistoryRecord["results"][0];
                
                for (const dataValue of Object.values(firstActivityItem.oldData)) {
                    firstRow.should('contain', `Previously: ${dataValue}`);
                }

                for (const dataValue of Object.values(firstActivityItem.newData)) {
                    firstRow.should('contain', `Changed to: ${dataValue}`);
                }
            })
            
            activityHistory.closeActivityHistory().click()
            cy.url().should("include", person.id);
        });
    });

    it('should update activity history', () => {
        cy.getPersonFixture().then(async (person) => { 
            // Given
            const personUpdatedTime = new Date();
            await editPerson(person.id).then((response) => {
                expect(response.status).to.equal(204);
                cy.wait(1000); // Wait for the data to be updated
            });

            // When
            activityHistory.visit(person.id)

            // Then
            activityHistory.activityTable().should('be.visible')
            const firstRow = activityHistory.activityTableRow().first();
            firstRow.should('contain', `Changed to: ${editPersonModel.firstName}`);
            firstRow.should('contain', `Previously: ${person.firstName || "[No entry]"}`);
            firstRow.should('contain', date.format(personUpdatedTime, "DD/MM/YY"));
            // firstRow.should('contain', date.format(personUpdatedTime, "HH:mm"));
            // ^ Flaky test, sometimes it fails because the time might be a minute off (depending on the time the test is run)
        });
    });
});
