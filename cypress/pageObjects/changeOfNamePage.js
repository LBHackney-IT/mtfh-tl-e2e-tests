const envConfig = require('../../environment-config')

class ChangeOfNamePageObjects {
    visit(homePage) {
        cy.visit(`${envConfig.baseUrl}`);
        cy.injectAxe();
    }
    visit(personId) {
        cy.visit(`${envConfig.baseUrl}/person/${personId}`);
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
    searchButton() {
        //return cy.get('.govuk-button lbh-button');
        //return cy.get('button[title="Search"]');
        return cy.get('.govuk-button');
    };
    searchPerson() {
        //return cy.findAllByText('Active');
        return cy.get('.mtfh-link-box mtfh-search-person').contains('Active');
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
    buttonStartProcess() {
        return cy.contains('Start process');
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
    statusStepper() {
        return cy.get('#mtfh-stepper__circle-inner');
    };
    statusActiveCheck(){
        return cy.get('.mtfh-stepper__step--active');
    };

}
export default ChangeOfNamePageObjects;