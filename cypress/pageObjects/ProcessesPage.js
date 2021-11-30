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
}

export default ProcessesPageObjects