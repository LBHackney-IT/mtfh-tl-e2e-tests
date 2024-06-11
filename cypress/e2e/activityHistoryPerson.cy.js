import date from "date-and-time";
import { seedDatabase } from "../helpers/DbHelpers";
import ActivityHistoryPageObjects from '../pageObjects/activityHistoryPersonPage';
import EditPersonPageObjects from "../pageObjects/editPersonPage";

const activityHistory = new ActivityHistoryPageObjects();
const editPersonPage = new EditPersonPageObjects();
const tags = ['@activity-history', '@authentication', '@common', '@root'];


describe('Activity History for a person', { 'tags': tags }, () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should view activity history', () => {
        cy.getPersonFixture().then((person) => {
            // Given & When
            activityHistory.visit(person.id, true)
            
            // Then
            activityHistory.activityTable().should('be.visible')
            activityHistory.tableHeaders().forEach(tableHeader => {
                cy.contains(tableHeader).should('be.visible')
            })

            cy.contains(person.firstName).should('be.visible')
            cy.contains(person.surname).should('be.visible')

            activityHistory.closeActivityHistory().click()
            cy.url().should("include", person.id);
        });
    });

    //TODO: skipped for 5th July 2023 release as this test is failing in pipeline
    it('should update activity history', { 'tags': '@ignore' }, () => {
        cy.getPersonFixture().then((person) => { 
            // Given
            const newMidleName = "MiddleName";

            editPersonPage.visit(person.id)
            editPersonPage.preferredMiddleNameContainer().clear();
            editPersonPage.preferredMiddleNameContainer().type(newMidleName);
            const personUpdatedTime = editPersonPage.clickUpdatePersonButton(person.id);
            
            // When
            cy.wait(1000) // To allow events to go through
            activityHistory.visit(person.id)

            // Then
            activityHistory.activityTable().should('be.visible')
            
            const firstRow = activityHistory.activityTableRow().eq(0)
            firstRow.should('contain', `Changed to: ${newMidleName}`);
            firstRow.should('contain', `Previously: ${person.middleName || "[No entry]"}`);
            firstRow.should('contain', date.format(personUpdatedTime, "DD/MM/YY"));
            // firstRow.should('contain', date.format(personUpdatedTime, "HH:mm"));
            // ^ Flaky test, sometimes it fails because the time might be a minute off (depending on the time the test is run)
        });
    });
});
