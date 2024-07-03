
class PersonCommentsPageObjects {
    visit(person) {
        cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("personCommentsUrl")}/${person}`)
        cy.injectAxe()
    }

    Commentcheckbox(id){
        return cy.get(`[id=${id}]`)
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

    addCommentTitleField() {
        return cy.get('[id="add-comment-title-field"]')
    }

    addCommentTitleError()
    {
        return cy.get('[id="add-comment-title-error"]')
    }

    commentFormDescription (){
        return cy.get('[data-testid="comment-form:description"]')
    }
    
    addCommentForm() {
        return cy.get('[data-testid="add-comment-to-person"]')
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
    addCommentsTitleError() {
        return cy.get('#add-comment-title-error');
    };
    addCommentsDescriptionError() {
        return cy.get('#add-comment-description-error');
    };
    addCommentsCategoryError() {
        return cy.get('#add-comment-category-error');
    };

    commentDescriptionError() {
        return cy.get('#add-comment-description-error')
    }

    addCommentLabel() {
        return cy.get('.add-comment-person govuk-label lbh-label')
    }

    commentContainer() {
        return cy.get('#add-comment-description-field')
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

    personCommentsComponentsAreDisplayed() {
        this.addCommentForm().should('be.visible')
        // this.addCommentLabel().should('be.visible')
        this.commentContainer().should('be.visible')
        this.characterCountMessage().should('be.visible')
        this.submitCommentButton().should('be.visible')
    }
}

export default PersonCommentsPageObjects