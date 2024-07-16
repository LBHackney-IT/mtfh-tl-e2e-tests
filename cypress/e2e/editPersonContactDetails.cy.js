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

    it('should save correspondence address',{'tags': '@SmokeTest'}, () => {
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
            
            personContactPage.addressLineOneField().type("Buckingham Palace");
            personContactPage.addressLineTwoField().type("Palace");
            personContactPage.addressLineThreeField().type("London");
            personContactPage.addressLineFourField().type("England");
            personContactPage.postcodeField().type("SW1A 1AA");

            personContactPage.saveAddressButton().click();

            personContactPage.confirmationMessage().should("be.visible");
            personContactPage.confirmationMessage().contains("Correspondence address saved");
        })
    })

    it('should not allow more than 5 phone number', ()=> {
        cy.getPersonFixture().then((person) => {
            editPersonContactDetailsPage.editPersonContactDetails(person.id);

            cy.intercept("GET", `*/api/v2/contactDetails?targetId=${person.id}`, {
                fixture: "contact-details.json",
                statusCode: 200,
            }).as("getContactDetails");

            
        })
    })

})
