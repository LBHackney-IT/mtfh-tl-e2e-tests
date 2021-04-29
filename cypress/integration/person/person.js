import { Given,Then } from "cypress-cucumber-preprocessor/steps";
import PersonPageObjects from '../../pageObjects/personPage'

const personPage = new PersonPageObjects()

Given('I have loaded a Person record', () => {
    personPage.visit()
})

Then('the Person details are displayed', () => {
    personPage.headerPersonalDetailsAreDisplayed()
})