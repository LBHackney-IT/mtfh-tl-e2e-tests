import { Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import FooterPageObjects from '../../pageObjects/sharedComponents/footer';
import HeaderPageObjects from '../../pageObjects/sharedComponents/header';
import PersonCommentsPageObjects from '../../pageObjects/personCommentsPage'
import validComment from '../../helpers/personCommentText'

const footer = new FooterPageObjects
const header = new HeaderPageObjects
const personCommentsPage = new PersonCommentsPageObjects

    // Page Header shared steps
Then('the page header is visible', () => {
    header.headerIsDisplayed()
})

    // Page Footer shared steps
And('the page footer is visible', () => {
    footer.footerIsDisplayed()
})

    // Person Comments shared steps
When ('I enter a valid comment', () => {
    personCommentsPage.commentContainer().type(validComment)
})

Then('I click the save comment button', () => {
    personCommentsPage.submitCommentButton().click()
})

Then('the comment is submitted', () => {
    personCommentsPage.pageAnnouncementHeader().should('be.visible')
    personCommentsPage.pageAnnouncementHeader().contains('Comment successfully saved')
})