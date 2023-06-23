import { When, Then, And, Given } from "@badeball/cypress-cucumber-preprocessor";
import asset from '../../../api/asset'
import { property } from "../../../environment-config";
import PropertyPageObjects from "../../pageObjects/propertyPage";
import PersonPageObjects from "../../pageObjects/personPage";

const propertyPage = new PropertyPageObjects();
const personPage = new PersonPageObjects();

When("I click on the view tenure button", () => {
  //propertyPage.viewTenureButton().click();
    cy.get('a').contains('Tenure').click();
});
Then("tenure page is displayed", () => {
    cy.url().should("include", "tenure");
})

const assetModel = require('../../../api/models/responses/assets/assetModel')

Given('I check the asset API for {string}', (assetId) => {
    cy.log("Getting asset");
    asset.getAsset(assetId).then((response) => {
        cy.log(`Status code ${response.status} returned`)
        assert.deepEqual(response.status, 200)
        assert.deepEqual(response.body.assetType, assetModel.assetModelWithValidAssetType.assetType)
    });
})

When('I navigate to the asset page {string}', (assetId) => {
    propertyPage.visit(assetId)
})

And('I am shown an error message', () => {
    propertyPage.propertyPage().contains('could not be loaded.')
})

Then('the repairs container is displayed', () => {
    propertyPage.repairsSelectionBox().should('be.visible')
    propertyPage.repairsList().should('be.visible')
})

Then('I set the the repair type to {string}', (repairType) => {
    propertyPage.repairsSelectionBox().select(`repairs ${repairType.toLowerCase()}`)
})

And('the repairs card list is displayed {string}', (repairType) => {
    propertyPage.repairsCardList().contains(repairType)
})
Then("Tenure information displays status as Inactive", () => {
  propertyPage.tenureStatusInactive().should('be.visible');
});
Then("No tenure is displayed", () => {
  cy.contains("No tenure")
});
Then("New Tenure button should be displayed", () => {
    propertyPage.newTenureButton().should('be.visible');
});

Then("I am on the Tenure search results page for {string}", (tenure) => {
    cy.findAllByText('Search Results').should('exist');
});
When("I select tenure", () => {
    propertyPage.selectFirstRecord().click();
});
Then('the personal details are displayed' ,() => {
    personPage.sidebar().contains('Date of birth');
    personPage.sidebar().contains('Correspondence address 1');
});
When("I select a property", () => {
    propertyPage.selectFirstRecord().click();
})

Then("The 'Property Specification' information should be invisible", () => {
    propertyPage.assetCharacteristicsInfoBlock().should('not.exist');
});
When("Click the 'Property Specification' section", () => {
    propertyPage.propertySpecification().click();
});
Then("The 'Property Specification' information becomes visible", () => {
    propertyPage.assetCharacteristicsInfoBlock().should('exist');
});
And("The displayed asset characteristics information is correct", () => {
    cy.getAssetFixture().then((databaseAsset) => {
        propertyPage.numberOfBedrooms().should('contain', databaseAsset.assetCharacteristics.numberOfBedrooms);
        propertyPage.numberOfLifts().should('contain', databaseAsset.assetCharacteristics.numberOfLifts);
        propertyPage.numberOfSingleBeds().should('contain', databaseAsset.assetCharacteristics.numberOfSingleBeds);
        propertyPage.numberOfDoubleBeds().should('contain', databaseAsset.assetCharacteristics.numberOfDoubleBeds);
        propertyPage.numberOfLivingRooms().should('contain', databaseAsset.assetCharacteristics.numberOfLivingRooms);
        propertyPage.numberOfFloors().should('contain', databaseAsset.assetCharacteristics.numberOfFloors);
        propertyPage.totalBlockFloors().should('contain', databaseAsset.assetLocation.totalBlockFloors);
        propertyPage.heating().should('contain', databaseAsset.assetCharacteristics.heating);
        propertyPage.windowType().should('contain', databaseAsset.assetCharacteristics.windowType);
        propertyPage.propertyFactor().should('contain', databaseAsset.assetCharacteristics.propertyFactor);
        propertyPage.yearConstructed().should('contain', databaseAsset.assetCharacteristics.yearConstructed);
        propertyPage.architecturalType().should('contain', databaseAsset.assetCharacteristics.architecturalType);
    });
});
Then("The empty asset characteristics fields are displayed as empty", () => {
    cy.getAssetFixture().then((databaseAsset) => {
        propertyPage.totalBlockFloors().should('contain', databaseAsset.assetLocation.totalBlockFloors);
        propertyPage.yearConstructed().should('contain', databaseAsset.assetCharacteristics.yearConstructed);

        propertyPage.numberOfBedrooms().find('dd').should('have.text', ' ');
        propertyPage.numberOfLifts().find('dd').should('have.text', ' ');
        propertyPage.numberOfSingleBeds().find('dd').should('have.text', ' ');
        propertyPage.numberOfDoubleBeds().find('dd').should('have.text', ' ');
        propertyPage.numberOfLivingRooms().find('dd').should('have.text', ' ');
        propertyPage.numberOfFloors().find('dd').should('have.text', ' ');
        propertyPage.heating().find('dd').should('have.text', ' ');
        propertyPage.windowType().find('dd').should('have.text', ' ');
        propertyPage.propertyFactor().find('dd').should('have.text', ' ');
        propertyPage.architecturalType().find('dd').should('have.text', ' ');
    });
});
