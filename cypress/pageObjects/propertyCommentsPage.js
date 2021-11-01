const envConfig = require('../../environment-config');

class propertyCommentsPageObjects {
    visit(property) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.propertyCommentsUrl}/${property}`)
        cy.injectAxe()
    }

    Commentcheckbox(id){
        return cy.get(`[id=${id}]`)
    }
    relationshipIds

    addCommentTitleField() {
        return cy.get('[id="add-comment-title-field"]')
    }
    commentFormDescription (){
        return cy.get('[data-testid="comment-form:description"]')
    }
    
    addCommentTitleError()
    {
        return cy.get('[id="add-comment-title-error"]')
    }

    addCommentForm() {
        return cy.get('[data-testid="add-comment-to-tenure"]')
    }

    addCommentCategoryField(){
        return cy.get('[id="add-comment-category-field"]')
    }

    addCommentCategoryError(){
        return cy.get ('[id ="add-comment-category-error"]')
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

    discardCommentLink (){
        return cy.get('[class ="govuk-link lbh-link lbh-link--no-visited-state"]')
    }
    cancellationPopUpWindow (){
        return cy.get('[class="lbh-heading-h2 lbh-dialog__title"]')
    }  
    cancellationYesButton(){
        return cy.get('[class="govuk-button lbh-button"]')
    }
    
    tenureCommentsComponentsAreDisplayed() {
        this.addCommentForm().should('be.visible')
        this.commentContainer().should('be.visible')
        this.characterCountMessage().should('be.visible')
        this.submitCommentButton().should('be.visible')
    }
}

export default propertyCommentsPageObjects