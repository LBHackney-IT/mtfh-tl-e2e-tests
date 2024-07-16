import { seedDatabaseWithTenure } from "../helpers/DbHelpers";
import { queueDeletePersonWithId } from "../../api/helpers";

import AddPersonFormObjects from '../pageObjects/addPersonForm';
const addPersonPage = new AddPersonFormObjects();
const tags = ['@activity-history', '@authentication', '@common', '@root'];

describe('Add a new person to a tenure', { tags: tags }, () => {
    beforeEach(() => {
        cy.login();
        seedDatabaseWithTenure(true);

        cy.intercept('POST', '**/api/v2/persons', (req) => {
            req.on('after:response', (res) => {
                if (res.statusCode === 201) {
                    const personId = res.body.id;
                    queueDeletePersonWithId(personId);
                }
            });
        }).as('addPerson');
        // cleanup
    });

    // TODO: Add options to select tenure holder or household member
    it('Can add a new person to a tenure', { tags: ["@SmokeTest", "@Positive"] }, () => {
        cy.getTenureFixture().then((tenure) => {
            addPersonPage.visit(tenure.id);
        });
        addPersonPage.personFormDisplayed();

        addPersonPage.tenureHolderRadioButton().click(); 
        // Name
        addPersonPage.personTitleSelection().select('Mr');
        addPersonPage.firstNameContainer().type('Test');
        addPersonPage.middleNameContainer().type('Test');
        addPersonPage.lastNameContainer().type('Test');
        // Date of birth
        addPersonPage.dateOfBirthDayContainer().clear();
        addPersonPage.dateOfBirthDayContainer().type("08");
        addPersonPage.dateOfBirthMonthContainer().clear();
        addPersonPage.dateOfBirthMonthContainer().type("05");
        addPersonPage.dateOfBirthYearContainer().clear();
        addPersonPage.dateOfBirthYearContainer().type("1969");
        
        addPersonPage.placeOfBirthContainer().type('Hospital');
        // Preferred name
        addPersonPage.preferredTitleContainer().select('Mrs');
        addPersonPage.preferredFirstNameContainer().type('Alan');
        addPersonPage.preferredMiddleNameContainer().type('Coach Feratu');
        addPersonPage.preferredLastNameContainer().type('Jefferson');
        
        addPersonPage.reasonForCreationContainer().type('Some reason');
        addPersonPage.addPersonButton().click();
        cy.wait('@addPerson');
        
        addPersonPage.pageAnnouncement()
                     .should('be.visible')
                     .and('contain', 'Person added to tenure');
        cy.url().should('include', 'contact');
    });
});