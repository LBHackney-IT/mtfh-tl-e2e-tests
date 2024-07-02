import { seedDatabaseWithTenure } from "../helpers/DbHelpers";

import EditPersonFormObjects from "../pageObjects/editPersonForm";
const editPersonForm = new EditPersonFormObjects();
const tags = ['@activity-history', '@authentication', '@common', '@root'];

describe('Person Form', { tags: tags }, () => {
    beforeEach(() => {
        cy.login();
        seedDatabaseWithTenure(true);
    });

    it('Removed fields are not displayed', { tags: "@Regression" }, () => {
        cy.getTenureFixture().then((tenure) => {
            editPersonForm.visit(tenure.id);
        });

        editPersonForm.genderContainer().should('not.exist');
        editPersonForm.nationalityContainer().should('not.exist');
        editPersonForm.nationalInsuranceNumberContainer().should('not.exist');
        editPersonForm.addLanguageButton().should('not.exist');
        editPersonForm.addIdButton().should('not.exist');
    });

    it('Validates date of birth', { tags : "@Negative" },() => {
        cy.getTenureFixture().then((tenure) => {
            editPersonForm.visit(tenure.id);
        });

        editPersonForm.householdMemberRadioButton().click();
        editPersonForm.personTitleSelection().select('Mr');
        editPersonForm.firstNameContainer().type('Testy');
        editPersonForm.middleNameContainer().type('McTest');
        editPersonForm.lastNameContainer().type('Face');
        // Select date of birth in the future
        editPersonForm.dateOfBirthDayContainer().type('08');
        editPersonForm.dateOfBirthMonthContainer().type('05');
        editPersonForm.dateOfBirthYearContainer().type('2099');
        editPersonForm.reasonForCreationContainer().type('Some reason');
        editPersonForm.addPersonButton().click();

        editPersonForm.addPersonFormErrorContainer().should("be.visible");
        editPersonForm.errorSummaryBody()
                     .should('contain', "This date cannot be in the future");
    });
});