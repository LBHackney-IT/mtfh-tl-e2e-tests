import { Given, Then, When } from "cypress-cucumber-preprocessor/steps"
import PersonPageObjects from "../../pageObjects/personPage"
import TenurePageObjects from "../../pageObjects/tenurePage";
import PropertyPageObjects from "../../pageObjects/propertyPage";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";

const personPage = new PersonPageObjects()
const processesPage = new ProcessesPageObjects()
const tenurePage = new TenurePageObjects()
const propertyPage = new PropertyPageObjects()
const envConfig = require('../../../environment-config')

When('I select New Process menu {string}',  (processType) => {
    switch (processType) {
        case "person":
            personPage.newProcess().click()
            break;
        case "tenure":
            tenurePage.newProcess().click()
            break;
        case "property":
            propertyPage.newProcess().click()
        default:
        break;
    }
})

Then ('I am directed to the main process landing page', ()=>{
    processesPage.pageTitle()
})

Then ('I can see a list of processes', ()=>{
    processesPage.processesMenuList().should('be.visible')
})

And('I select a process {string}', (process) => {
    processesPage.processOption(process).click()
})

And('I select a sub process {string}', (subProcess) => {
    processesPage.subProcessOption(subProcess).click()
})

Then('I am taken to the landing page for that process', (subProcess) => {
    let subProcessUrl
    switch (subProcess) {
        case "Sole tenant requests a joint tenure":
            subProcessUrl = "sole-to-joint"
    }
    cy.url().contains(subProcessUrl)
    processesPage.mainContent().contains(subProcess)
})