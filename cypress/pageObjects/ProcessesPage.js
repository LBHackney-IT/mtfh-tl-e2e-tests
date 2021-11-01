const envConfig = require('../../environment-config')

class ProcessesPageObjects{
    pageTitle(){
        return cy.contains('Processes')
    }

    processesMenuList(){
        return cy.get('[class="mtfh-processes-menu__list"]')
    }
}

export default ProcessesPageObjects