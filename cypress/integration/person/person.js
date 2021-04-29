import { Given,Then, When } from "cypress-cucumber-preprocessor/steps";
import PersonPageObjects from '../../pageObjects/personPage'

const personPage = new PersonPageObjects()

Given('I have loaded a Person record', () => {
    personPage.visit()
})

Then('the header Person details are displayed', () => {
    personPage.headerPersonalDetailsAreDisplayed()
})

When('I click on the expand all sections button', () => {
    personPage.headerContainerExpandPersonalDetails()
})

Then('the body Person details are displayed', () => {
    personPage.bodyPersonalDeatailsAreDisplayed()
})