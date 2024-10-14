import ProcessesPageObjects from "../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../pageObjects/tenureRequestDocumentsPage";
import TenureReviewDocsPageObjects from "../pageObjects/tenureReviewDocumentsPage";
import PersonPageObjects from "../pageObjects/personPage";
import PropertyPageObjects from "../pageObjects/propertyPage";
import TenurePageObjects from "../pageObjects/tenurePage";
import { seedDatabase, seedDatabaseWithTenure } from "../helpers/DbHelpers";

const processesPage = new ProcessesPageObjects();
const personPage = new PersonPageObjects();
const propertyPage = new PropertyPageObjects();
const tenurePage = new TenurePageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();
const tenureReviewDocsPage = new TenureReviewDocsPageObjects();


describe('Processes menu', {tags: ['@process', '@common', '@root', '@authentication', '@personal-details']}, ()=> {
    beforeEach(()=> {
        cy.login()
        seedDatabaseWithTenure(true);
    })

    it('should naviage to processes on person, tenure and asset pages', {tags: '@SmokeTest'},()=> {
        cy.getPersonFixture().then(({ id: personId }) => {
            personPage.visit(personId);
            personPage.newProcess().click()
            processesPage.pageTitle()
            processesPage.processesMenuList().should('be.visible')
            cy.contains('Back').click()

            //go to property page
            cy.get(":nth-child(1) > .govuk-link").click({force: true});
            cy.url().should('include', '/property')            
            propertyPage.newProcess().click()
            processesPage.pageTitle()
            processesPage.processesMenuList().should('be.visible')
            cy.contains('Back').click()

            //go to tenure page
            cy.contains('Tenure').click()
            cy.url().should('include', '/tenure')            
            tenurePage.newProcess().click()
            processesPage.pageTitle()
            processesPage.processesMenuList().should('be.visible')
        });
    })

    it('should show process landed page', ()=> {
        seedDatabase()
        cy.getTenureFixture().then((tenureInfo) => {
            processesPage.visit(tenureInfo.id)

            cy.getAssetFixture().then((asset) => {
                const { assetAddress } = asset;
                processesPage.tenureDetails().should("be.visible")
                processesPage.tenureDetails().contains(`Tenure payment ref ${asset.tenure.paymentReference}`)
                processesPage.tenureDetails().contains(`${assetAddress.addressLine1} ${assetAddress.addressLine2} ${assetAddress.addressLine3} ${assetAddress.postCode}`)
            })

            processesPage.startProcessButton().should("be.disabled")
            processesPage.agreementCheckBox().click()
            processesPage.startProcessButton().click()
            cy.url().should("include", "processes/soletojoint/")
            processesPage.headingSoleTenantRequestsAJointTenure().should('be.visible');
            cy.get(`#select-tenant-${tenureInfo.householdMembers[0].id}`).click({ force: true })
            cy.contains("Next").click();
            processesPage.textAutomaticEligibilityChecksPassed().should('be.visible');
            tenureReqDocsPage.selectYesFor12Months().should('exist');
            tenureReqDocsPage.selectNoForOccupyanyOther().should('exist');
            tenureReqDocsPage.selectYesForSurvivorOfOne().should('exist');
            tenureReqDocsPage.selectYesForTenantEvicted().should('exist');
            tenureReqDocsPage.selectYesForImmigrationControl().should('exist');
            tenureReqDocsPage.selectYesForLiveNotice().should('exist');
            tenureReqDocsPage.selectYesForRentArrears().should('exist');
        })
    })
    it('should go back or cancel process', ()=> {
        seedDatabase();
        cy.getTenureFixture().then((tenureInfo) => {
            processesPage.visit(tenureInfo.id)
            processesPage.cancelProcessLink().click()
            cy.getTenureFixture().then((tenureInfo) => {
                cy.url().should("include", `processes/tenure/${tenureInfo.id}`)
            })
        })
        cy.getTenureFixture().then((tenureInfo) => {
            processesPage.visit(tenureInfo.id)
            processesPage.backLink().click()
            cy.getTenureFixture().then((tenureInfo) => {
                cy.url().should("include", `processes/tenure/${tenureInfo.id}`)
            })
        })
    })

    it('should fail automatic checks and close process should be intiated', ()=> {
        seedDatabase()
        cy.getTenureFixture().then((tenureInfo) => {
            processesPage.visit(tenureInfo.id)

            cy.getAssetFixture().then((asset) => {
                const { assetAddress } = asset;
                processesPage.tenureDetails().should("be.visible")
                processesPage.tenureDetails().contains(`Tenure payment ref ${asset.tenure.paymentReference}`)
                processesPage.tenureDetails().contains(`${assetAddress.addressLine1} ${assetAddress.addressLine2} ${assetAddress.addressLine3} ${assetAddress.postCode}`)
            })

            processesPage.startProcessButton().should("be.disabled")
            processesPage.agreementCheckBox().click()
            processesPage.startProcessButton().click()
            cy.url().should("include", "processes/soletojoint/")
            cy.get(`#select-tenant-${tenureInfo.householdMembers[2].id}`).click({ force: true })
            cy.contains("Next").click();
            processesPage.textAutomaticChecksFailed().should('be.visible');
            tenureReviewDocsPage.checkboxConfirmOutcomeLetter().click();
            tenureReviewDocsPage.confirmButton().click();
            cy.contains('Thank you for your confirmation');
            cy.contains("This case is now closed and we have recorded this on the system - that you have sent an outcome letter to the resident. The outcome can be viewed in the activity history");
            cy.contains("Return to home page").should('attr', 'href').and('eq','/')
        })
    })

    it('should fail on manual checks', ()=> {
        seedDatabase()
        cy.getTenureFixture().then((tenureInfo) => {
            processesPage.visit(tenureInfo.id)

            cy.getAssetFixture().then((asset) => {
                const { assetAddress } = asset;
                processesPage.tenureDetails().should("be.visible")
                processesPage.tenureDetails().contains(`Tenure payment ref ${asset.tenure.paymentReference}`)
                processesPage.tenureDetails().contains(`${assetAddress.addressLine1} ${assetAddress.addressLine2} ${assetAddress.addressLine3} ${assetAddress.postCode}`)
            })

            processesPage.startProcessButton().should("be.disabled")
            processesPage.agreementCheckBox().click()
            processesPage.startProcessButton().click()
            cy.url().should("include", "processes/soletojoint/")
            processesPage.headingSoleTenantRequestsAJointTenure().should('be.visible');
            cy.get(`#select-tenant-${tenureInfo.householdMembers[0].id}`).click({ force: true })
            cy.contains("Next").click();
            processesPage.textAutomaticEligibilityChecksPassed().should('be.visible');

            tenureReqDocsPage.selectYesFor12Months().click();
            tenureReqDocsPage.selectNoForOccupyanyOther().click();
            tenureReqDocsPage.selectYesForSurvivorOfOne().click();
            tenureReqDocsPage.selectYesForTenantEvicted().click();
            tenureReqDocsPage.selectYesForImmigrationControl().click();
            tenureReqDocsPage.selectYesForLiveNotice().click();
            tenureReqDocsPage.selectYesForRentArrears().click();
            tenureReqDocsPage.selectNoForHoldATenancyElseWhere().click();

            cy.contains("Next").click();
            processesPage.textAutomaticEligibilityChecksPassed().should('be.visible');
            processesPage.textAutomaticChecksFailed().should('be.visible');
            tenureReviewDocsPage.checkboxConfirmOutcomeLetter().click();
            tenureReviewDocsPage.confirmButton().click();
            cy.contains('Thank you for your confirmation');
            cy.contains("This case is now closed and we have recorded this on the system - that you have sent an outcome letter to the resident. The outcome can be viewed in the activity history");
            cy.contains("Return to home page").should('attr', 'href').and('eq','/')
        })
    })
})
