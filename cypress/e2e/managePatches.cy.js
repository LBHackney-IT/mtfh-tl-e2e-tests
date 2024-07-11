import { seedDatabase } from "../helpers/DbHelpers";
import ManagePatchesPageObjects from "../pageObjects/managePatchesPage";
import PropertyPageObjects from "../pageObjects/propertyPage";

const patchesPage = new ManagePatchesPageObjects();
const propertyPage = new PropertyPageObjects();
const tags = ["@property", "@authentication", "@common", "@root", "@search"]

describe("View and manage patch and area assignment", {tags: tags}, () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it("should navigate to manage patches from property, view details, and return to property", () => {
        cy.getAssetFixture().then((asset) => {
            // Navigate to property page & view patch details
            propertyPage.visit(asset.id);
            propertyPage.patchDetails().should("be.visible");
            propertyPage.patchDetails().contains("Patch");
            propertyPage.patchDetails().contains("Housing officer");
            propertyPage.patchDetails().contains("Area manager");
            
            // View all patches and areas
            propertyPage.managePatchesButton().click();
            cy.url().should('include', 'all-patches-and-areas');
            cy.contains('Patches and areas').should('be.visible');
            patchesPage.patchRow('SN Area').should('be.visible');
            
            // Navigate back to property page
            patchesPage.backLink().click();
            cy.url().should('include', `/property/${asset.id}`);
        });
    });

    it("Can manage patches", () => {
        patchesPage.visit();
        cy.url().should('include', 'all-patches-and-areas');
        cy.contains('Patches and areas').should('be.visible');
        // Check all patches are visible
        patchesPage.areaDropdown().get(":selected").should('contain', 'All');
        patchesPage.patchRow('SN1').should('be.visible');
        patchesPage.patchRow('CL1').should('be.visible');
        
        // Filter by area
        patchesPage.areaDropdown().select('CL Area');
        patchesPage.patchRow('SN1').should('not.exist');
        patchesPage.patchRow('CL1').should('be.visible');
        patchesPage.areaDropdown().select('SN Area');
        patchesPage.patchRow('SN1').should('be.visible');
        patchesPage.patchRow('CL1').should('not.exist');

        // Unassign patch
        patchesPage.areaDropdown().select('All');
        patchesPage.unassignPatch('SN1');
        cy.reload();
        patchesPage.patchRow('SN1')
                         .should('be.visible')
                         .and('not.contain', '@hackney.gov.uk');
        // Reassign patch
        patchesPage.reassignPatch('SN1', 'John Doe', 'john.doe@hackney.gov.uk')
        patchesPage.patchRow('SN1')
                         .should('be.visible')
                         .and('contain', 'John Doe')
                         .and('contain', 'john.doe@hackney.gov.uk');
    });
});
