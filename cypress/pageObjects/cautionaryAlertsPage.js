const envConfig = require('../../environment-config')

class CautionaryAlertsPageObjects {
    addCautionaryAlertLink() {
        return cy.findAllByText('Add cautionary alert');
    }

    pageHeaderCautionaryAlert(){
        return cy.get('.lbh-heading-h1');
    }
    
    assureReference() {
        return cy.get('#assure-reference-field-field');
    };

    typeOfCaution() {
        return cy.get('#type-of-caution-field-field');
    };
        descriptionOfIncident() {
        return cy.get('#add-cautionary-alert-description-field');
    };
    assureReferenceFieldErrorMessg(){
        return cy.get('#assure-reference-field-error');
    };
    dateOfIncidentFieldErrorMessg(){
        return cy.get('#date-error');
    };
    selectTypeOfCautionFieldErrorMessg(){
        return cy.get('#type-of-caution-field-error');
    };
    descriptionOfIncidentFieldErrorMessg(){
        return cy.get('#add-cautionary-alert-description-error');
    };
    redBellIconAlert(){
        return cy.get('[data-testid="alert-icon"]');
    }

    };
export default CautionaryAlertsPageObjects;