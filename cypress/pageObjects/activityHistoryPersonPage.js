
class ActivityHistoryPageObjects {
    visit(record) {
        cy.visit(`${Cypress.config("baseUrl")}/activities/person/${record}`)
        cy.intercept("GET", `*/api/v1/activityhistory?pageSize=5&targetId=${record}`)
                    .as("getActivityHistory")
        cy.wait("@getActivityHistory")
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

    activityTableRowShouldContainText(rowNumber, { date, category, editDetails, editedBy }) {
        const row = this.activityTableRow().eq(rowNumber);
        row.should('contain', date);
        row.should('contain', category);
        row.should('contain', editDetails);
        row.should('contain', editedBy);
    }
}

export default ActivityHistoryPageObjects