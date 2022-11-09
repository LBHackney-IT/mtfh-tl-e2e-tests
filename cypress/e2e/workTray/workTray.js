import {And, Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import ModalPageObjects from "../../pageObjects/sharedComponents/modal";
import homePage from "../../pageObjects/homePage";
import workTrayPage from "../../pageObjects/workTrayPage";
import changeOfNamePage from "../../pageObjects/changeOfNamePage";

const homePagePO = new homePage()
const workTrayPO = new workTrayPage();
const changeOfNamePagePO = new changeOfNamePage();
const modal = new ModalPageObjects();

const applyFiltersFunc = () => {
    changeOfNamePagePO.visitHomePage();
    homePagePO.yourTasksText().should('be.visible');
    workTrayPO.filterBy().click();
    workTrayPO.textProcesses().should('contain.text', 'Processes');
    workTrayPO.checkboxSoleToJoint().click();
    workTrayPO.applyFilters().click();
};

Then("I can see my worktray dashboard", () => {
    homePagePO.yourTasksText().should('be.visible');
});
Then("view all the jobs only within my patches", () => {

});
When("I click on Filter by", () => {
    workTrayPO.filterBy().click();
})
And("I can see all the Processes", () => {


});
And("I can see all the Patches", () => {
    workTrayPO.textPatches().should('contain.text', 'Patches');
});
And("view all the jobs only within my patches under Process Status", () => {
    workTrayPO.textProcessStatus().should('contain.text', 'Process Status');
});
When("I Select Process Sole to Joint and Change of Name", () => {
    workTrayPO.processesSelectAll().click();
});
And("I select one or more of the Patches", () => {
    workTrayPO.patchesSelectAll().click();
});
And("I select oen or more of the Process Status", () => {
    workTrayPO.processStatusSelectAll().click();
});
When("I select 'Clear filters'", () => {
    workTrayPO.clearFilters().click();
});
Then("ALL the checkboxes within ALL filter listing will be removed", () => {
    workTrayPO.checkboxSoleToJoint().should('not.be.checked');
    workTrayPO.checkboxChangeOfName().should('not.be.checked');
   // workTrayPO.processCompleted().should('not.be.checked');
});
And("the existing listing display will REMAIN unchanged", () => {

});
When("I click the APPLY filter button", () => {
    workTrayPO.applyFilters().click();
});
Then("the results will display NO results", () => {

});
Given("I am viewing my patch on worktray", () => {
    applyFiltersFunc();
});
When("I click on the process status button then I am taken to the current step in the process to continue the process", () => {
    cy.get(':nth-child(1) > .--processName > .govuk-link').invoke('removeAttr', 'target').click();
    cy.url().should('contain', '/processes');
    cy.go('back');
});

Given("I am viewing my work tray", () => {
    applyFiltersFunc();
});
When("I click tenant name then I am taken to the person page on a new tab", () => {
    cy.get('[data-testid="person-link"]').first().invoke('removeAttr', 'target').click();
    cy.url().should('contain', '/person');
    cy.contains('Correspondence address 1:');
    cy.go('back');
});

When("I click property address then I am taken to the property detail page on a new tab", () => {
    cy.get('[data-testid="property-link"]').first().invoke('removeAttr', 'target').click();
    cy.url().should('contain', '/property');
    cy.contains('Payment ref.');
    cy.go('back');
});

When("I click the process name", () => {
    cy.get(':nth-child(1) > .--processName > .govuk-link').invoke('removeAttr', 'target').click();
    //cy.contains('')
    cy.go('back');
});
Then("I see processes belonging to me in order of urgency of cases", () => {

});
When("I click patch name", () => {

});
Then("I see all property addresses in that patch sorted in order of urgency of cases", () => {

});
When("I click next", () => {

});
Then("I am taken to the next page of my work tray list", () => {

});
And("I can see the panel title", () => {
    workTrayPO.filterBy().click();
    workTrayPO.textProcesses().should('exist');
});
And("a Processes filter in a list with checkbox", () => {
   // workTrayPO.filterBy().click();
    workTrayPO.checkboxSoleToJoint().should('exist');
});

And("a Process status filter with a checkbox", () => {
    workTrayPO.processCompleted().should('exist');
    workTrayPO.reqSuppDoc().should('exist');
    workTrayPO.submitForTenureInvest().should('exist');
});
And("there will be a select all link", () => {
    workTrayPO.filterBy().click();
    workTrayPO.processesSelectAll().should('be.visible');
});
When("I click on Select All link in Processes", () => {
    workTrayPO.filterBy().click();
    workTrayPO.processesSelectAll().click()
});
Then("I can see Remove All link", () => {
    //workTrayPO.removeAll().should('exist');
    cy.contains('Remove All');
})
And("by default the process filter will select ALL processes", () => {
    workTrayPO.filterBy().click();
    workTrayPO.processesSelectAll().should('be.selected');
});
And("by default the status filter will select ALL statuses", () => {
    workTrayPO.filterBy().click();
    workTrayPO.processStatusSelectAll().should('be.selected');
});
And("an action button to apply my selected filters", () => {
    workTrayPO.filterBy().click();
    workTrayPO.applyFilters().should('exist');
});
And("an action button to clear my filter selections", () => {
    workTrayPO.filterBy().click();
    workTrayPO.clearFilters().should('exist');
});
And("days range of the items being displayed", () => {
    workTrayPO.filterShowDays().should('exist');
});
And("by default day range is pre-selected as last 30 days", () => {
    workTrayPO.filterShowDays().should('contain', 'Last 30 days');
});
And("the number of items being displayed", () => {
    workTrayPO.filterShowItems().should('exist');
});
And("by default number of items displayed is pre-selected as 10 items per page", () => {
    workTrayPO.filterShowItems().should('contain', '10 items');
});
And("there will be pagination displayed", () => {
    workTrayPO.pagination().should('contain', 'Showing');
});
And("I can see the Name or Address of the Tenant", () => {
    workTrayPO.headerNameAddress().should('exist');
    // workTrayPO.headerNameAddress().should('contain','');
});
And("type of process", () => {
    workTrayPO.headerProcess().should('exist');
   // workTrayPO.headerNameAddress().should('contain','');
});
And("Patch", () => {
    workTrayPO.headerPatch().should('exist');
    // workTrayPO.headerPatch().should('contain','');
});
And("state of the process", () => {
    workTrayPO.headerState().should('exist');
    // workTrayPO.headerState().should('contain','');
});
And("time remaining for a process", () => {
    workTrayPO.headerTimeLeftFullProcess().should('exist');
    // workTrayPO.headerTimeLeftFullProcess().should('contain','');
});
And("process status", () => {
    workTrayPO.headerProcessStatus().should('exist');
    // workTrayPO.headerProcessStatus().should('contain','');
});
Then("the default filter will be pre-selected to ALL available process", () => {
    workTrayPO.filterBy().click();
    // workTrayPO.checkboxSoleToJoint().should('be.selected');
    // workTrayPO.checkboxChangeOfName().should('be.selected');
    workTrayPO.checkboxSoleToJoint().click();
    workTrayPO.checkboxChangeOfName().click();
});
And("pre-selected to ALL available status", () => {
    //workTrayPO.processCompleted().should('be.selected');
    workTrayPO.processCompleted().click();
    // workTrayPO.reqSuppDoc().should('be.selected');
    // workTrayPO.submitForTenureInvest().should('be.selected');
    workTrayPO.reqSuppDoc().click();
     workTrayPO.submitForTenureInvest().click();
});
When("I select the checkbox options within the process filter", () => {
    workTrayPO.filterBy().click();
    workTrayPO.checkboxSoleToJoint().click();
    workTrayPO.checkboxChangeOfName().click();
});
And("I click 'Apply filters' action button to apply my selected filters", () => {
    workTrayPO.applyFilters().click();
});
Then("I can see all the jobs refined within my selected parameters under that process listing displayed in order based on process status urgency", () => {
    workTrayPO.personLink().should('exist');
    workTrayPO.propertyLink().should('exist');
});
When("I select 'Remove All' for Process", () => {
    cy.contains('Remove All').click();
});
Then("I can see all the jobs are displayed", () => {
    workTrayPO.personLink().should('exist');
    workTrayPO.propertyLink().should('exist');
})
// When("I select 'Remove All' for Patches", () => {
//
// });
// When("I select 'Remove All' for Process Status", () => {
//
// });
And("the info icon is on display next to process status", () => {
    workTrayPO.iconProcessStatus().should('exist');
});
When("I click on the information icon it will open up to show the additional status information", () => {
    //workTrayPO.iconProcessStatus().realHover();
    workTrayPO.iconProcessStatus().trigger('mouseover');
    cy.get('#process-status-info').should('exist');
});
When("I select the checkbox options within the Patch filter", () => {
    workTrayPO.filterBy().click();
    workTrayPO.patchesSelectAll().click();
});
Then("I can see all the jobs refined within my selected parameters under that Patch", ()=> {

});
When("I select the checkbox options within the Process Status filter", () => {
    workTrayPO.filterBy().click();
    workTrayPO.processStatusSelectAll().click();
});
Then("I can see all the jobs refined within my selected parameters under that Process Status", () => {

});
When("there is more than one listing option available within a filter", () => {

});
Then("it will display 'Select All' feature in a link", () => {
    workTrayPO.filterBy().click();
    workTrayPO.processesSelectAll().should('be.visible');
});
When("I click on it, it will select ALL items within that specific filter listing", () => {
    workTrayPO.filterBy().click();
    cy.get(':nth-child(1) > .filter-header > [data-testid=filter-box-select-all]').click(({force: true}));
});
And("the link will change to 'Remove All' in a link", () => {
    workTrayPO.processRemoveAll().should('be.visible');
});
When("I click on 'Remove All' it will deselect ALL items within that specific filter listing", () => {
    workTrayPO.filterBy().click();
    cy.get(':nth-child(1) > .filter-header > [data-testid=filter-box-remove-all]').click();
    workTrayPO.checkboxSoleToJoint().should('not.be.checked');
    workTrayPO.checkboxChangeOfName().should('not.be.checked');
});

