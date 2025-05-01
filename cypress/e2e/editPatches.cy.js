import { seedDatabase } from "../helpers/DbHelpers";
import PropertyPageObjects from "../pageObjects/propertyPage";

const propertyPage = new PropertyPageObjects();


describe("edit patches on property page", {tags: ["@property", "@authentication", "@common", "@root"]}, () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it("should not edit patch name on property page - cancel route", () => {
        cy.getAssetFixture().then((asset) => {
            // Navigate to property page & view patch details
            propertyPage.visit(asset.id);
            propertyPage.patchDetails().should("be.visible");
            propertyPage.patchDetails().contains("Patch");
            propertyPage.patchDetails().contains("Housing officer");
            propertyPage.patchDetails().contains("Area manager");
            
           //Edit patch 

            propertyPage.editPatchButton().click();
            propertyPage.cancelButton().should("be.visible");
            propertyPage.confirmButton().should("be.visible");
            propertyPage.patchNameDropDown().should("be.visible");

            //cancel patch edit
            propertyPage.cancelButton().click();

            propertyPage.cancelButton().should("not.exist");
            propertyPage.confirmButton().should("not.exist"); 
        });
    });

    it("should edit patch name on property page - success route", () => {
        cy.getAssetFixture().then((asset) => {
            // Navigate to property page & view patch details
            propertyPage.visit(asset.id);
            propertyPage.patchDetails().should("be.visible");
            propertyPage.patchDetails().contains("Patch");
            propertyPage.patchDetails().contains("Housing officer");
            propertyPage.patchDetails().contains("Area manager");
            
           //Edit patch 
            propertyPage.editPatchButton().click();
            propertyPage.cancelButton().should("be.visible");
            propertyPage.confirmButton().should("be.visible");
            propertyPage.patchEdit().should("be.visible");

            propertyPage.patchNameDropDown().select("HN1");
            propertyPage.confirmButton().click();
            cy.wait(1000);
            propertyPage.patchNameDropDown().should("not.exist");
            propertyPage.confirmButton().should("not.exist");
            propertyPage.cancelButton().should("not.exist");
            propertyPage.patchDetails().should("be.visible");
            propertyPage.patchDetails().contains("HN1");
            propertyPage.patchDetails().contains("Housing officer");
            propertyPage.patchDetails().contains("Area manager");
            propertyPage.patchDetails().contains("Patch");
        });
    }); 
});