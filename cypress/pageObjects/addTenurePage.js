import AddPersonPageObjects from './addPersonPage'

const envConfig = require('../../environment-config')

class AddTenurePageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.tenureUrl}/${record}/add`)
        cy.injectAxe()
    }

    tenureTypeSelection() {
        return cy.get('#tenure-form-tenureType-field')
    }

    tenureStartDateDay() {
        return cy.get('[name="startDay"]')
    }

    tenureStartDateMonth() {
        return cy.get('[name="startMonth"]')
    }

    tenureStartDateYear() {
        return cy.get('[name="startYear"]')
    }

    propertyAddress() {
        return cy.get('.lbh-heading-h2')
    }

    addTenure() {
        return cy.get('.mtfh-layout__main')
    }

    newTenureSummary() {
        return cy.get('')
    }

    nextButton() {
        return cy.contains('Next')
    }

    cancelButton() {
        return cy.contains('Cancel')
    }
}

export default AddTenurePageObjects