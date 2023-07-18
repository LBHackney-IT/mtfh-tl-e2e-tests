const envConfig = require('../../environment-config')

class ActivityHistoryPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/activities/person/${record}`)
        cy.injectAxe()
    }

    activityTable() {
        return cy.get('[data-testid="person-activities"]')
    }

    activityTableRow() {
        return cy.get('[class="govuk-table__row govuk-table__row mtfh-activity-history"]')
    }

    tableHeaders() {
        return [
            'date', 'category', 'edit details', 'edited by'
        ]
    }

    tableBody() {
        return cy.get('.govuk-table__body')
    }

    closeActivityHistory() {
        return cy.contains('Close activity history')
    }
}

export default ActivityHistoryPageObjects