import TenureCommentsPageObjects from '../pageObjects/tenureCommentsPage';
import { seedDatabaseWithTenure } from "../helpers/DbHelpers";
import { commentTitle, comment } from "../helpers/commentText";
import category from "../helpers/commentText"
import TenurePageObjects from "../pageObjects/tenurePage";
import helperText from '../helpers/inputText'


const tenurePage = new TenurePageObjects()
const tenureCommentsPage = new TenureCommentsPageObjects()
const tags = ['@comments', '@authentication', '@common', '@root']
let uniqueText = (Math.random() + 1).toString(10).substring(5)
const device = ['ipad-2', 'ipad-mini', 'iphone-3', 'iphone-4', 'iphone-5', 'iphone-6', 'iphone-6+', 'iphone-7', 'iphone-8', 'iphone-xr', 'iphone-se2', 'macbook-11', 'macbook-13', 'macbook-15', 'macbook-16', 'samsung-note9', 'samsung-s10']

function differenceInCharacters(characters) {
    return Math.abs(1000 - characters)
}

function truncateString(str, num) {
    if (str.length <= num) {
        return str
    }
    return str.toString().slice(0, num)
}

describe('tenure comments page', {'tags': tags}, ()=> {
    beforeEach(() => {
        cy.login();
        seedDatabaseWithTenure();
    });

    it('should be able to create comment for tenure page', {'tags': '@SmokeTest'},()=>{
        cy.getTenureFixture().then(({ id: tenureId }) => {
            tenureCommentsPage.visit(tenureId)

            tenureCommentsPage.addCommentForm().should('be.visible')
            tenureCommentsPage.submitCommentButton().should('be.visible')
        });
    })

    it ('should add comment - Relationship between selected record and records in other entities', ()=>{
        cy.getTenureFixture().then((tenure) => {
            tenureCommentsPage.visit(tenure.id)

            tenureCommentsPage.Commentcheckbox(tenure.householdMembers[1].id).check()
            tenureCommentsPage.addCommentTitleField().type(commentTitle.commentTitle + ' : ' + uniqueText)
            tenureCommentsPage.commentFormDescription().type(comment.comment + ' : ' + uniqueText)
            tenureCommentsPage.addCommentCategoryField().select(category.category)
            tenureCommentsPage.submitCommentButton().click()
            tenureCommentsPage.pageAnnouncementHeader().should("be.visible");
            tenureCommentsPage.pageAnnouncementHeader().contains("Comment successfully saved");
            tenurePage.commentDateTime().should('be.visible')

            tenurePage.comment().contains(uniqueText)
            cy.getTenureFixture().then(async (tenure) => {
                cy.contains(tenure.householdMembers[1].fullName).click()
                tenurePage.comment().contains(uniqueText)
            })  
        });
    })

   it('should not submit comment without mandatory fields', ()=> {
        cy.getTenureFixture().then((tenure) => {
            tenureCommentsPage.visit(tenure.id)

                tenureCommentsPage.commentContainer().type("test comment");
                tenureCommentsPage.addCommentCategoryField().select("Rents")
                validationMessageField = "commentTitle"
                tenureCommentsPage.submitCommentButton().click();
                tenureCommentsPage.addCommentTitleError().contains("You must provide a title for this comment")

                cy.get('[class="govuk-textarea lbh-textarea lbh-character-count"]').click().clear()
                tenureCommentsPage.addCommentTitleField().type("comment title")
                tenureCommentsPage.addCommentCategoryField().select("Rents")
                validationMessageField = "commentDescription"
                tenureCommentsPage.submitCommentButton().click();
                tenureCommentsPage.commentDescriptionError().contains("You must enter a description for this comment")
         
                tenureCommentsPage.addCommentCategoryField().select("");
                tenureCommentsPage.addCommentTitleField().type("comment title")
                tenureCommentsPage.commentContainer().type("test comment")
                validationMessageField = "commentCategory"
                tenureCommentsPage.submitCommentButton().click();
                tenureCommentsPage.addCommentCategoryError().contains("You must select a category for this comment")            

        })

   })

   it('should pop up message on cancel comment', ()=> {
        cy.getTenureFixture().then((tenure) => {
            tenureCommentsPage.visit(tenure.id)
            tenureCommentsPage.discardCommentLink().click()
            
            tenureCommentsPage.cancellationPopUpWindow().contains('Are you sure you wish to cancel adding this comment?')
            tenureCommentsPage.cancellationYesButton().contains('Yes').click()
            cy.getTenureFixture().then(async (tenure) => {
                cy.url().should('eq', `${Cypress.config("baseUrl")}/${Cypress.config("tenureUrl")}/${tenure.id}`)
            })

        })
   })

   it('Character limit counter', ()=> {
        cy.getTenureFixture().then((tenure) => {
            tenureCommentsPage.visit(tenure.id)

            const inputText = truncateString(helperText.helperText, 350)
            tenureCommentsPage.commentContainer().type(inputText)

            tenureCommentsPage.characterCountMessage().should('be.visible')
            const difference = differenceInCharacters(350)
            tenureCommentsPage.characterCountMessage().contains(`You have ${difference} characters remaining`)
        })
   })

   it('Character limit exceeded', ()=> {
        cy.getTenureFixture().then((tenure) => {
            tenureCommentsPage.visit(tenure.id)

            const inputText = truncateString(helperText.helperText, 1008)
            tenureCommentsPage.commentContainer().type(inputText)

            tenureCommentsPage.characterCountErrorMessage().should('be.visible')
            const difference = differenceInCharacters(1008)
            tenureCommentsPage.characterCountErrorMessage().contains(`You have ${difference} characters too many`)
        })
   })

   it('Accessibility tests for tenure comments', {'tags': '@Accessibility'}, ()=> {
        cy.getTenureFixture().then((tenure) => {
            tenureCommentsPage.visit(tenure.id)

            cy.checkA11y(null, null, axeTerminalLog, { skipFailures: true });

            function axeTerminalLog(violations) {
              cy.task(
                "log",
                `${violations.length} accessibility violation${
                  violations.length === 1 ? "" : "s"
                } ${violations.length === 1 ? "was" : "were"} detected`
              );
          
              const violationData = violations.map(
                ({ id, impact, description, nodes }) => ({
                  id,
                  impact,
                  description,
                  nodes: nodes.length,
                })
              );
              cy.task("table", violationData);
            }
        })
   })
   device.forEach((test) => {
        it('should create a comment for tenure on a device', {'tags': '@device'}, ()=> {
            cy.getTenureFixture().then((tenure) => {
                tenureCommentsPage.visit(tenure.id)

                cy.viewport(`${test}`);
                tenureCommentsPage.Commentcheckbox(tenure.householdMembers[1].id).check()
                tenureCommentsPage.addCommentTitleField().type(commentTitle.commentTitle + ' : ' + uniqueText)
                tenureCommentsPage.commentFormDescription().type(comment.comment + ' : ' + uniqueText)
                tenureCommentsPage.addCommentCategoryField().select(category.category)
                tenureCommentsPage.submitCommentButton().click()

                tenureCommentsPage.pageAnnouncementHeader().should("be.visible");
                tenureCommentsPage.pageAnnouncementHeader().contains("Comment successfully saved");
            });
        })
   });
})