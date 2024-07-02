import { seedDatabaseWithTenure } from '../helpers/DbHelpers';
import PersonCommentsPageObjects from '../pageObjects/personCommentsPage';
import PersonPageObjects from '../pageObjects/personPage';

const personCommentsPage = new PersonCommentsPageObjects();
const personPage = new PersonPageObjects();
const tags = ['@comments', '@authentication', '@common', '@root']

describe('Person Comments page', {'tags': tags}, ()=> {
    beforeEach(() => {
        cy.login();
        seedDatabaseWithTenure();
    });

    it('should create person comment', {'tags': '@SmokeTest'},()=> {
        cy.getPersonFixture().then(({ id: personId }) => {
            personCommentsPage.visit(personId)

            personCommentsPage.addCommentForm().should('be.visible')
            personCommentsPage.submitCommentButton().should('be.visible')
        });
        // cy.getPersonFixture().then(({id: personId}) => {
        //     personCommentsPage.visit(personId)
        //     cy.log("visit comment page ------------------")
        //     personCommentsPage.addCommentForm().should('be.visible')
        //     personCommentsPage.submitCommentButton().should('be.visible')

        //     // cy.get('#add-comment-title-field').type("Test Comment 123");
        //     // cy.get('#add-comment-description-field').type("This is a demo and adding a test comment description");
        //     // cy.get('#add-comment-category-field').select('Parking');
        //     // cy.contains('Save comment').click();

        //     // personPage.commentDateTime().should('be.visible')
        // })
    })
})