import { Given,Then, When } from "cypress-cucumber-preprocessor/steps";
import PersonCommentsPageObjects from '../../pageObjects/personCommentsPage'

const personCommentsPage = new PersonCommentsPageObjects()

Given('Given I am on the create comment for a person page {string}', (person) => {

})

Then('the create comment for a person components are displayed',  () => {

})

Then('I click the save comment button', () => {

})

Then('the comment is submitted', () => {

})

When('I enter {int} characters into the comment field', (characters) => {

})

Then('the number of characters remaining is correct {int}', (characters) => {

})

Then('the warning message tells me I am over by {int}', (characters) => {

})