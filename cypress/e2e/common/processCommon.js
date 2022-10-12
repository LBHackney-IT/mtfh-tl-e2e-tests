import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor"
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

When('I select a process {string}', (process) => {
    processesPage.processOption(process).click()
})

Then("I am on the google form Tenancy Change and can see the data {string} {string} {string} {string}", (yourName,propertyAddress,propertyReference,tenancyReference) => {
    cy.findAllByText('Other tenancy changes').invoke('removeAttr', 'target').click();
    cy.url()
        .should('include', 'https://docs.google.com/forms/d/e/1FAIpQLSdgJ9DSgGI0Aj7GO1bzLbbrArPabjS8DQwmvwb9ltB-qYYESA/viewform')
    cy.findAllByText('Tenancy Change');

    // cy.log('cy.xpath("//form[1]//div[1]//div[1]//input[2]").invoke(\'show\')').v
    // cy.xpath("//form[1]//div[1]//div[1]//input[2]").invoke('show').contains('FAKE_Julie FAKE_Davies')

    // processesPage.propertyAddress().should('contain',propertyAddress);
    // processesPage.propertyReference().should('contain',propertyReference);
    // processesPage.tenancyReference().should('contain',tenancyReference);

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