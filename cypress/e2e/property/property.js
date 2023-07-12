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