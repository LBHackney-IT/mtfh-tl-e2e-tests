import { Given, Then, When, And } from "@badeball/cypress-cucumber-preprocessor"
import TenureCommentsPageObjects from '../../pageObjects/tenureCommentsPage'
import PersonCommentsPageObjects from "../../pageObjects/personCommentsPage"
import PropertyCommentsPageObjects from "../../pageObjects/propertyCommentsPage"
import TenurePageObjects from "../../pageObjects/tenurePage"
import PersonPageObjects from "../../pageObjects/personPage"
import helperText from '../../helpers/inputText'
import commentTitle from "../../helpers/commentText"
import comment from "../../helpers/commentText"
import category from "../../helpers/commentText"
import PropertyPageObjects from "../../pageObjects/propertyPage"
import editPersonPage from "../../pageObjects/editPersonPage";

const tenureCommentsPage = new TenureCommentsPageObjects()
const personCommentsPage = new PersonCommentsPageObjects()
const propertyCommentsPage = new PropertyCommentsPageObjects()
const tenurePage = new TenurePageObjects()
const personPage = new PersonPageObjects()
const propertyPage = new PropertyPageObjects
const envConfig = require('../../../environment-config')

let tenureId = ""
let personId = ""
let uniqueText = (Math.random() + 1).toString(10).substring(5)
let commentGroup = ""
let validationMessageField = ""


// IMPLEMENT BELOW METHOD THAT DOES NOT PASS GUID AND DELETE THIS ONE
// Given('I am on the create comment page for {string} {string}', (commentType, id) => {
//     commentGroup = commentType
//     switch (commentGroup) {
//         case "tenure":
//             cy.getTenureFixture().then(async (tenure) => {
//                 tenureCommentsPage.visit(tenure.id)
//             })
//             break;
//         case "person":
//             personCommentsPage.visit(id)
//             personId = id
//             break;
//         case "property":
//             propertyCommentsPage.visit(id)
//             personId = id
//             break;
//         default:
//             break;
//     }
// })

Given('I am on the create comment page for {string}', (commentType, id) => {
    commentGroup = commentType
    switch (commentGroup) {
        case "tenure":
            cy.getTenureFixture().then(async (tenure) => {
                tenureCommentsPage.visit(tenure.id)
            })
            break;
        case "person":
            cy.getPersonFixture().then(async (person) => {
                personCommentsPage.visit(person.id);
            })
            break;
        case "property":
            propertyCommentsPage.visit(id)
            personId = id
            break;
        default:
            break;
    }
})

When('I enter a valid title', () => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.addCommentTitleField().type(commentTitle.commentTitle)
            break;
        case "person":
            personCommentsPage.addCommentTitleField().type(commentTitle.commentTitle)
            break;
        case "property":
            propertyCommentsPage.addCommentTitleField().type(commentTitle.commentTitle)
        default:
            break;
    }
})

// IMPLEMENT BELOW METHOD THAT DOES NOT PASS GUID AND DELETE THIS ONE
// When('I select a checkbox for {string}', (checkbox) => {
//     switch (commentGroup) {
//         case "tenure":
//             cy.getTenureFixture().then(async (tenure) => {
//                 personCommentsPage.Commentcheckbox(tenure.householdMembers[1].id).check()
//             })
//             break;
//         case "person":
//             personCommentsPage.Commentcheckbox(checkbox).check()
//             break;
//         case "property":
//             propertyCommentsPage.Commentcheckbox(checkbox).check()
//             break;
//         default:
//             break;
//     }
// })

When('I select a checkbox', () => {
    switch (commentGroup) {
        case "tenure":
            cy.getTenureFixture().then(async (tenure) => {
                personCommentsPage.Commentcheckbox(tenure.householdMembers[1].id).check()
            })
            break;
        // case "person":
        //     personCommentsPage.Commentcheckbox(checkbox).check()
        //     break;
        // case "property":
        //     propertyCommentsPage.Commentcheckbox(checkbox).check()
        //     break;
        default:
            break;
    }
})

