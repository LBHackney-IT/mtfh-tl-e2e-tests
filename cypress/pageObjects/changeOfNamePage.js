
const envConfig = require('../../environment-config')
const baseUrl = require('../../environment-config').baseUrl

class ChangeOfNamePageObjects {
    visitHomePage() {
        cy.visit(baseUrl)
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
            return cy.get('.govuk-error-message lbh-error-message');
    };
    errorReviewDocuments() {
        return cy.get('#review-documents-form-group-error');
    };
    linkDes(){
        return cy.findByRole('link', {name:/View documents on the Document Evidence Store/i});
    };
    buttonStartProcess() {
        cy.wait(1000);
        return cy.get('.govuk-button');
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
    statusActiveCheck(){
        return cy.get('.mtfh-stepper__step--active');
    };
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
    ahmConfirmBox() {
        return cy.get('#confirm-form-group-field');
    };
    ahmNameInput() {
        return cy.get('#area-housing-manager-name-form-group-field');
    };
    buttonSubmitCase(){
        return cy.get('.mtfh-layout__main > :nth-child(6)');
    };
    errorAreaHousingManagerName() {
        return cy.get('#area-housing-manager-name-form-group-error')
    };
    buttonReturnToApplication() {
        return cy.get('[data-testid=close-update-contact-details-modal]');
    };
    emailAddress() {
        return cy.get('#contact-details-email-address-field');
    }
}
export default ChangeOfNamePageObjects;