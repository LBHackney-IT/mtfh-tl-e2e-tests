
class ProcessesPageObjects{
    pageTitle(){
        return cy.contains('Processes')
    }

    mainContent() {
        return cy.get('#main-content')
    }

    processesMenuList(){
        return cy.get('[class="mtfh-processes-menu__list"]')
    }

    processOption(process) {
        return cy.contains(`${process}`)
    }

    subProcessOption(subProcess) {
        return cy.contains(`${subProcess}`)
    }

    tenureDetails(){
        return cy.get(".entity-summary__tenure-heading")
    }

    agreementCheckBox(){
        return cy.get(".govuk-checkboxes__input")
    }

    startProcessButton() {
        cy.wait(1000)
        return cy.get(".start-process__start-button")
    }

    cancelProcessLink(){
        return cy.get(".start-process__cancel-link")
    }

    visit(tenureId){
        return cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("startSoleToJointProcessUrl")}/${tenureId}`)
    }

    backLink(){
        return cy.get(".lbh-back-link")
    }

    yourName(yourName){
        return cy.get("#i1");
    }

    propertyAddress(propertyAddress){
        return cy.get("#i5");
    }
    propertyReference(propertyRef){
        return cy.get("#i9");
    }
    tenancyReference(tenancyRef){
        return cy.get("#i17");
    }
    linkSoleToJoint() {
        return cy.get('.govuk-details__summary-text');

    }
    headingSoleTenantRequestsAJointTenure(){
        return cy.findAllByText('Sole tenant requests a joint tenure');
    };
    personRadioButton(){
        return cy.get('.govuk-radios__input');
    };
    textAutomaticEligibilityChecksPassed(){
        return cy.findAllByText('Passed automatic eligibility checks');
    };
    textAutomaticChecksFailed(){
        return cy.findAllByText('Not eligible for a sole to joint tenure');
    };
    questionNoticeSeekingPossesion(){
        return cy.get('#person-form-seeking-possesion');
    };
    questionTenantRentArrears(){
        return cy.get('#person-form-rent-arrears');
    };
    buttonCloseCase(){
        return cy.contains("Close Case");
    };
    selectYesFor12Months(){
        return cy.get('#person-form-living-together-yes');
        //return cy.get(":nth-child(2) > #person-form-personType-field > :nth-child(1) > #person-form-type-tenure-holder");
    };
    selectNoForOccupyanyOther() {
        return cy.get('#person-form-main-home-no');
        //return cy.get(":nth-child(3) > #person-form-personType-field > :nth-child(2) > #person-form-type-household-member");
    };

    // selectYesForSurvivorOfOne() {
    //     return cy.get(":nth-child(4) > #person-form-personType-field > :nth-child(1) > #person-form-type-household-member");
    // };

    selectYesForSurvivorOfOne() {
        return cy.get("#person-form-survivor-yes");
    };
    selectNoForSurvivorOfOne() {
        return cy.get("#person-form-survivor-no");
    };

    selectYesForTenantEvicted() {
        return cy.get("#person-form-evicted-yes");
    };
    selectNoForTenantEvicted() {
        return cy.get("#person-form-evicted-yes");
    }

    selectYesForImmigrationControl () {
        return cy.get("#person-form-immigration-yes");
    };
    selectNoForImmigrationControl () {
        return cy.get("#person-form-immigration-no");
    };
    selectYesForLiveNotice() {
        return cy.get("#person-form-seeking-possession-yes");
    };
    selectNoForLiveNotice() {
        return cy.get("#person-form-seeking-possesion-no");
    };
    selectYesForRentArrears() {
        return cy.get("#person-form-rent-arrears-yes");
    };
    selectNoForRentArrears() {
        return cy.get("#person-form-rent-arrears-no");
    }

    buttonReturnToApplication() {
        return cy.get('[data-testid=close-update-contact-details-modal]');
    };
    emailAddress() {
        return cy.get('#contact-details-email-address-field');
    }
}

export default ProcessesPageObjects