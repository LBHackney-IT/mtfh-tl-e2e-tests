import { seedDatabaseWithTenure, addTestRecordToDatabase } from "../helpers/DbHelpers";
import EditPersonFormObjects from "../pageObjects/editPersonForm";
import { generateEqualityInformation } from '../../api/models/requests/equalityDetailsModel'


const editPersonPage = new EditPersonFormObjects();
const tags = ['@activity-history', '@person', '@authentication', '@common', '@root'];

describe('Edit a person', { tags: tags }, () => {
    beforeEach(() => {
        cy.login();
        seedDatabaseWithTenure(true);
    });

    it('Can edit a person', { tags: ["@SmokeTest", "@Positive"] },() => {
        cy.getPersonFixture().then((person) => {
            editPersonPage.visit(person.id);
        });

        editPersonPage.cancelButton().click();

        editPersonPage.confirmationModal().should('be.visible')
        editPersonPage.confirmationModal().contains('Yes')
        editPersonPage.confirmationModal().contains('Cancel')
        editPersonPage.confirmationModal().contains('Unsaved changes will be lost.')
        editPersonPage.confirmationModal().contains('Cancel').click()

        editPersonPage.personTitleSelection().select('Mr');
        editPersonPage.firstNameContainer().type('Modified');
        editPersonPage.middleNameContainer().type('Test');
        editPersonPage.lastNameContainer().type('guid');
        editPersonPage.dateOfBirthDayContainer().type('09');
        editPersonPage.dateOfBirthMonthContainer().type('12');
        editPersonPage.dateOfBirthYearContainer().type('1950');
        editPersonPage.placeOfBirthContainer().type('Mt. Fuji');
        editPersonPage.preferredTitleContainer().select('Reverend');
        editPersonPage.preferredFirstNameContainer().type('Pref modified');
        editPersonPage.preferredMiddleNameContainer().type('Mid modified');
        editPersonPage.preferredLastNameContainer().type('guid');
        
        editPersonPage.updatePersonButton().click();
        editPersonPage.saveEqualityInformationButton().click();

        // Then
        editPersonPage.pageAnnouncement()
                      .should('be.visible')
                      .and('contain', 'Person updated');
    });

    it('Can edit equality information', () => {
        // Go to edit person page
        cy.getPersonFixture().then((person) => {
            const equalityInformation = generateEqualityInformation(person.id);
            addTestRecordToDatabase("EqualityInformation", equalityInformation, { id: equalityInformation.id, targetId: person.id });
            editPersonPage.editPersonEqualityInformation(person.id);
        });
        
        // Sexual orientation should be hidden when age group is under 16 or not selected
        editPersonPage.sexualOrientationSelectionBox().should('not.exist');
        editPersonPage.ageGroupSelectionBox().select('Under 16');
        editPersonPage.sexualOrientationSelectionBox().should('not.exist');

        editPersonPage.ageGroupSelectionBox().select('25-34');
        editPersonPage.sexualOrientationSelectionBox().should('be.visible')

        editPersonPage.selectUnpaidCareRole('Prefer not to say');
        editPersonPage.selectDisbilityOption('Yes');
        editPersonPage.ethnicitySelectionBox().select('Mixed background');
        
        // Can add preferred gender term when selected gender 'other'
        editPersonPage.selectGenderOption('Male');
        editPersonPage.preferredGenderTermField().should("not.exist");

        editPersonPage.selectGenderOption('Other');
        editPersonPage.preferredGenderTermField().should("be.visible");
        editPersonPage.preferredGenderTermField().type('Gender Term');

        editPersonPage.selectGenderDifferentToBirthSexOption('Yes');
        editPersonPage.religionOrBeliefSelectionBox().select('Secular beliefs');
        editPersonPage.sexualOrientationSelectionBox().select('Lesbian or Gay woman');
        editPersonPage.selectpregnancyOrMaternityLeaveOption('Prefer not to say');
        
        editPersonPage.saveEqualityInformationButton().click();

        // Equality information updated
        editPersonPage.pageAnnouncement()
                     .should('be.visible')
                     .and('contain', 'Person updated');
    });
});