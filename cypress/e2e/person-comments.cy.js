import { addTestRecordToDatabase } from '../helpers/DbHelpers';
import PersonCommentsPageObjects from '../pageObjects/personCommentsPage';
import PersonPageObjects from '../pageObjects/personPage';
import { person } from '../../api/models/requests/createPersonModel';

const personCommentsPage = new PersonCommentsPageObjects();
const personPage = new PersonPageObjects();
const tags = ['@comments', '@authentication', '@common', '@root']

describe('Person Comments page', {'tags': tags}, ()=> {
    beforeEach(()=> {
        const testPerson = person();
        addTestRecordToDatabase("Persons", testPerson);
    })

    it('should create person comment', {'tags': '@SmokeTest'},()=> {
        cy.getPersonFixture().then((person) => {
            personCommentsPage.visit(person.id)

            personCommentsPage.addCommentForm().should('be.visible')
            personCommentsPage.submitCommentButton().should('be.visible')

            cy.get('#add-comment-title-field').type("Test Comment 123");
            cy.get('#add-comment-description-field').type("This is a demo and adding a test comment description");
            cy.get('#add-comment-category-field').select('Parking');
            cy.contains('Save comment').click();

            personPage.commentDateTime().should('be.visible')
        })
    })
})