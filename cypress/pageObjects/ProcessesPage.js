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

}

export default ProcessesPageObjects