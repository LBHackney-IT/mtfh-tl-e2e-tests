import { seedDatabase } from '../helpers/DbHelpers';
import CautionaryAlertsPageObjects from '../pageObjects/cautionaryAlertsPage';
import PersonPageObjects from '../pageObjects/personPage';

const personPage = new PersonPageObjects();
const caPage = new CautionaryAlertsPageObjects();


describe('Create Cautionary Alerts', { tags: ["@cautionary-alerts", "@authentication", "@common", "@root"] }, () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();

        cy.intercept('POST', `${Cypress.env('CAUTIONARY_ALERT_ENDPOINT')}/cautionary-alerts/`, (req) => {
            req.on('after:response', (res) => {
                if (res.statusCode === 200) {
                    const alertId = res.body.alertId;
                    // TODO: Figure out how to delete cautionary alert
                    // queueDeleteCautionaryAlertWithId(alertId);
                }
            });
        }).as('addCautionaryAlert');
    });

    it('can create a cautionary alert for a person', () => {
        cy.getPersonFixture().then((person) => {
            // Navigate to person page and click on Add cautionary alert link
            personPage.visit(person.id);
            caPage.addCautionaryAlertLink().click();
            caPage.pageHeaderCautionaryAlert().should('contain', 'Add cautionary alert for');

            // Attempt to save without entering any details
            cy.contains('Save and continue').click();
            caPage.assureReferenceFieldErrorMessg().should('contain', 'Enter an Assure reference');
            caPage.dateOfIncidentFieldErrorMessg().should('contain', 'Enter date of incident');
            caPage.selectTypeOfCautionFieldErrorMessg().should('contain', 'Select a type of caution');
            caPage.descriptionOfIncidentFieldErrorMessg().should('contain', 'Enter description of incident');

            // Enter details
            caPage.assureReference().type('121212');
            caPage.dayField().type('01');
            caPage.monthField().type('12');
            caPage.yearField().type('2022');
            caPage.typeOfCaution().select('No Lone Visits');
            caPage.descriptionOfIncident().clear().type('Test Description');
            caPage.saveAndContinueButton().click();

            // Confirm details
            caPage.pageHeaderCautionaryAlert()
                  .should('contain.text', `Check and confirm cautionary alert for ${person.title} ${person.firstName} ${person.surname}`);
            caPage.nthSummaryListRow(0)
                  .should('contain.text', 'Assurance Reference')
                  .and('contain.text', '121212');
            caPage.nthSummaryListRow(1)
                  .should('contain.text', 'Date of incident')
                  .and('contain.text', '01 12 2022');      
            caPage.nthSummaryListRow(2)
                  .should('contain.text', 'Type of caution')
                  .and('contain.text', 'No Lone Visits');
            caPage.nthSummaryListRow(3)
                  .should('contain.text', 'Description')
                  .and('contain.text', 'Test Description');

            // Save cautionary alert
            cy.contains('Save cautionary alert').click();
            cy.wait('@addCautionaryAlert');

            // Check for red bell icon & alert text
            personPage.visit(person.id);
            cy.reload();
            caPage.redBellIconAlert().should('exist');
            cy.contains('No Lone Visits');
        });
    });
});
