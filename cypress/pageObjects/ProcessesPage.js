const envConfig = require('../../environment-config')

class ProcessesPageObjects{
    pageTitle(){
        cy.contains('Processes')
    }

}

export default ProcessesPageObjects