When('I enter a valid comment', () => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.commentContainer().type(comment.comment);
            break;
        case "person":
            personCommentsPage.commentContainer().type(comment.comment);
            break;
        case "property":
            propertyCommentsPage.commentContainer().type(comment.comment);
            break;
        default:
            break;
    }
})

When('I select a comment category {string}', (category) => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.addCommentCategoryField().select(category)
            break;
        case "person":
            personCommentsPage.addCommentCategoryField().select(category)
            break;
        case "property":
            propertyCommentsPage.addCommentCategoryField().select(category)
            break;
        default:
            break;
    }
})

When('I create a comment', () => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.addCommentTitleField().type(commentTitle.commentTitle + ' : ' + uniqueText)
            tenureCommentsPage.commentFormDescription().type(comment.comment + ' : ' + uniqueText)
            tenureCommentsPage.addCommentCategoryField().select(category.category)
            tenureCommentsPage.submitCommentButton().click()
            break;
        case "person":
            personCommentsPage.addCommentTitleField().type(commentTitle.commentTitle + ' : ' + uniqueText)
            personCommentsPage.commentFormDescription().type(comment.comment + ' : ' + uniqueText)
            personCommentsPage.addCommentCategoryField().select(category.category)
            personCommentsPage.submitCommentButton().click()
            break;
        case "property":
            propertyCommentsPage.addCommentTitleField().type(commentTitle.commentTitle + ' : ' + uniqueText)
            propertyCommentsPage.commentFormDescription().type(comment.comment + ' : ' + uniqueText)
            propertyCommentsPage.addCommentCategoryField().select(category.category)
            propertyCommentsPage.submitCommentButton().click()
            break;
        default:
            break;
    }
})

Then('I click the save comment button {string}', (commentGroup) => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.submitCommentButton().click();
            break;
        case "person":
            personCommentsPage.submitCommentButton().click();
            break;
        case "property":
            propertyCommentsPage.submitCommentButton().click();
            break;
        default:
            break;
    }
})

Then('the comment is submitted {string}', (commentGroup) => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.pageAnnouncementHeader().should("be.visible");
            tenureCommentsPage.pageAnnouncementHeader().contains("Comment successfully saved");
            break;
        case "person":
            personCommentsPage.pageAnnouncementHeader().should("be.visible");
            personCommentsPage.pageAnnouncementHeader().contains("Comment successfully saved");
            break;
        case "property":
            propertyCommentsPage.pageAnnouncementHeader().should("be.visible");
            propertyCommentsPage.pageAnnouncementHeader().contains("Comment successfully saved");
            break;
        default:
            break;
    }
})

Then('I can see the same comments in the linked entities', () => {
    switch (commentGroup) {
        case "tenure":
            tenurePage.comment().contains(uniqueText)
            cy.getTenureFixture().then(async (tenure) => {
                cy.contains(tenure.householdMembers[1].fullName).click()
                personPage.comment().contains(uniqueText)
            })
            break;
        case "person":
            personPage.comment().contains(uniqueText)
            personPage.viewTenureButton().click()
            tenurePage.comment().contains(uniqueText)
            break;
        case "property":
            propertyPage.comment().contains(uniqueText)
            propertyPage.viewTenureButton().click()
            tenurePage.comment().contains(uniqueText)
            break;
        default:
            break;
    }
})

Then('the create comment component is displayed', () => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.addCommentForm().should('be.visible')
            tenureCommentsPage.submitCommentButton().should('be.visible')
            break;
        case "person":
            personCommentsPage.addCommentForm().should('be.visible')
            personCommentsPage.submitCommentButton().should('be.visible')
            break;
        case "property":
            propertyCommentsPage.addCommentForm().should('be.visible')
            propertyCommentsPage.submitCommentButton().should('be.visible')
            break;
        default:
            break;
    }
})

// Field validation related steps
When('I enter {int} characters into the comment field {string}', (characters, commentType) => {
    commentGroup = commentType
    const inputText = truncateString(helperText.helperText, characters)
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.commentContainer().type(inputText)
            break;
        case "person":
            personCommentsPage.commentContainer().type(inputText)
            break;
        case "property":
            propertyCommentsPage.commentContainer().type(inputText)
            break;
        default:
            break;
    }
})

