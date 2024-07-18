import ChangeOfNamePageObjects from '../pageObjects/changeOfNamePage';
import ModalPageObjects from '../pageObjects/sharedComponents/modal';
import { queueDeleteProcessWithId, queueDeleteContactDetailsWithId } from "../../api/helpers";
import { seedDatabase } from "../helpers/DbHelpers";

const page = new ChangeOfNamePageObjects();
const modal = new ModalPageObjects();
tags = ['@processes', '@authentication', '@common', '@root', 'personal-details'];

describe("Change of Name Process", { tags: tags }, () => {
    const now = new Date();

    beforeEach(() => {
        cy.login();
        seedDatabase();
        cy.clock(now.getTime()); // Freeze time

        // cleanup
        cy.intercept('POST', '**/api/v2/process/changeofname', (req) => {
            req.on('after:response', (res) => {
                if (res.statusCode === 201) {
                    const processId = res.body.id;
                    queueDeleteProcessWithId(processId);
                }
            });
        }).as('createProcess');

        cy.intercept('POST', '**/api/v2/contactDetails', (req) => {
            req.on('after:response', (res) => {
                if (res.statusCode === 201) {
                    const contactId = res.body.id;
                    const targetId = res.body.targetId;
                    queueDeleteContactDetailsWithId(contactId, targetId);
                }
            });
        }).as('createContactDetails');
    });

    it("Happy path - Can successfully update a person's name", { tags: "@SmokeTest" }, () => {
        // Start Process
        cy.getPersonFixture().then(({ id: personId }) => {
            page.visitStartPage(personId);
        });
        cy.contains('Change of Name').should('be.visible');
        page.buttonStartProcess().should('be.disabled');
        page.checkBoxTenantInfo().click();
        page.buttonStartProcess().should('be.enabled');
        page.buttonStartProcess().click();
        cy.wait("@createProcess");

        // Enter new name
        cy.contains("Enter tenant's new name").should('be.visible');
        page.buttonNext().should('be.disabled');
        page.activeStep().should("be.visible");
        page.activeStep().should("contain.text", "Tenant's new name");
        page.personTitle().select('Mr');
        page.personFirstName().type('CoN First Name');
        page.personLastName().type('CoN Last Name');
        page.buttonNext().should('be.enabled');
        page.buttonNext().click();

        // Request documents electronically (alternate path - appointment)
        cy.contains("Supporting documents").should('be.visible');
        page.activeStep().should("contain.text", "Request Documents");
        page.buttonNext().should('be.disabled');
        page.requestDocsElectronically().click();
        
        // Add contact details
        page.promptAddContactDetails().click();
        modal.modalBody().should("contain", "Update contact details");
        modal.modalBody().should("contain", "Add an email address");
        
        cy.contains("Add an email address").click();
        page.emailAddress().clear().type("test@test.com");
        cy.contains("Save email address").click();
        cy.contains("Add a phone number").click();
        page.phoneNumberType().select('Main number');
        page.phoneNumber().clear().type("07777777777");
        cy.contains("Save changes").click();
        page.modalReturn().click();
        
        page.checkBoxTenantDeclaration().click();
        cy.contains('Next').click();

        // Review documents (alternate path - appointment)
        page.activeStep().should("contain.text", "Review Documents");
        page.buttonNext().should('be.disabled');
        page.photoId().click();
        page.secondId().click();
        page.checkBoxValidExampleOfOne().click();
        page.buttonNext().should('be.enabled');
        page.buttonNext().click();

        // Tenure Investigation
        cy.contains("Supporting documents approved").should('be.visible');
        cy.contains("Tenure Investigation").should('be.visible');
        page.submitButton().click();
        cy.contains("Next Steps").should('be.visible');
        page.continueButton().click();
        page.activeStep().should("contain.text", "Review application");
        page.buttonConfirm().should('be.disabled');
        // Approve the application
        page.outcomeTenureApprove().click();
        page.checkboxConfirmTenureInvest().click();
        page.buttonConfirm().click();
        
        // Housing Officer review
        cy.contains("Next steps").should('be.visible');
        cy.contains("Tenure investigator recommendation: Approve application").should('be.visible');
        page.optionAHMReview().click(); // Alternate path - Appointment
        page.ahmDecisionApprove().click();
        // Try to submit without entering ahm name 
        page.ahmConfirmButton().click();
        page.errorAreaHousingManagerName().should('exist');
        // Type in name + confirm
        page.checkBoxAhmApproved().click();
        page.ahmNameInput().clear().type('AHM Test Manager');
        // changeOfName.ahm
        cy.contains('Confirm').click();

        // Tenure Appointment 
        cy.contains('Supporting documents approved');
        cy.contains('Tenure investigator recommendation: Approve application');
        cy.contains('Housing Officer reviewed and Area Housing Manager: Approve application');
        // Try to set appointment to current time
        page.setAppointmentDateTime(now);
        page.continueButton().click();
        page.errorMessage().should('contain','The date and time must be in the future');
        // Set appointment to 10 minutes from now
        const appointmentTime = new Date(now.getTime() + 600*1000);
        page.setAppointmentDateTime(appointmentTime);
        page.continueButton().click();
        
        // Sign documents
        cy.contains("Office appointment scheduled").should('be.visible');
        page.documentsSignedButton().should('be.disabled');
        cy.tick(600*2000); // Move time forward by 20 minutes
        page.documentsSignedButton().should('be.enabled');
        page.documentsSignedButton().click();

        // Confirm
        page.buttonConfirm().should('be.disabled');
        page.hasNotifiedResident().click();
        page.buttonConfirm().should('be.enabled');
        page.buttonConfirm().click();

        // Success
        cy.contains('Thank you for your confirmation').should('be.visible');
        cy.contains('Tenancy updated').should('be.visible');

        // Check the person's name has been updated
        cy.getPersonFixture().then(({ id: personId }) => {
            page.visitPersonPage(personId);
        });
        cy.contains('CoN First Name').should('exist');
        cy.contains('CoN Last Name').should('exist');
    });
});
