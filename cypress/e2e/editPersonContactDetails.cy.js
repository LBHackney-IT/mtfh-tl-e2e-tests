import EditPersonContactDetailsPageObjects from "../pageObjects/editPersonContactDetailsPage";
import PersonContactPageObjects from "../pageObjects/personContactPage";
import { addTestRecordToDatabase } from "../helpers/DbHelpers";
import { person } from "../../api/models/requests/createPersonModel";


const editPersonContactDetailsPage = new EditPersonContactDetailsPageObjects();
const personContactPage = new PersonContactPageObjects();
const tags = ['@personal-details', '@authentication', '@common', '@root', '@worktray']
const contactTypes = ['email', 'phone']

describe('Edit person Contact details', {tags: tags}, ()=> {
    beforeEach(()=> {
        cy.login()
        const testPerson = person();
        addTestRecordToDatabase("Persons", testPerson, {id: testPerson.id});
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

    contactTypes.forEach((contactType)=> {
        it('should not allow more than 5 phone number', ()=> {
            cy.intercept("GET", `*/api/v2/contactDetails?targetId=${person.id}`, {
                fixture: "contact-details.json",
                statusCode: 200,
            }).as("getContactDetails");
    
            cy.getPersonFixture().then((person) => {
                editPersonContactDetailsPage.editPersonContactDetails(person.id);
    
                for (let i = 0; i < 5; i++) {
                    cy.wait(500);
                
                    cy.get("body").then(($body) => {
                      if (contactType === "email") {
                        if (
                          $body.text().includes("You cannot add more than 5 email addresses")
                        ) {
                          return;
                        }
                        personContactPage.addEmailAddress(
                          "test@test.com",
                          "test email description"
                        );
                      }
                
                      if (contactType === "phone") {
                        if ($body.text().includes("You cannot add more than 5 phone numbers")) {
                          return;
                        }
                        personContactPage.addPhoneNumber(
                          "01234567890",
                          "test phone description"
                        );
                      }
                    });
                }
                
                if (contactType === "email") {
                    personContactPage
                      .mainContent()
                      .contains("You cannot add more than 5 email addresses");
                    personContactPage.addEmailAddressButton().should("be.disabled");
                }
                
                if (contactType === "phone") {
                    personContactPage
                      .mainContent()
                      .contains("You cannot add more than 5 phone numbers");
                    personContactPage.addPhoneNumberButton().should("be.disabled");
                }
                
            })
        })
    })

    it('should validate empty field', ()=> {
        cy.getPersonFixture().then((person) => {
            editPersonContactDetailsPage.editPersonContactDetails(person.id);
            personContactPage.addPhoneNumberButton().click();
            personContactPage.clickSaveChangesButton();
            cy.contains("You must select an option to proceed");
            cy.contains("You must enter a phone number to proceed");
        })
    })

    it('should add phone successfully',{'tags': '@SmokeTest'}, ()=> {
        cy.getPersonFixture().then((person) => {
            editPersonContactDetailsPage.editPersonContactDetails(person.id);
            personContactPage.addPhoneNumberButton().click();
            personContactPage.phoneNumberContactType();
            personContactPage.phoneNumberFields().last().type("07777777777");
            personContactPage.clickSaveChangesButton();
            cy.contains("Phone numbers updated");
        })
    })

    it('should disable save button after changes saved once', ()=> {
        cy.getPersonFixture().then((person) => {
            editPersonContactDetailsPage.editPersonContactDetails(person.id);
            personContactPage.addPhoneNumberButton().click();
            personContactPage.phoneNumberContactType();
            personContactPage.phoneNumberFields().last().type("07777777777");
            personContactPage.clickSaveChangesButton();
            cy.contains("Save changes").should("be.disabled");
        })
    })

    it('should show confirmation model when removing phone number after saved', ()=> {
        cy.getPersonFixture().then((person) => {
            editPersonContactDetailsPage.editPersonContactDetails(person.id);
            personContactPage.addPhoneNumberButton().click();
            personContactPage.phoneNumberContactType();
            personContactPage.phoneNumberFields().last().type("07777777777");

            //Doesn't show confirmation model before number is saved
            cy.contains("Remove").click();
            cy.contains("Are you sure you want to remove this phone number?").should(
                "not.exist"
            );
            cy.contains("07777777777").should("not.exist");
            cy.contains("Main number").should("not.exist");

            personContactPage.addPhoneNumberButton().click();
            personContactPage.phoneNumberContactType();
            personContactPage.phoneNumberFields().last().type("07777777777");
            personContactPage.clickSaveChangesButton();
            cy.contains("Phone numbers updated");
            cy.contains("Remove").click();
            cy.contains("Are you sure you want to remove this phone number?");
            cy.contains("Remove phone number").click();
            cy.contains("Phone number removed");
            cy.contains("07777777777").should("not.exist");
            cy.contains("Main number").should("not.exist");
        })
    })

    it('add non-uknumber', ()=> {
        cy.getPersonFixture().then((person) => {
            editPersonContactDetailsPage.editPersonContactDetails(person.id);
            personContactPage.addPhoneNumberButton().click();
            personContactPage.phoneNumberContactType();
            cy.get("input[data-test='phone-number-checkbox']").last().check()
            personContactPage.phoneNumberFields().last().type("+549844444444");
            personContactPage.clickSaveChangesButton();
            cy.contains("Phone numbers updated");
            cy.reload();
            cy.get("input[data-test='phone-number-checkbox']").last().should("be.checked");
        })
    })



})