When('I do not fill the mandatory fields:{string} {string} {string}', (commentTitle, commentDescription, commentCategory) => {
    switch (commentGroup) {
        case "tenure":
            if (commentTitle === "") {
                tenureCommentsPage.commentContainer().type(commentDescription);
                tenureCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentTitle"
            }
            else if (commentDescription === "") {
                tenureCommentsPage.addCommentTitleField().type(commentTitle)
                tenureCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentDescription"
            }
            else if (commentCategory === "") {
                tenureCommentsPage.addCommentTitleField().type(commentTitle)
                tenureCommentsPage.commentContainer().type(commentDescription)
                validationMessageField = "commentCategory"
            }
            break;
        case "person":
            if (commentTitle === "") {
                personCommentsPage.commentContainer().type(commentDescription);
                personCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentTitle"
            }
            else if (commentDescription === "") {
                personCommentsPage.addCommentTitleField().type(commentTitle)
                personCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentDescription"

            }
            else if (commentCategory === "") {
                personCommentsPage.addCommentTitleField().type(commentTitle)
                personCommentsPage.commentContainer().type(commentDescription)
                validationMessageField = "commentCategory"
            }
            break;
        case "property":
            if (commentTitle === "") {
                propertyCommentsPage.commentContainer().type(commentDescription);
                propertyCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentTitle"

            }
            else if (commentDescription === "") {
                propertyCommentsPage.addCommentTitleField().type(commentTitle)
                propertyCommentsPage.addCommentCategoryField().select(commentCategory)
                validationMessageField = "commentDescription"

            }
            else if (commentCategory === "") {
                propertyCommentsPage.addCommentTitleField().type(commentTitle)
                propertyCommentsPage.commentContainer().type(commentDescription)
                validationMessageField = "commentCategory"
            }
            break;
        default:
            break;
    }
})

When('I click the Discard comment link', () => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.discardCommentLink().click()
            break;
        case "person":
            personCommentsPage.discardCommentLink().click()
            break;
        case "property":
            propertyCommentsPage.discardCommentLink().click()
            break;
        default:
            break;
    }
})

Then('I can cancel the comment', () => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.cancellationYesButton().contains('Yes').click()
            cy.getTenureFixture().then(async (tenure) => {
                cy.url().should('eq', `${envConfig.baseUrl}/${envConfig.tenureUrl}/${tenure.id}`)
            })
            break;
        case "person":
            personCommentsPage.commentContainer().type(inputText)
            break;
        case "property":
            propertyCommentsPage.commentContainer().type(inputText)
            break;
        default:
            break;
    }
})

Then('I can see a specific validation message for the field {string}', (validationMessage) => {
    switch (commentGroup) {
        case "tenure":
            if (validationMessageField == "commentTitle") {
                tenureCommentsPage.addCommentTitleError().contains(validationMessage)
            }
            else if (validationMessageField == "commentDescription") {
                tenureCommentsPage.commentDescriptionError().contains(validationMessage)
            }
            else if (validationMessageField == "commentCategory") {
                tenureCommentsPage.addCommentCategoryError().contains(validationMessage)
            }
            break;
        case "person":
            if (validationMessageField == "commentTitle") {
                personCommentsPage.addCommentTitleError().contains(validationMessage)
            }
            else if (validationMessageField == "commentDescription") {
                personCommentsPage.commentDescriptionError().contains(validationMessage)
            }
            else if (validationMessageField == "commentCategory") {
                personCommentsPage.addCommentCategoryError().contains(validationMessage)
            }
            break;
        case "property":
            if (validationMessageField == "commentTitle") {
                propertyCommentsPage.addCommentTitleError().contains(validationMessage)
            }
            else if (validationMessageField == "commentDescription") {
                propertyCommentsPage.commentDescriptionError().contains(validationMessage)
            }
            else if (validationMessageField == "commentCategory") {
                propertyCommentsPage.addCommentCategoryError().contains(validationMessage)
            }
            break;
        default:
            break;
    }
})

