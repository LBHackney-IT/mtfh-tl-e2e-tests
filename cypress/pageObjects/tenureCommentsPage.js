const envConfig = require('../../environment-config')

class TenureCommentsPageObjects {
    visit(tenure) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.tenureCommentsUrl}/${tenure}`)
        cy.injectAxe()
    }

    addCommentTitleField() {
        return cy.get('[id="add-comment-title-field"]')
    }

    addCommentForm() {
        return cy.get('[data-testid="add-comment-to-tenure"]')
    }

    pageAnnouncementHeader() {
        return cy.get('.lbh-page-announcement__title')
    }

    errorMessageContainer() {
        return cy.get('.govuk-error-summary optional-extra-class lbh-error-summary')
    }

    addCommentsError() {
        return cy.get('#add-comments-error')
    }

    commentDescriptionError() {
        return cy.get('#add-comment-description-error')
    }

    addCommentLabel() {
        return cy.get('.add-comment-person govuk-label lbh-label')
    }

    commentContainer() {
        return cy.get('#add-comment-description')
    }

    characterCountMessage() {
        return cy.get('[class="govuk-hint govuk-character-count__message"]')
    }

    characterCountErrorMessage() {
        return cy.get('[class="govuk-character-count__message govuk-error-message"]')
    }

    submitCommentButton() {
        return cy.get('[type="submit"]')
    }

    tenureCommentsComponentsAreDisplayed() {
        this.addCommentForm().should('be.visible')
        this.commentContainer().should('be.visible')
        this.characterCountMessage().should('be.visible')
        this.submitCommentButton().should('be.visible')
    }
}

export default TenureCommentsPageObjects