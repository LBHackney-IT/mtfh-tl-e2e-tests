import ProcessesPageObjects from "../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../pageObjects/tenureRequestDocumentsPage";
import TenurePageObjects from "../pageObjects/tenurePage";
import TenureReviewDocsPageObjects from "../pageObjects/tenureReviewDocumentsPage";
import { seedDatabase } from "../helpers/DbHelpers";

const tenureReviewDocsPage = new TenureReviewDocsPageObjects();
const tenurePage = new TenurePageObjects();
const processPage = new ProcessesPageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();

const tags = ['@process', '@common', '@root', '@authentication', '@personal-details']
function manualChecksPass({ id: tenureId, householdMembers }) {
    processPage.visit(tenureId);
    processPage.agreementCheckBox().click();
    processPage.startProcessButton().click();
    cy.url().should("include", "processes/soletojoint/");
    cy.findByLabelText(`${householdMembers[0].fullName}`).click();
    cy.contains('Next').click();
    processPage.textAutomaticEligibilityChecksPassed().should('be.visible');
    tenureReqDocsPage.selectYesFor12Months().click();
    tenureReqDocsPage.selectNoForOccupyanyOther().click();
    tenureReqDocsPage.selectNoForSurvivorOfOne().click();
    tenureReqDocsPage.selectNoForTenantEvicted().click();
    tenureReqDocsPage.selectNoForImmigrationControl().click();
    tenureReqDocsPage.selectNoForLiveNotice().click();
    tenureReqDocsPage.selectNoForRentArrears().click();
    tenureReqDocsPage.selectNoForHoldATenancyElseWhere().click();
    cy.contains('Next').click();
    tenureReqDocsPage.textHeaderNextSteps().should('be.visible');
    tenureReqDocsPage.textPassInitialEligReqs().should('be.visible');
    tenureReqDocsPage.continueButton().click();
    tenureReqDocsPage.textBreachOfTenure().should('be.visible');
    tenureReqDocsPage.statusBreachOfTenureCheck().should('be.visible');
    tenureReqDocsPage.statusActiveCheck().should('be.visible');
    tenureReqDocsPage.statusActiveCheck().should('contain.text','Breach of tenure check');
    tenureReqDocsPage.tenantLiveNoticeNo().click();
    tenureReqDocsPage.cautionaryContactNo().click();
    tenureReqDocsPage.successionNo().click();
};

describe('Request and review documents', {'tags': tags}, ()=> {
    beforeEach(()=> {
        cy.login();
        seedDatabase();
    })

    it('should view request for documents page', ()=> {
        cy.getTenureFixture().then((tenureInfo) => {
            manualChecksPass(tenureInfo);
            cy.get('.govuk-button').contains('Next').click();
            cy.contains("Eligibility checks passed");
            cy.contains("Supporting documents");
            cy.contains("Checking supporting documents");
            cy.get('[data-testid=soletojoint-RequestDocuments] > :nth-child(10)').should('not.be.empty');
            tenureReqDocsPage.requestDocsElectronically().should('exist');
            tenureReqDocsPage.makeAnAppointToCheckSuppDocs().should('exist');
            tenureReqDocsPage.checkboxTenantDeclaration().click();
            cy.contains('Next').click();
            cy.get('#request-type-form-group-error').should('contain.text', 'You must select an option to proceed');
            tenureReqDocsPage.requestDocsElectronically().click();
            tenureReqDocsPage.checkboxTenantDeclaration().click();
            cy.contains('Next').click();
            tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Request Documents');
            tenureReqDocsPage.activityHistoryButton().click();
        });
    })
})