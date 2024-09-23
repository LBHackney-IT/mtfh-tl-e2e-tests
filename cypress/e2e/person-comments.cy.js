import { seedDatabase } from '../helpers/DbHelpers';
import PersonCommentsPageObjects from "../pageObjects/personCommentsPage";
import PersonPageObjects from '../pageObjects/personPage';
import helperText from '../helpers/inputText'

const personCommentsPage = new PersonCommentsPageObjects();
const personPage = new PersonPageObjects();
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


describe('Person comments page', {'tags': ['@comments', '@authentication', '@common', '@root']}, ()=> {
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should create comment on person page',{'tags': '@SmokeTest'}, ()=> {
        cy.getPersonFixture().then(({ id: personId }) => {
            personCommentsPage.visit(personId)

            personCommentsPage.addCommentForm().should('be.visible')
            personCommentsPage.submitCommentButton().should('be.visible')

            cy.get('#add-comment-title-field').type("Test Comment 123");
            cy.get('#add-comment-description-field').type("This is a demo and adding a test comment description");
            cy.get('#add-comment-category-field').select('Parking');
            cy.contains('Save comment').click();

            personPage.commentDateTime().should('be.visible')
        
        });
    })

    it('validation message displayed', ()=> {
        cy.getPersonFixture().then(({ id: personId }) => {
            personCommentsPage.visit(personId)

            cy.contains('Save comment').click()
            personCommentsPage.addCommentsError().should('be.visible');
            personCommentsPage.addCommentsTitleError().should('be.visible');
            personCommentsPage.addCommentsDescriptionError().should('be.visible');
            personCommentsPage.addCommentsCategoryError().should('be.visible');
        })
    })

        device.forEach((test) => {
            it('should create a comment for person on a device', {'tags': '@device'}, ()=> {
                cy.getPersonFixture().then((person) => {
                    personCommentsPage.visit(person.id)

                    cy.viewport(`${test}`);
                    cy.get('#add-comment-title-field').type("Test Comment 123");
                    cy.get('#add-comment-description-field').type("This is a demo and adding a test comment description");
                    cy.get('#add-comment-category-field').select('Parking');
                    cy.contains('Save comment').click();

                    personPage.commentDateTime().should('be.visible')

                    personCommentsPage.pageAnnouncementHeader().should("be.visible");
                    personCommentsPage.pageAnnouncementHeader().contains("Comment successfully saved");
                });
            })
   });

   it('should pop up message on cancel comment', ()=> {
        cy.getPersonFixture().then((person) => {
            personCommentsPage.visit(person.id)
            personCommentsPage.discardCommentLink().click()
            
            personCommentsPage.cancellationPopUpWindow().contains('Are you sure you wish to cancel adding this comment?')
            personCommentsPage.cancellationYesButton().contains('Yes').click()
            cy.getPersonFixture().then(async (person) => {
                cy.url().should('eq', `${Cypress.config("baseUrl")}/${Cypress.config("personUrl")}/${person.id}`)
            })

        })
    })

    it('Character limit counter', ()=> {
        cy.getPersonFixture().then((person) => {
            personCommentsPage.visit(person.id)

            const inputText = truncateString(helperText.helperText, 350)
            personCommentsPage.commentContainer().type(inputText)

            personCommentsPage.characterCountMessage().should('be.visible')
            const difference = differenceInCharacters(350)
            personCommentsPage.characterCountMessage().contains(`You have ${difference} characters remaining`)
        })
    })

    it('Character limit exceeded', ()=> {
        cy.getPersonFixture().then((person) => {
            personCommentsPage.visit(person.id)

            const inputText = truncateString(helperText.helperText, 1008)
            personCommentsPage.commentContainer().type(inputText)

            personCommentsPage.characterCountErrorMessage().should('be.visible')
            const difference = differenceInCharacters(1008)
            personCommentsPage.characterCountErrorMessage().contains(`You have ${difference} characters too many`)
        })
    })

    it('Accessibility tests for person comments', {'tags': '@Accessibility'}, ()=> {
        cy.getPersonFixture().then((person) => {
            personCommentsPage.visit(person.id)

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


    
})