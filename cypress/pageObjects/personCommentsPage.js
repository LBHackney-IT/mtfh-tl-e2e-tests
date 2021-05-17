const envConfig = require('../../environment-config')

class PersonCommentsPageObjects {
    visit(person) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.personCommentsUrl}/${person}`) 
    }

    addCommentHeader() {
        return cy.get('.lbh-heading-h2')
    }

    pageAnnouncementHeader() {
        return cy.get('.lbh-page-announcement__title')
    }

    errorMessageContainer() {
        return cy.get('.govuk-error-summary optional-extra-class lbh-error-summary')
    }

    addCommentsError() {
        return cy.get('#add-comment-error')
    }

    commentDescriptionErrorLabel() {
        return cy.get('[for="person-comment-description"]')
    }

    commentDescriptionError() {
        return cy.get('#person-comment-description-error')
    }

    addCommentLabel() {
        return cy.get('.add-comment-person govuk-label lbh-label')
    }

    commentContainer() {
        return cy.get('#person-comment-description')
    }

    characterCountMessage() {
        return cy.get('.govuk-hint govuk-character-count__message')
    }

    characterCountErrorMessage() {
        return cy.get('.govuk-character-count__message govuk-error-message')
    }

    submitCommentButton() {
        return cy.get('[type="submit"]')
    }

    personCommentsComponentsAreDisplayed() {
        this.addCommentHeader().should('be.visible')
        this.addCommentLabel().should('be.visible')
        this.commentContainer().should('be.visible')
        this.characterCountMessage().should('be.visble')
        this.submitCommentButton().should('be.visible')
    }
}

export default PersonCommentsPageObjects