import { seedDatabaseWithCautionaryAlert } from "../helpers/DbHelpers";

import PersonPageObjects from "../pageObjects/personPage";
import CautionaryAlertViewPageObject from "../../pageObjects/CautionaryAlertViewPage";
const personPO = new PersonPageObjects();
const cautionaryAlertPage = new CautionaryAlertViewPageObject();

const tags = ['@cautionary-alerts', '@authentication', '@common', '@root'];

const getFormattedDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    // On the UI it's DD-MM-YYYY, however, cypress demands the opposite for it to work as expected.
    const typedDate = `${year}-${month}-${day}`;
    return typedDate;
}

describe('View and edit cautionary alerts', { tags: tags }, () => {
    beforeEach(() => {
        seedDatabaseWithCautionaryAlert();
        cy.login();
    });

    it('Can view cautionary alert details from the person page', { tags: "@SmokeTest" }, () => {
        cy.getPersonFixture().then((person) => {
            // Navigate to cautionary alert view page from person page
            personPO.visit(person.id);

            const cautionaryAlertLink = personPO.nthCautionaryAlert(0);
            cautionaryAlertLink.should('exist');
            cautionaryAlertLink.click();
        
            const personFirstName = person.firstName;
            const personLastName = person.surname;
        
            cautionaryAlertPage
              .pageTitle()
              .should('contain', 'Cautionary Alert for')
              .and('contain', personFirstName)
              .and('contain', personLastName)
              
            // Check the cautionary alert details are displayed
            cy.getCautionaryAlertFixture().then((cautionaryAlerts) => {
                const cautionaryAlert = cautionaryAlerts[0];  
                cautionaryAlertPage.dateOfIncidentValue().should('contain', cautionaryAlert.dateOfIncident);
                cautionaryAlertPage.alertCodeValue().should('contain', cautionaryAlert.code);
                cautionaryAlertPage.cautionOnSystemValue().should('contain', cautionaryAlert.cautionOnSystem);
                cautionaryAlertPage.personNameValue().should('contain', cautionaryAlert.name);
                cautionaryAlertPage.reasonValue().should('contain', cautionaryAlert.reason);
                cautionaryAlertPage.assureReferenceValue().should('contain', cautionaryAlert.assureReference);
            });
                
            // Navigate back to the person page
            cautionaryAlertPage.backLink().click();
            const personId = person.id;
            cy.url().should('include', `/person/${personId}`);
        });
    });

    it("Can edit a cautionary alert end date", { tags: "@SmokeTest" }, () => {
        cy.getCautionaryAlertFixture().then((cautionaryAlerts) => {
            const cautionaryAlertId = cautionaryAlerts[0].alertId;
            cautionaryAlertPage.visit(cautionaryAlertId);
        });

        // Enter edit mode
        cautionaryAlertPage.endAlertButton().click();
        cautionaryAlertPage.endDateInput().should('exist');
        cautionaryAlertPage.cancelButton().should('exist');
        cautionaryAlertPage.endAlertButton().should('not.exist');
        cautionaryAlertPage.confirmButton().should('exist');

        // Exit edit mode with cancel button
        cautionaryAlertPage.cancelButton().click();
        cautionaryAlertPage.endDateInput().should('not.exist');
        cautionaryAlertPage.cancelButton().should('not.exist');
        cautionaryAlertPage.endAlertButton().should('exist');
        cautionaryAlertPage.confirmButton().should('not.exist');

        // Attempt to end the alert without entering a date
        cautionaryAlertPage.endAlertButton().click();
        cautionaryAlertPage.confirmButton().click();
        cautionaryAlertPage.endDateInputError().should('exist');
        cautionaryAlertPage.confirmButton().should('be.disabled');

        // Enter an invalid date (in the future)
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 1);
        futureDate = getFormattedDate(futureDate);
        cautionaryAlertPage.endDateInput().click().type(futureDate);
        cautionaryAlertPage.endDateInputError().should('exist');
        cautionaryAlertPage.confirmButton().should('be.disabled');
        
        // Enter a valid date
        const typedDate = getFormattedDate(today);
        cautionaryAlertPage.endDateInput().click().type(typedDate);
        cautionaryAlertPage.endDateInputError().should('not.exist');
        cautionaryAlertPage.confirmButton().should('not.be.disabled');
        cautionaryAlertPage.confirmButton().click();

        // Go back to the person page
        cy.getPersonFixture().then((person) => {
            const personId = person.id;
            cy.url().should('include', `/person/${personId}`) // => true
        });

        cy.reload();
        personPO.pageTitle().should('exist');
        personPO.nthCautionaryAlert(0).should('not.exist');
    });

    // TODO: Not sure if we should keep, we don't test api failures for other features
    it("When an 'End Alert' form submission fails, a Page Error is displayed", () => {
        cy.getCautionaryAlertFixture().then((cautionaryAlerts) => {
            // Set up the endpoint to return a 500 error
            const cautionaryAlertId = cautionaryAlerts[0].alertId;
            cy.setUpEndAlertError(cautionaryAlertId);
            cautionaryAlertPage.visit(cautionaryAlertId);
            
            // Attempt to end the alert
            cautionaryAlertPage.endAlertButton().click();
            const today = new Date();
            const typedDate = getFormattedDate(today);
            cautionaryAlertPage.endDateInput().click().type(typedDate);
            cautionaryAlertPage.confirmButton().click();
            
            // Check the error is displayed & stays on the same page
            cautionaryAlertPage.pageError().should('exist');
            cy.url().should('include', `/cautionary-alerts/alert/${cautionaryAlertId}`);
        });
    });
});
