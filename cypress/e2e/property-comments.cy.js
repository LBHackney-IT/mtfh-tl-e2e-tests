import PropertyPageObjects from "../pageObjects/propertyPage";
import PropertyCommentsPageObjects from "../pageObjects/propertyCommentsPage";
import { seedDatabase } from "../helpers/DbHelpers";
import helperText from '../helpers/inputText';
import { commentTitle, comment } from "../helpers/commentText";
import category from "../helpers/commentText";
const propertyPage = new PropertyPageObjects();
const propertyCommentsPage = new PropertyCommentsPageObjects();

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

const tags = ['@property', '@authentication', '@common', '@root', '@comments']

describe('View property page', {'tags': tags}, ()=> {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should show validation message on add new comment', ()=> {
       
        cy.getAssetFixture().then((asset) => {
            propertyCommentsPage.visit(asset.id);

            propertyCommentsPage.addCommentForm().should('be.visible')
            propertyCommentsPage.submitCommentButton().should('be.visible')

            propertyCommentsPage.submitCommentButton().click(); 
            propertyCommentsPage.addCommentsError().should('be.visible')
            propertyCommentsPage.commentDescriptionError().should('be.visible')

        });
    })

    it('should create comment for property', {'tags':'@SmokeTest'},()=> {
        cy.getAssetFixture().then((asset) => {
            propertyCommentsPage.visit(asset.id);

            propertyCommentsPage.addCommentForm().should('be.visible')
            propertyCommentsPage.submitCommentButton().should('be.visible')

            cy.get('#add-comment-title-field').type("Test Comment 123");
            cy.get('#add-comment-description-field').type("This is a demo and adding a test comment description");
            cy.get('#add-comment-category-field').select('Parking');
            cy.contains('Save comment').click();

            propertyPage.commentDateTime().should('be.visible')
        })
    })

    it('Character limit counter', ()=> {
        cy.getAssetFixture().then((property) => {
            propertyCommentsPage.visit(property.id)

            const inputText = truncateString(helperText.helperText, 350)
            propertyCommentsPage.commentContainer().type(inputText)

            propertyCommentsPage.characterCountMessage().should('be.visible')
            const difference = differenceInCharacters(350)
            propertyCommentsPage.characterCountMessage().contains(`You have ${difference} characters remaining`)
        })
   })

   it('Character limit exceeded', ()=> {
        cy.getAssetFixture().then((property) => {
            propertyCommentsPage.visit(property.id)

            const inputText = truncateString(helperText.helperText, 1008)
            propertyCommentsPage.commentContainer().type(inputText)

            propertyCommentsPage.characterCountErrorMessage().should('be.visible')
            const difference = differenceInCharacters(1008)
            propertyCommentsPage.characterCountErrorMessage().contains(`You have ${difference} characters too many`)
        })
   })

   it('Accessibility tests for property comments', {'tags': '@Accessibility'}, ()=> {
        cy.getAssetFixture().then((property) => {
            propertyCommentsPage.visit(property.id)

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
        it('should create a comment for property on a device', {'tags': '@device'}, ()=> {
            cy.getAssetFixture().then((property) => {
                propertyCommentsPage.visit(property.id)

                cy.viewport(`${test}`);
                propertyCommentsPage.addCommentTitleField().type(commentTitle.commentTitle + ' : ' + uniqueText)
                propertyCommentsPage.commentFormDescription().type(comment.comment + ' : ' + uniqueText)
                propertyCommentsPage.addCommentCategoryField().select(category.category)
                propertyCommentsPage.submitCommentButton().click()

                propertyCommentsPage.pageAnnouncementHeader().should("be.visible");
                propertyCommentsPage.pageAnnouncementHeader().contains("Comment successfully saved");
            });
        })
   });
})
