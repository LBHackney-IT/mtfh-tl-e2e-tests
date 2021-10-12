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

    addCommentTitleField() {
        return cy.get('[id="add-comment-title-field"]')
    }

    addCommentCategoryField(){
        return cy.get('[id="add-comment-category-field"]')
    }

    addCommentButton() {
        return cy.get('.govuk-button lbh-button')
    }

    commentTable() {
        return cy.get('.comment')
    }
    
    comment(){
        return cy.get('[class="comment__item --center"]')
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

    moreContactDetailsAccordion() {
        return cy.contains('More contact details')
    }

    morePersonalDetailsAccordion() {
        return cy.get('[id="accordion-heading-additional-person-details"]')
    }

    moreTenureDetailsAccordion() {
        return cy.contains('Additional tenures')
    }

    viewTenureButton() {
        return cy.get('[class="govuk-button lbh-button govuk-secondary lbh-button--secondary"]')
    }

    viewPropertyButton() {
        return cy.contains('View property')
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
        return cy.get('[class="mtfh-sidebar"]')
    }

    deviceViewSidebar() {
        return cy.get('[id="sidebar"]')
    }

    personalDetailsMobile() {
        return cy.get('.mtfh-personal-details-mobile')
    }

    contactDetails() {
        return cy.get('[id="contact-details"]')
    }

    personDetails() {
        return cy.get('[id="accordion-content-additional-person-details"]')
    }

    tenureDetails() {
        return cy.get('[class="mtfh-tenure-details"]')
    }
}
export default PersonPageObjects