import { seedDatabaseWithCautionaryAlert } from "../helpers/DbHelpers";
import PersonPageObjects from "../pageObjects/personPage";
import CautionaryAlertViewPageObject from "../pageObjects/CautionaryAlertViewPage";
const personPO = new PersonPageObjects();
const cautionaryAlertPage = new CautionaryAlertViewPageObject();

const getFormattedDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    // On the UI it's DD-MM-YYYY, however, cypress demands the opposite for it to work as expected.
    const typedDate = `${year}-${month}-${day}`;
    return typedDate;
}

describe("Edit Cautionary Alerts", { tags: ['@cautionary-alerts', '@authentication', '@common', '@root'] }, () => {
    beforeEach(() => {
        seedDatabaseWithCautionaryAlert();
        cy.login();
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
        let futureDate = new Date();
        futureDate.setDate(today.getDate() + 1000);
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
})

