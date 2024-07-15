
class CautionaryAlertsPageObjects {
    addCautionaryAlertLink() {
        return cy.findAllByText('Add cautionary alert');
    }

    pageHeaderCautionaryAlert(){
        return cy.get('.lbh-heading-h1');
    }

    dayField(){
        return cy.get('[name="day"]');
    }

    monthField(){
        return cy.get('[name="month"]');
    }

    yearField(){
        return cy.get('[name="year"]');
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

    saveAndContinueButton() {
        return cy.contains('Save and continue');
    }

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


    summaryListRow(){
        return cy.get('.govuk-summary-list__row');
    }

    nthSummaryListRow(n){
        return cy.get('.govuk-summary-list__row').eq(n);
    }

    redBellIconAlert(){
        return cy.get('[data-testid="alert-icon"]');
    };
    
    changeLinkAssuranceRef(){
        return cy.get('[data-testid="change:assure-ref"]');
    };

    changeLinkDateOfIncident(){
        return cy.get('[data-testid="change:incident-date"]');
    };

    changeLinkTypeOfCaution(){
        return cy.get('[data-testid="change:caution-type"]');
    };

    changeLinkDescription(){
        return cy.get('[data-testid="change:description"]');
    }

    };
export default CautionaryAlertsPageObjects;