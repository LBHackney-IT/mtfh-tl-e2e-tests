import ProcessesPageObjects from "../pageObjects/ProcessesPage";
import TenureRequestDocsPageObjects from "../pageObjects/tenureRequestDocumentsPage";
import TenurePageObjects from "../pageObjects/tenurePage";
import TenureReviewDocsPageObjects from "../pageObjects/tenureReviewDocumentsPage";
import ModalPageObjects from "../pageObjects/sharedComponents/modal";
import { seedDatabase } from "../helpers/DbHelpers";
import PersonContactPageObjects from "../pageObjects/personContactPage";

const tenureReviewDocsPage = new TenureReviewDocsPageObjects();
const tenurePage = new TenurePageObjects();
const processPage = new ProcessesPageObjects();
const tenureReqDocsPage = new TenureRequestDocsPageObjects();
const modal = new ModalPageObjects();
const personContactPage = new PersonContactPageObjects();


const tags = ['@process', '@common', '@root', '@authentication', '@personal-details']
const emailAdd = "AutomationTest@test.com";
const phoneNumber = "07788123456";

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

    it('should go to person page on request documents', ()=> {
        cy.getTenureFixture().then((tenureInfo) => {
            manualChecksPass(tenureInfo);
            tenureReqDocsPage.personLink().click();
            tenureReqDocsPage.personLink().invoke('removeAttr', 'target').click();
            cy.url().should('include', '/person/')
            cy.findAllByText('Date of birth:');
        });
    })

    it('should request documents via office appointment', ()=> {
        cy.getTenureFixture().then((tenureInfo) => {
            manualChecksPass(tenureInfo);
            cy.contains('Next').click();
            tenureReqDocsPage.makeAnAppointToCheckSuppDocs().click();
            tenureReqDocsPage.day().clear().type('01');
            tenureReqDocsPage.month().clear().type('10');
            tenureReqDocsPage.year().clear().type('2025');
            tenureReqDocsPage.hour().clear().type('10');
            tenureReqDocsPage.minute().clear().type('10');
            tenureReqDocsPage.ampm().select('AM');
            tenureReqDocsPage.checkboxTenantDeclaration().click();
            tenureReqDocsPage.nextButton().click();
            tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review Documents');
            tenureReqDocsPage.activityHistoryButton().click();
        });
    })

    it('should close case when breach of tenure fails', ()=> {
        cy.getTenureFixture().then((tenureInfo) => {
            const { id: tenureId, householdMembers } = tenureInfo;
            processPage.visit(tenureId);
            processPage.agreementCheckBox().click();
            processPage.startProcessButton().click();
            cy.url().should("include", "processes/soletojoint/");
            cy.findByLabelText(`${householdMembers[1].fullName}`).click();
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
            tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Breach of tenure check');
            tenureReqDocsPage.tenantLiveNoticeYes().click();
            tenureReqDocsPage.cautionaryContactYes().click();
            tenureReqDocsPage.cautionaryContactDenyApp().click();
            tenureReqDocsPage.successionNo().click();

            cy.contains('Next').click();
            cy.contains('Failed breach of tenure check:');
            tenureReviewDocsPage.checkboxConfirmOutcomeLetter().click();
            tenureReviewDocsPage.buttonConfirm().click();
            cy.contains("Thank you for your confirmation");
            cy.contains("This case is now closed and we have recorded this on the system - that you have sent an outcome letter to the resident. The outcome can be viewed in the activity history");
            cy.contains("Return to home page").should('attr', 'href').and('eq','/')
        });

    })

    it('should add or update contact detail in request document page', ()=> {
        cy.getTenureFixture().then((tenureInfo) => {
            manualChecksPass(tenureInfo);
            cy.contains('Next').click();
            cy.contains("Eligibility checks passed");
            cy.contains("Supporting documents");
            tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Request Documents');
            cy.contains("the contact details,").click();
            modal.modalBody().should("contain", "Update contact details");
            modal.modalBody().should("contain", "Add an email address");
            // email
            cy.get(".mtfh-fieldset__content > :nth-child(1) > .govuk-button").click();
            processPage.emailAddress().clear().type(emailAdd);
            cy.contains("Save email address").click();

            // phone number
            personContactPage.addPhoneNumber(
                phoneNumber,
                "test phone description"
            );
            processPage.buttonReturnToApplication().click();
            cy.contains(emailAdd);
            cy.contains(phoneNumber);
            cy.contains("the contact details,").click();
            cy.get("[data-testid=button-remove-email]").click();
            cy.get("[data-testid=button-confirm-remove-email]").click();
            cy.get("[data-testid=button-remove-phone]").click();
            cy.get("[data-testid=button-confirm-remove-phone]").click();
            processPage.buttonReturnToApplication().click();

            cy.contains(emailAdd).should("not.exist");
            cy.contains(phoneNumber).should("not.exist");
            cy.contains("Please add the contact details, it will automatically update the tenant’s contact details as well.")
        })
    })

    it('should error in update contact details', ()=> {
        cy.getTenureFixture().then((tenureInfo) => {
            manualChecksPass(tenureInfo);
            cy.contains('Next').click();
            cy.contains("Eligibility checks passed");
            cy.contains("Supporting documents");
            tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Request Documents');
            cy.contains("the contact details,").click();
            modal.modalBody().should("contain", "Update contact details");
            modal.modalBody().should("contain", "Add an email address");
            cy.contains("Add a phone number").click();
            cy.contains("Save changes").click();
            cy.contains("You must enter a phone number to proceed");
            cy.contains("You must select an option to proceed");
            cy.get(".mtfh-fieldset__content > :nth-child(1) > .govuk-button").click();
            cy.contains("Save email address").click();
            cy.get("#contact-details-email-address-error").should("contain","You must enter an email address to proceed");
        })
    })

    it('review documents screen should work as expected', ()=> {
        cy.getTenureFixture().then((tenureInfo) => {
            manualChecksPass(tenureInfo);
            cy.contains('Next').click();
            tenureReqDocsPage.requestDocsElectronically().click();
            tenureReqDocsPage.checkboxTenantDeclaration().click();
            cy.contains('Next').click();   
            tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review Documents');
            cy.contains('Eligibility checks passed').should('exist');
            cy.contains('Show all eligibility checks');
            cy.contains('Documents requested').should('exist');
            cy.get('a[href*="evidence-store"]').contains('View request in Document Evidence Store');
            tenureReviewDocsPage.photoId().should('exist');
            tenureReviewDocsPage.secondId().should('exist');
            tenureReviewDocsPage.notImmigrationControl().should('exist');
            tenureReviewDocsPage.relationshipProof().should('exist');
            tenureReviewDocsPage.tenantLivingInProperty().should('exist');
            tenureReviewDocsPage.checkboxMakeAnAppointment().should('exist');
            cy.contains('If the documents are not suitable and all avenues to obtain the right documents have been exhausted, then close the case.').should('exist');
            cy.contains('Close Case').should('exist');
            cy.contains('Next').should('be.disabled');

            tenureReviewDocsPage.photoId().click();
            tenureReviewDocsPage.secondId().click();
            tenureReviewDocsPage.notImmigrationControl().click();
            tenureReviewDocsPage.relationshipProof().click();
            tenureReviewDocsPage.tenantLivingInProperty().click();
            cy.contains('Next').should('be.enabled');

            tenureReviewDocsPage.checkboxMakeAnAppointment().click();
            tenureReqDocsPage.day().clear().type('02');
            tenureReqDocsPage.month().clear().type('10');
            tenureReqDocsPage.year().clear().type('2025');
            tenureReqDocsPage.hour().clear().type('11');
            tenureReqDocsPage.minute().clear().type('10');
            tenureReqDocsPage.ampm().select('AM');
            cy.contains('Confirm Appointment').click();
            cy.contains('Office appointment scheduled').should('exist');
            tenureReviewDocsPage.linkChange().should('exist');
        })

    })

    it('should close case at review documents stage', ()=> {
        cy.getTenureFixture().then((tenureInfo) => {
            manualChecksPass(tenureInfo)
            cy.contains('Next').click();
            tenureReqDocsPage.requestDocsElectronically().click();
            tenureReqDocsPage.checkboxTenantDeclaration().click();
            cy.contains('Next').click();
            tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Review Documents');
            cy.contains('Close Case').click();
            cy.on('window:alert', (text) => {
                expect(text).to.contains('Are you sure you want to close this process?');
            });
            tenureReviewDocsPage.reasonCloseCase().clear().type('Test reason for Close case - photo id not given');
            tenureReviewDocsPage.alertCloseCase().click();
            cy.contains('Sole to joint application will be closed');
            cy.contains('Test reason for Close case - photo id not given');
            tenureReviewDocsPage.checkboxConfirmOutcomeLetter().click();
            tenureReviewDocsPage.buttonConfirm().click();
            cy.contains('Thank you for your confirmation');
        });
    })

    it('should submit case for tenure investigation review', ()=> {
        cy.getTenureFixture().then((tenureInfo) => {
            manualChecksPass(tenureInfo);
            cy.contains('Next').click();
            tenureReqDocsPage.requestDocsElectronically().click();
            tenureReqDocsPage.checkboxTenantDeclaration().click();
    
            cy.contains('Next').click();
            tenureReviewDocsPage.photoId().click();
            tenureReviewDocsPage.secondId().click();
            tenureReviewDocsPage.notImmigrationControl().click();
            tenureReviewDocsPage.relationshipProof().click();
            tenureReviewDocsPage.tenantLivingInProperty().click();
            cy.contains('Next').click();
            tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Submit case');
            cy.contains('Eligibility checks passed').should('exist');
            cy.contains('Supporting documents approved').should('exist');
            cy.contains('Show all eligibility checks');
            cy.get('a[href*="evidence-store"]').contains('View documents on the Document Evidence Store');
            tenureReviewDocsPage.headingTenureInvestigation().should('contain.text', 'Tenure Investigation');
            tenureReviewDocsPage.submitButton().click();
            tenureReviewDocsPage.headingTenureInvestigation().should('contain.text', 'Next Steps:');
            tenureReqDocsPage.statusActiveCheck().should('contain.text', 'Finish');
            cy.contains('Continue').click();
            cy.contains("I confirm that the tenure investigation has been completed").should('exist');

        });
    })

})