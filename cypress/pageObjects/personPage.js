const envConfig = require('../../environment-config')
// will need to update once we have a mechanism for getting a person or some test data

class PersonPageObjects {
    visit(record) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.personUrl}/${record}`)
        cy.injectAxe()
    }

    headerContainerPhoto() {
        // Needs a better selector
    }

    headerContainerName() {
        return cy.get("[data-testid='person-fullName']")
    }

    addCommentButton() {
        return cy.get('.govuk-button lbh-button')
    }

    commentTable() {
        return cy.get('.comment')
    }

    previousPaginationNavigationButton() {
        return cy.get('.pagination__item')
    }

    nextPaginationNavigationButton() {
        return cy.get('.pagination__item --next')
    }

    headerContainerDateOfBirth() {
        return cy.get("[data-testid='intro-dateOfBirth']")
    }

    headerContainerMobileNumber() {
        return cy.get("[data-testid='intro-mobile']")
    }

    headerContainerEmailAddress() {
        return cy.get("[data-testid='intro-email']")
    }

    headerContainerExpandPersonalDetails() {
        return cy.get('.govuk-accordion__open-all')
    }

    expandPersonalDetails() {
        return cy.contains('More personal details')
    }

    expandTenureDetails() {
        return cy.contains('More tenure details')
    }

    addCommentButton() {
        return cy.contains('Add comment')
    }

    morePersonalDetailsAccordion() {
        return cy.contains('More personal details')
    }

    moreTenureDetailsAccordion() {
        // return cy.contains('More tenure details')
        return cy.get('.govuk-accordion__section-button').eq(1)
    }

    viewTenureButton() {
        return cy.get('[class="govuk-button lbh-button govuk-secondary lbh-button--secondary"]')
    }

    feedbackMessageContainer() {
        return cy.get('[id="single-spa-application:@mtfh/personal-details"]')
    }

    personalDetailsContainer() {
        return cy.get('.personal-details')
    }

    editPersonButton() {
        return cy.contains('Edit person')
    }

    sidebar() {
        return cy.get('#sidebar')
    }
}
export default PersonPageObjects