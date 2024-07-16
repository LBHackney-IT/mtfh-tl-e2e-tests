import EditPersonContactDetailsPageObjects from "../pageObjects/editPersonContactDetailsPage";
import PersonContactPageObjects from "../pageObjects/personContactPage";
import { addTestRecordToDatabase } from "../helpers/DbHelpers";
import { person } from "../../api/models/requests/createPersonModel";


const editPersonContactDetailsPage = new EditPersonContactDetailsPageObjects();
const personContactPage = new PersonContactPageObjects();
const tags = ['@personal-details', '@authentication', '@common', '@root', '@worktray']

describe('Edit person Contact details', {tags: tags}, ()=> {
    beforeEach(()=> {
        cy.login()
        const testPerson = person();
        addTestRecordToDatabase("Persons", testPerson);
    })

    it('should show error message with invalid postcode', ()=> {
        cy.getPersonFixture().then((person) => {
            editPersonContactDetailsPage.editPersonContactDetails(person.id);
            personContactPage.addCorrespondenceAddressButton().click();
            personContactPage.addressLineOneField().should("be.visible");
            personContactPage.addressLineTwoField().should("be.visible");
            personContactPage.addressLineThreeField().should("be.visible");
            personContactPage.addressLineFourField().should("be.visible");
            personContactPage.postcodeLookupButton().should("be.visible");
            personContactPage.postcodeLookupField().should("be.visible");
            personContactPage.postcodeField().should("be.visible");

            personContactPage.postcodeLookupField().type("qwerty");
            personContactPage.postcodeLookupButton().click();
            personContactPage.postcodeLookupErrorContainer().should("be.visible");
            personContactPage
              .postcodeLookupErrorContainer()
              .contains("Please enter a valid postcode");

        });
    })

})