Then('I can see the cancellation pop up for comment', () => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.cancellationPopUpWindow().contains('Are you sure you wish to cancel adding this comment?')
            break;
        case "person":
            personCommentsPage.cancellationPopUpWindow().contains('Are you sure you wish to cancel adding this comment?')
            break;
        case "property":
            propertyCommentsPage.cancellationPopUpWindow().contains('Are you sure you wish to cancel adding this comment?')
            break;
        default:
            break;
    }
})

Then('the number of characters remaining is correct {int} {string}', (characters, commentGroup) => {
    const difference = differenceInCharacters(characters)

    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.characterCountMessage().should('be.visible')
            tenureCommentsPage.characterCountMessage().contains(`You have ${difference} characters remaining`)
            break;
        case "person":
            personCommentsPage.characterCountMessage().should('be.visible')
            personCommentsPage.characterCountMessage().contains(`You have ${difference} characters remaining`)
            break;
        case "property":
            propertyCommentsPage.characterCountMessage().should('be.visible')
            propertyCommentsPage.characterCountMessage().contains(`You have ${difference} characters remaining`)
            break;
        default:
            break;
    }
})

Then('the warning message tells me I am over by {int}', (characters) => {
    const difference = differenceInCharacters(characters)

    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.characterCountErrorMessage().should('be.visible')
            tenureCommentsPage.characterCountErrorMessage().contains(`You have ${difference} characters too many`)
            break;
        case "person":
            personCommentsPage.characterCountErrorMessage().should('be.visible')
            personCommentsPage.characterCountErrorMessage().contains(`You have ${difference} characters too many`)
            break;
        case "property":
            propertyCommentsPage.characterCountErrorMessage().should('be.visible')
            propertyCommentsPage.characterCountErrorMessage().contains(`You have ${difference} characters too many`)
            break;
        default:
            break;
    }
})

Then('a validation error occurs {string}', (commentGroup) => {
    switch (commentGroup) {
        case "tenure":
            tenureCommentsPage.addCommentsError().should('be.visible')
            tenureCommentsPage.commentDescriptionError().should('be.visible')
            break;
        case "person":
            personCommentsPage.addCommentsError().should('be.visible');
            personCommentsPage.addCommentsTitleError().should('be.visible');
            personCommentsPage.addCommentsDescriptionError().should('be.visible');
            personCommentsPage.addCommentsCategoryError().should('be.visible');
            break;
        case "property":
            propertyCommentsPage.addCommentsError().should('be.visible')
            propertyCommentsPage.commentDescriptionError().should('be.visible')
            break;
        default:
            break;
    }
})

Then('I can see the timestamp for the created comment {string}', (commentGroup) => {
    switch (commentGroup) {
        case "tenure":
            tenurePage.commentDateTime().should('be.visible')
            break;
        case "person":
            personPage.commentDateTime().should('be.visible')
            break;
        case "property":
            propertyPage.commentDateTime().should('be.visible')
            break;
        default:
            break;
    }
})

// Then("I am on the Person details page for Alerts", () => {
//     cy.getPersonFixture().then(({ id: personId }) => {
//         personPage.visit(personId);
//     })
//     cy.contains('Cautionary Alerts');
// });

Then("I am on the person details page", () => {
    cy.getPersonFixture().then(({ id: personId }) => {
        personPage.visit(personId);
    })
})

Then("I am on the Property details page", () => {
    cy.contains('UPRN');
})
Then("Add comment button is displayed", () => {
    personPage.addCommentButton().should('exist');
})
When("I click on Add comment button", () => {
    personPage.addCommentButton().click();
});
And("I create a comment for test", () => {
    cy.get('#add-comment-title-field').type("Test Comment 123");
    cy.get('#add-comment-description-field').type("This is a demo and adding a test comment description");
    cy.get('#add-comment-category-field').select('Parking');
    cy.contains('Save comment').click();
})

function differenceInCharacters(characters) {
    return Math.abs(1000 - characters)
}

function truncateString(str, num) {
    if (str.length <= num) {
        return str
    }
    return str.toString().slice(0, num)
}