import date from "date-and-time";
import { seedDatabase } from "../helpers/DbHelpers";
import ActivityHistoryPageObjects from '../pageObjects/activityHistoryPersonPage';
import EditPersonPageObjects from "../pageObjects/editPersonPage";

const activityHistory = new ActivityHistoryPageObjects();
const editPersonPage = new EditPersonPageObjects();



describe('Activity History for a person', () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should view activity history', () => {
        cy.getPersonFixture().then((person) => {
            // Given & When
            activityHistory.visit(person.id)
            
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
    it('should update activity history', () => {
        cy.getPersonFixture().then((person) => { 
            // Given
            const newMidleName = "MiddleName";

            editPersonPage.visit(person.id)
            editPersonPage.preferredMiddleNameContainer().clear();
            editPersonPage.preferredMiddleNameContainer().type(newMidleName);
            const personUpdatedTime = editPersonPage.clickUpdatePersonButton();
            
            // When
            cy.wait(1000) // To allow events to go through
            activityHistory.visit(person.id)

            // Then
            activityHistory.activityTable().should('be.visible')
            
            activityTableRowShouldContainText(0, {
                date: date.format(personUpdatedTime, "DD/MM/YY HH:mm"),
                category: "Person",
                editDetails: `Changed to: ${newMidleName}`
            });
        });
    });
});
