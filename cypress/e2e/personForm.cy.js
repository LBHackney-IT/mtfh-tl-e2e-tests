import { seedDatabaseWithTenure } from "../helpers/DbHelpers";
import EditPersonFormObjects from "../pageObjects/editPersonForm";

const editPersonForm = new EditPersonFormObjects();


describe('Person Form', { tags: ['@personal-details', '@authentication', '@common', '@root'] }, () => {
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
        cy.getPersonFixture().then((person) => {
            editPersonForm.visit(person.id);
        
            editPersonForm.personTitleSelection().select('Mr');
            editPersonForm.firstNameContainer().clear().type('Testy');
            editPersonForm.middleNameContainer().clear().type('McTest');
            editPersonForm.lastNameContainer().clear().type('Face');
            // Select date of birth in the future
            editPersonForm.dateOfBirthDayContainer().clear().type('08');
            editPersonForm.dateOfBirthMonthContainer().clear().type('05');
            editPersonForm.dateOfBirthYearContainer().clear().type('2099');
            editPersonForm.updatePersonButton().click();

            editPersonForm.addPersonFormErrorContainer().should("be.visible");
            editPersonForm.errorSummaryBody()
                        .should('contain', "This date cannot be in the future");
        });
    });
});