import ChangeOfNamePageObjects from '../pageObjects/changeOfNamePage';
import ModalPageObjects from '../pageObjects/sharedComponents/modal';
import { queueDeleteProcessWithId, queueDeleteContactDetailsWithId } from "../../api/helpers";
import { seedDatabase, seedDatabaseWithChangeOfNameProcess } from "../helpers/DbHelpers";

const page = new ChangeOfNamePageObjects();
const modal = new ModalPageObjects();
tags = ['@processes', '@authentication', '@common', '@root', '@personal-details'];

describe("Change of Name Process", { tags: tags }, () => {
    let now = new Date();

    const passTime = (minutes) => {
        const ms = minutes * 60000;
        now = new Date(now.getTime() + ms);
        cy.tick(ms);
    }

    beforeEach(() => {
        cy.viewport(1080, 1920); // longer viewport so we can debug easier
        cy.login();
        seedDatabase();
        cy.clock(new Date(now.getTime())); // Freeze time

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
        page.buttonStartProcess().click({ force: true });
        //page.buttonStartProcess().click(); // double click to avoid flakiness
        cy.wait("@createProcess");

        // Enter new name
        cy.contains("Enter tenant's new name").should('be.visible');
        page.nextButton().should('be.disabled');
        page.activeStep().should("be.visible");
        page.activeStep().should("contain.text", "Tenant's new name");
        page.personTitle().select('Mr');
        page.personFirstName().type('CoN First Name');
        page.personLastName().type('CoN Last Name');
        page.nextButton().should('be.enabled');
        page.nextButton().click();

        // Request documents electronically (alternate path - appointment)
        cy.contains("Supporting documents").should('be.visible');
        page.activeStep().should("contain.text", "Request Documents");
        page.nextButton().should('be.disabled');
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
        page.nextButton().click();

        // Review documents (alternate path - appointment)
        page.activeStep().should("contain.text", "Review Documents");
        page.nextButton().should('be.disabled');
        page.photoId().click();
        page.secondId().click();
        page.checkBoxValidExampleOfOne().click();
        page.nextButton().should('be.enabled');
        page.nextButton().click();

        // Tenure Investigation
        cy.contains("Supporting documents approved").should('be.visible');
        cy.contains("Tenure Investigation").should('be.visible');
        page.submitButton().click();
        cy.contains("Next Steps").should('be.visible');
        page.continueButton().click();
        page.activeStep().should("contain.text", "Review application");
        page.confirmButton().should('be.disabled');
        // Approve the application
        page.outcomeTenureApprove().click();
        page.checkboxConfirmTenureInvest().click();
        page.confirmButton().click();
        
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
        passTime(20)
        page.documentsSignedButton().should('be.enabled');
        page.documentsSignedButton().click();

        // Confirm
        page.confirmButton().should('be.disabled');
        page.hasNotifiedResident().click();
        page.confirmButton().should('be.enabled');
        page.confirmButton().click();

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

    it("Can schedule and reschedule documents appointments, then fail when not attended", () => {
        // Seed database with process in NameSubmitted state
        seedDatabaseWithChangeOfNameProcess();
        cy.getProcessFixture().then(({ id: processId }) => {
            page.visitProcessPage(processId);
        });
        
        // Request documents through appointment (alternate path - electronically)
        cy.contains("Supporting documents").should('be.visible');
        page.activeStep().should("contain.text", "Request Documents");
        page.nextButton().should('be.disabled');
        page.makeAnAppointToCheckSuppDocs().click();
        // Book initial appointment
        page.setAppointmentDateTime(new Date(now.getTime() + 600*500)); // 5 minutes from now
        page.checkBoxTenantDeclaration().click();
        page.nextButton().click();
        cy.contains("Office appointment scheduled").should('be.visible');
        // Change appointment time (informal)
        page.changeAppointmentLink().click();
        page.setAppointmentDateTime(new Date(now.getTime() + 600*1000)); // 10 minutes from now
        page.confirmButton().click();
        page.cardHeadersContains("Office appointment missed").should('have.length', 0);

        // Reschedule (formal - missed appointment)
        passTime(11);
        page.changeAppointmentLink().should('not.exist');
        page.rescheduleAppointmentLink().should('exist');
        page.missedAppointmentLink().click();
        page.setAppointmentDateTime(new Date(now.getTime() + 600*500)); // 5 minutes from now
        page.confirmButton().click();
        page.cardHeadersContains("Office appointment missed").should('have.length', 1);

        // // Reschedule (formal - missed appointment again)
        passTime(10);
        page.missedAppointmentClose().click();
        modal.modalBody().should("contain", "Are you sure you want to close this process? You will have to begin the process from the start.");
        modal.closeCaseBack().click();
        page.missedAppointmentClose().click();
        modal.closeCaseReason().type("Missed appointment twice (automated test)");
        modal.closeCaseButton().click();

        // Case closed
        page.cardHeadersContains("Office appointment missed").should('have.length', 2);
        page.cardHeadersContains("Change of name application will be closed").should('have.length', 1);
        page.checkboxConfirmOutcomeLetter().click();
        page.confirmButton().click();
        cy.contains("This case is now closed").should('be.visible');
        // Confirm activity history and person page
        cy.getProcessFixture().then(({ id: processId }) => {
            page.visitActivityHistoryPage(processId);
        });
        cy.contains("Change of Name closed:").should('be.visible');
        cy.contains("Missed appointment twice (automated test)").should('be.visible');

        cy.getPersonFixture().then((person) => {
            page.visitPersonPage(person.id);
            cy.contains(person.firstName).should('exist');
            cy.contains(person.surname).should('exist');
        });
        cy.contains("Automation Test Edit First Name").should('not.exist');
        cy.contains("Automation Test Edit Last Name").should('not.exist');
    });
});
