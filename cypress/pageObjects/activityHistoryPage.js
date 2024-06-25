
class ActivityHistoryPageObjects {
    constructor(targetType) {
        this.targetType = targetType
    }

    visit(record, isStubbed = false) {
        const activityHistoryApiUrl = "*/api/v1/activityhistory?**"
        cy.intercept("GET", activityHistoryApiUrl).as("getActivityHistory")
        if(isStubbed) {
            cy.intercept("GET", activityHistoryApiUrl, 
                         { fixture: `activity-history-${this.targetType}.json` })
                        .as("getActivityHistory")
        }

        cy.visit(`${Cypress.config("baseUrl")}/activities/${this.targetType}/${record}`)
        cy.wait("@getActivityHistory")
        cy.injectAxe()
    }

    activityTable() {
        return cy.get(`[data-testid="${this.targetType}-activities"]`)
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