const envConfig = require('../../environment-config')

class ActivityHistoryTenurePageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/activities/tenure/${record}`)
        cy.injectAxe()
    }

    activityHistoryTenureActivities() {
        cy.get('[data-testid="activities"]')
    }

    closeActivityHistoryButton() {
        return cy.contains('Close activity history')
    }
}

export default ActivityHistoryTenurePageObjects