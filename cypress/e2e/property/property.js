import { And, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import asset from '../../../api/asset';
import PersonPageObjects from "../../pageObjects/personPage";
import PropertyPageObjects from "../../pageObjects/propertyPage";

const propertyPage = new PropertyPageObjects();
const personPage = new PersonPageObjects();

When("I click on the view tenure button", () => {
    //propertyPage.viewTenureButton().click();
    cy.get('a').contains('Tenure').click();
});
Then("tenure page is displayed", () => {
    cy.url().should("include", "tenure");
})

And('I retrieve the asset via Asset API', () => {
    cy.log("Getting asset");
    cy.getAssetFixture().then((assetFixture) => {
        asset.getAsset(assetFixture.id).then((response) => {
            cy.log(`Status code ${response.status} returned`)
            assert.deepEqual(response.status, 200)
            assert.deepEqual(response.body.assetType, assetFixture.assetType)
        });
    })
})

When('I navigate to the asset page', () => {
    cy.getAssetFixture().then((assetFixture) => {
        propertyPage.visit(assetFixture.id)
    });
})

And('I am shown an error message', () => {
    propertyPage.propertyPage().contains('could not be loaded.')
})

Then('the repairs container is displayed', () => {
    cy.getAssetFixture().then((assetFixture) => {
        cy.intercept('GET',
            `*/api/v2/workOrders?propertyReference=${assetFixture.assetId}&PageNumber=1&PageSize=12&StatusCode=20&StatusCode=60&StatusCode=80&StatusCode=90&StatusCode=100&StatusCode=110&StatusCode=120&StatusCode=1000&StatusCode=1010&StatusCode=1080&StatusCode=1090`,
            { fixture: 'repairs.json' }).as('getRepairs')
    })

    cy.wait('@getRepairs').then(() => {
        propertyPage.repairsSelectionBox().should('be.visible')
        propertyPage.repairsList().should('be.visible')
    })
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
Then('the personal details are displayed', () => {
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
