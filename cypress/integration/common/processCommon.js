import { Given, Then, When } from "cypress-cucumber-preprocessor/steps"
import PersonPageObjects from "../../pageObjects/personPage"
import TenurePageObjects from "../../pageObjects/tenurePage";
import ProcessesPageObjects from "../../pageObjects/ProcessesPage";

const personPage = new PersonPageObjects()
const processesPage = new ProcessesPageObjects()
const tenurePage = new TenurePageObjects()
const envConfig = require('../../../environment-config')
let process =''

When('I select New Process menu {string}',  (processType) => {
    switch (processType) {
        case "person":
            personPage.newProcess().click()
            break;
        case "tenure":
            tenurePage.newProcess().click()
            break;
        case "property":
        
        default:
        break;
    }
})

Then ('I am directed to the main process landing page', ()=>{
    processesPage.pageTitle()
})