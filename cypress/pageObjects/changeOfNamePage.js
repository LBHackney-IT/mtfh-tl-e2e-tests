import TenureReviewDocsPageObjects from "./tenureReviewDocumentsPage";

class ChangeOfNamePageObjects extends TenureReviewDocsPageObjects {
    visitHomePage() {
        cy.visit(Cypress.config("baseUrl"))
        cy.injectAxe();
    }
    visitPersonPage(personId) {
        cy.visit(`${Cypress.config("baseUrl")}/person/${personId}`);
    }

    visitStartPage(personId) {
        cy.visit(`${Cypress.config("baseUrl")}/processes/changeofname/start/person/${personId}`);
    }
    
    textSearch() {
        return cy.findAllByText('Search');
    };
    searchField(){
        return cy.get('#search-form-searchTerm-field');
    };
    radiobuttonPerson() {
        return cy.get('#search-form-type-persons');
    };
    radiobuttonProperty() {
        return cy.get('#search-form-type-assets');
    };
    radiobuttonTenure() {
        return cy.get('#search-form-type-tenures');
    }
    searchButton() {
        //return cy.get('.govuk-button lbh-button');
        //return cy.get('button[title="Search"]');
        return cy.get('#search-form > .govuk-button');
    };
    newProcessButton() {
        return cy.contains('New Process');
    };
    changeToATenancyLink(){
        return cy.contains('Change to a tenancy');
    };
    changeOfNameLink() {
        return cy.contains('Change of Name');
    };
    checkBoxTenantInfo() {
        return cy.get('#condition');
    };
    checkBoxTenantDeclaration() {
        return cy.get('#declaration-form-group-field');
    };
    checkBoxValidExampleOfOne() {
        return cy.get('#confirmation-for-valid-documents');
    };
    errorTenantDeclaration() {
        return cy.get('#declaration-form-group-error');
    };
    errorMessage() {
            return cy.get('.lbh-error-message');
    };
    errorReviewDocuments() {
        return cy.get('#review-documents-form-group-error');
    };
    linkDes(){
        return cy.findByRole('link', {name:/View documents on the Document Evidence Store/i});
    };
    buttonStartProcess() {
        return cy.get('.lbh-button').contains('Start process');
    };
    buttonNext() {
        return cy.contains('Next');
    };
    personTitle() {
        return cy.get('#person-form-title-field');
    };
    personTitleError(){
        return cy.get('#person-form-title-error');
    }
    personFirstName() {
        return cy.get('#person-form-firstName-field');
    };
    personFNameError() {
        return cy.get('#person-form-firstName-error');
    }
    personMidlleName() {
        return cy.get('#person-form-middleName-field');
    };
    personLastName() {
        return cy.get('#person-form-surname-field');
    };
    personLNameError() {
        return cy.get('#person-form-surname-error');
    }
    activeStep(){
        return cy.get('.mtfh-stepper__step--active');
    };
    requestDocsElectronically() {
        return cy.get('#requestType-automatic');
    };
    promptAddContactDetails() {
        return cy.contains("add the contact details");
    }
    outcomeTenureApprove(){
        return cy.get('#tenure-investigation-recommendation-approve');
    }
    outcomeTenureDecline(){
        return cy.get('#tenure-investigation-recommendation-decline');
    }
    outcomeTenureAppointment(){
        return cy.get('#tenure-investigation-recommendation-appointment');
    };
    checkboxConfirmTenureInvest(){
        return cy.get("#tenure-investigation-completed-field");
    };
    optionAHMReview() {
        return cy.get('#ho-review');
    };
    ahmDecisionApprove(){
        return cy.get('#ho-review-approve');
    };
    ahmDecisionDecline(){
        return cy.get('#ho-review-decline');
    };

    checkBoxAhmApproved() {
        return cy.get('#confirm-form-group-field');
    };

    ahmNameInput() {
        return cy.get('#area-housing-manager-name-form-group-field');
    };

    ahmConfirmButton() {
        return cy.get('.lbh-button').contains('Confirm');
    };

    buttonSubmitCase(){
        return cy.get('.mtfh-layout__main > :nth-child(6)');
    };
    errorAreaHousingManagerName() {
        return cy.get('#area-housing-manager-name-form-group-error')
    };
    modalReturn() {
        return cy.get('[data-testid=close-update-contact-details-modal]');
    };
    emailAddress() {
        return cy.get('#contact-details-email-address-field');
    }

    phoneNumberType() {
        return cy.get('#contact-details-phone-type-0-field');
    }

    phoneNumber() {
        return cy.get('#contact-details-phone-number-0-field');
    }

    setAppointmentDateTime(date) {    
        // Set the date
        this.appointmentDay().clear().type(date.getDate());
        this.appointmentMonth().clear().type(date.getMonth() + 1); // Month is 0-indexed
        this.appointmentYear().clear().type(date.getFullYear());
    
        // Convert the time to 12-hour format
        const appointmentHour = date.getHours();
        const appointmentMinute = date.getMinutes();
        const appointmentAmPm = appointmentHour >= 12 ? 'PM' : 'AM';
        const appointmentHour12 = appointmentHour % 12 || 12;
    
        // Set the time
        this.appointmentHour().clear().type(appointmentHour12);
        this.appointmentMinute().clear().type(appointmentMinute);
        this.appointmentAmPmSelector().select(appointmentAmPm);
    }

    appointmentDay() {
        return cy.get('[name="day"]')
    }

    appointmentMonth() {
        return cy.get('[name="month"]')
    }

    appointmentYear() {
        return cy.get('[name="year"]')
    }

    appointmentHour() {
        return cy.get('[name="hour"]')
    }

    appointmentMinute() {
        return cy.get('[name="minute"]')
    }

    appointmentAmPmSelector() {
        return cy.get('[name="amPm"]')
    }

    documentsSignedButton() {
        return cy.get('.lbh-button').contains('Documents signed');
    }

    hasNotifiedResident() {
        return cy.get('[name="hasNotifiedResident"]');
    }
}
export default ChangeOfNamePageObjects;