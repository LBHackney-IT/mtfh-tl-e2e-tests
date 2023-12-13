const envConfig = require('../../environment-config')

class ActivityHistoryPropertyPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/activities/property/${record}`)
        cy.injectAxe()
    }

    activityHistoryPropertyActivities() {
        return cy.get('[data-testid="property-activities"]')
    }

    closeActivityHistoryButton() {
        return cy.contains('Close activity history')
    }

    activityHistoryCell() {
        return cy.get('.govuk-table__cell')
    }

    tableHeaders() {
        return [
            'date', 'category', 'edit details', 'edited by'
        ]
    }
}

export default ActivityHistoryPropertyPageObjects