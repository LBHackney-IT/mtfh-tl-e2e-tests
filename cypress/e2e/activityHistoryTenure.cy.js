import date from "date-and-time";
import { seedDatabase } from "../helpers/DbHelpers";
import { editTenure } from "../../api/tenure";
import ActivityHistoryPageObjects from '../pageObjects/activityHistoryPage';

const activityHistory = new ActivityHistoryPageObjects("tenure");
const tags = ['@activity-history', '@authentication', '@common', '@root'];


describe('Activity History for a tenure', { 'tags': tags }, () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should view activity history', { tags: "@SmokeTest" }, () => {
        cy.getTenureFixture().then((tenure) => {
            // Given & When
            activityHistory.visit(tenure.id, true)
            
            // Then
            cy.contains(tenure.paymentReference).should('be.visible');
            cy.contains(tenure.tenuredAsset.fullAddress).should('be.visible'); // header
            
            activityHistory.activityTable().should('be.visible')
            activityHistory.tableHeaders().forEach(tableHeader => {
                cy.contains(tableHeader).should('be.visible')
            })

            activityHistory.activityTable().should('contain', 'Tenure migrated');

            activityHistory.closeActivityHistory().click()
            cy.url().should("include", tenure.id);
        });
    });

    it('should update activity history', () => {
        cy.getTenureFixture().then(async (tenure) => {
            // Given
            const newTenureType = "Freehold"
            const tenureUpdatedTime = new Date();
            await editTenure(tenure.id, newTenureType).then((response) => {
                expect(response.status).to.equal(204);
                cy.wait(1000); // Wait for the data to be updated
            });

            // When
            activityHistory.visit(tenure.id)

            // Then
            activityHistory.activityTable().should('be.visible');

            const firstRow = activityHistory.activityTableRow().first();
            firstRow.should('contain', `Changed to: ${newTenureType}`)
            firstRow.should('contain', `Previously: ${tenure.tenureType.description}`);
            firstRow.should('contain', date.format(tenureUpdatedTime, "DD/MM/YY"));
            // firstRow.should('contain', date.format(tenureUpdatedTime, "HH:mm"));
            // ^ Flaky test, sometimes it fails because the time might be a minute off (depending on the time the test is run)
        });
    });
});
