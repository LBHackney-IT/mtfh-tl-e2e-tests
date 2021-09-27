const envConfig = require('../../environment-config')

class ActivityHistoryTenurePageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/activities/tenure/${record}`)
        cy.injectAxe()
    }

    activityHistoryTenureActivities() {
        return cy.get('[data-testid="tenure-activities"]')
    }

    closeActivityHistoryButton() {
        return cy.contains('Close activity history')
    }

    activityHistoryCell() {
        return cy.get('.govuk-table__cell')
    }
}

export default ActivityHistoryTenurePageObjects