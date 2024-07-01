import PropertyPageObjects from "../pageObjects/propertyPage";
import NavigationPageObjects from "../pageObjects/sharedComponents/navigation";
import { seedDatabaseWithTenure, seedDatabase, addTestRecordToDatabase } from "../helpers/DbHelpers";
import {
    generateAsset,
    assetModelControlledSubmodels,
    defaultAssetLocation,
    assetCharacteristicsModel,
  } from  "../../api/models/requests/createAssetModel";

const propertyPage = new PropertyPageObjects();
const navigation = new NavigationPageObjects();

const tags = ['@property', '@authentication', '@common', '@root', '@search']

describe('View property page', {'tags': tags}, ()=> {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should view property details page',{'tags': '@SmokeTest'}, ()=> {
        seedDatabaseWithTenure(false);
        cy.getAssetFixture().then((asset) => {
            propertyPage.visit(asset.id);

            const breadCrumb = cy.get('[class*="govuk-back-link lbh-back-link"]');
            breadCrumb.should("be.visible");

            propertyPage.propertyViewSidebar().should("be.visible");
            propertyPage.propertyViewSidebar().contains("Type");
            propertyPage.propertyViewSidebar().contains("UPRN");
            propertyPage.propertyViewSidebar().contains("Reference");

            cy.getAssetFixture().then((assetFixture) => {
                cy.intercept('GET',
                    `*/api/v2/workOrders?propertyReference=${assetFixture.assetId}&PageNumber=1&PageSize=12&StatusCode=20&StatusCode=60&StatusCode=80&StatusCode=90&StatusCode=100&StatusCode=110&StatusCode=120&StatusCode=1000&StatusCode=1010&StatusCode=1080&StatusCode=1090`,
                    { fixture: 'repairs.json' }).as('getRepairs')
            })
        
            cy.wait('@getRepairs').then(() => {
                propertyPage.repairsSelectionBox().should('be.visible')
                propertyPage.repairsList().should('be.visible')
            })
            propertyPage.repairsCardList().contains("In Progress")

            propertyPage.patchDetails().should("be.visible");
            propertyPage.patchDetails().contains("Patch");
            propertyPage.patchDetails().contains("Housing officer");
            propertyPage.patchDetails().contains("Area manager"); 

            propertyPage.tenureDetailsContainer().should("be.visible");
            propertyPage.tenureDetailsContainer().contains("Status");
            propertyPage.tenureDetailsContainer().contains("Start date");
            propertyPage.tenureDetailsContainer().contains("End date");
            propertyPage.tenureDetailsContainer().contains("Type");

            cy.get('a').contains('Tenure').click();
            cy.url().should("include", "tenure");

            navigation.backButton().click();
            cy.contains("Search").should("be.visible");

        });
    })

    it('should have new tenure button if no tenure information is given', ()=> {
        const testAsset = generateAsset();
        addTestRecordToDatabase("Assets", testAsset);

        cy.getAssetFixture().then((asset) => {
            propertyPage.visit(asset.id);

            propertyPage.propertyViewSidebar().should("be.visible");
            propertyPage.propertyViewSidebar().contains("Type");
            propertyPage.propertyViewSidebar().contains("UPRN");
            propertyPage.propertyViewSidebar().contains("Reference");
        });
    })

    it('should expand and collapse additional asset details', ()=> {
        const acCompleteness = "partially-populated"
        const isFullyPopulated = acCompleteness === "populated";
        const assetLocation = { ...defaultAssetLocation, totalBlockFloors: 5 };
        const assetCharacteristics = isFullyPopulated
        ? assetCharacteristicsModel()
        : { yearConstructed: "1984" };
        const assetModel = assetModelControlledSubmodels({
        assetLocation,
        assetCharacteristics,
        });

        addTestRecordToDatabase("Assets", assetModel);

        cy.getAssetFixture().then((asset) => {
            propertyPage.visit(asset.id);

            propertyPage.assetCharacteristicsInfoBlock().should('not.exist');

            propertyPage.propertySpecification().click();
            propertyPage.assetCharacteristicsInfoBlock().should('exist');
            propertyPage.totalBlockFloors().should('contain', asset.assetLocation.totalBlockFloors);
            propertyPage.yearConstructed().should('contain', asset.assetCharacteristics.yearConstructed);
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

            propertyPage.propertySpecification().click();
            propertyPage.assetCharacteristicsInfoBlock().should('not.exist');
            
        })
            

    })


})
