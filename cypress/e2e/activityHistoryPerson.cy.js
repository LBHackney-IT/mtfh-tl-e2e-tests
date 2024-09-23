import date from "date-and-time";
import { seedDatabase } from "../helpers/DbHelpers";
import { editPerson } from "../../api/person";
import { editPersonModel } from "../../api/models/requests/editPersonModel";
import ActivityHistoryPageObjects from '../pageObjects/activityHistoryPage';

const activityHistory = new ActivityHistoryPageObjects("person");

describe('Activity History for a person', { 'tags': ['@activity-history', '@authentication', '@common', '@root'] }, () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should view activity history', { tags: "@SmokeTest" }, () => {
        cy.getPersonFixture().then((person) => {
            activityHistory.visit(person.id, true)
            
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

    //To Fix: fails on pipeline
    it('should update activity history', {'tags': '@ignore'}, () => {
        cy.getPersonFixture().then(async (person) => { 
            const personUpdatedTime = new Date();
            await editPerson(person.id).then((response) => {
                expect(response.status).to.equal(204);
                cy.wait(1000); // Wait for the data to be updated
            });

            activityHistory.visit(person.id)

            activityHistory.activityTable().should('be.visible')
            const firstRow = activityHistory.activityTableRow().first();
            firstRow.should('contain', `Changed to: ${editPersonModel.firstName}`);
            firstRow.should('contain', `Previously: ${person.firstName || "[No entry]"}`);
            firstRow.should('contain', date.format(personUpdatedTime, "DD/MM/YY"));
        });
    });
});
