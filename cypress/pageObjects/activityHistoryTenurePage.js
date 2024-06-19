
class ActivityHistoryTenurePageObjects {
    visit(record) {
        cy.visit(`${Cypress.config("baseUrl")}/activities/tenure/${record}`)
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

    tableHeaders() {
        return [
            'date', 'category', 'edit details', 'edited by'
        ]
    }
}

export default ActivityHistoryTenurePageObjects