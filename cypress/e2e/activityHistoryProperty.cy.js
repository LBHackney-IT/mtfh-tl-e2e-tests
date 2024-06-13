import { seedDatabase } from "../helpers/DbHelpers";
import ActivityHistoryPageObjects from '../pageObjects/activityHistoryPage';

const activityHistory = new ActivityHistoryPageObjects("property");
const tags = ['@activity-history', '@authentication', '@common', '@root'];


describe('Activity History for a property', { 'tags': tags }, () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should view activity history', () => {
        cy.getAssetFixture().then((asset) => {
            // Given & When
            activityHistory.visit(asset.id, true)
            
            // Then
            cy.contains(asset.assetAddress.postCode).should('be.visible'); // header
            activityHistory.activityTable().should('be.visible')
            activityHistory.tableHeaders().forEach(tableHeader => {
                cy.contains(tableHeader).should('be.visible')
            })

            cy.getActivityHistoryPropertyFixture().then((patchesActivityHistory) => {
                var ahItem = patchesActivityHistory["results"][0]
                cy.contains(ahItem.oldData.name).should('be.visible');
                cy.contains(ahItem.oldData.contactDetails.emailAddress).should('be.visible');
                cy.contains(ahItem.newData.name).should('be.visible');
                cy.contains(ahItem.newData.contactDetails.emailAddress).should('be.visible');
            })

            activityHistory.closeActivityHistory().click()
            cy.url().should("include", asset.id);
        });
    });

    // TODO: Add test to update activity history for a property
});
