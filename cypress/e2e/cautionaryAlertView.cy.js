import { seedDatabaseWithCautionaryAlert } from "../helpers/DbHelpers";

import PersonPageObjects from "../pageObjects/personPage";
import CautionaryAlertViewPageObject from "../pageObjects/CautionaryAlertViewPage";
const personPO = new PersonPageObjects();
const cautionaryAlertPage = new CautionaryAlertViewPageObject();

const tags = ['@cautionary-alerts', '@authentication', '@common', '@root'];

describe('View cautionary alerts', { tags: tags }, () => {
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
});
