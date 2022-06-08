const envConfig = require('../../environment-config')

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

    startProcessButton(){
        return cy.get(".start-process__start-button")
    }

    cancelProcessLink(){
        return cy.get(".start-process__cancel-link")
    }

    visit(tenureId){
        return cy.visit(`${envConfig.baseUrl}/${envConfig.startSoleToJointProcessUrl}/${tenureId}`)
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
    headingSoleTenantRequestsAJointTenure(){
        return cy.findAllByText('Sole tenant requests a joint tenure');
    };
    personRadioButton(){
        return cy.get('.govuk-radios__input');
    };
    textAutomaticEligibiltyChecksPassed(){
        return cy.findAllByText('Passed automatic eligibilty checks');
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
        return cy.get("[data-testid=soletojoint-CheckEligibility] > .govuk-button");
    };
    selectYesFor12Months(){
        //return cy.get('#person-form-type-tenure-holder');
        return cy.get(":nth-child(2) > #person-form-personType-field > :nth-child(1) > #person-form-type-tenure-holder");
    };
    selectNoForOccupyanyOther() {
        //return cy.get('#person-form-type-household-member');
        return cy.get(":nth-child(3) > #person-form-personType-field > :nth-child(2) > #person-form-type-household-member");
    };

    // selectYesForSurvivorOfOne() {
    //     return cy.get(":nth-child(4) > #person-form-personType-field > :nth-child(1) > #person-form-type-household-member");
    // };

    selectYesForSurvivorOfOne() {
        return cy.get(":nth-child(4) > #person-form-personType-field > :nth-child(1) > #person-form-type-tenure-holder");
    };
    selectNoForSurvivorOfOne() {
        return cy.get(":nth-child(4) > #person-form-personType-field > :nth-child(2) > #person-form-type-tenure-holder");
    };
    selectYesForTenantEvicted() {
        return cy.get(":nth-child(5) > #person-form-personType-field > :nth-child(1) > #person-form-type-tenure-holder");
    };

    selectNoForTenantEvicted() {
        return cy.get(":nth-child(5) > #person-form-personType-field > :nth-child(2) > #person-form-type-tenure-holder");
    }
    selectYesForImmigrationControl () {
        return cy.get(":nth-child(6) > #person-form-personType-field > :nth-child(1) > #person-form-type-tenure-holder");
    };
    selectNoForImmigrationControl () {
        return cy.get(":nth-child(6) > #person-form-personType-field > :nth-child(2) > #person-form-type-tenure-holder");
    };
    selectYesForLiveNotice() {
        return cy.get("#person-form-seeking-possesion-yes");
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


}

export default ProcessesPageObjects