import changeOfNamePage from "../pageObjects/changeOfNamePage";
import homePage from "../pageObjects/homePage";
import workTrayPage from "../pageObjects/workTrayPage";

const homePagePO = new homePage()
const workTrayPO = new workTrayPage();
const changeOfNamePagePO = new changeOfNamePage();

const tags = ['@worktray', '@common', '@root', '@processes', '@authentication']


describe('Worktray Feature', {tags: tags}, ()=> {
    beforeEach(()=> {
        cy.login();
        homePagePO.visit();
        homePagePO.iAmOnTheHomePage();
    })

    it('should view worktray', {'tags': '@SmokeTest'},()=> {
        homePagePO.yourTasksText().should('be.visible');
        workTrayPO.filterBy().click();
        workTrayPO.checkboxSoleToJoint().should('exist');
        workTrayPO.checkboxChangeOfName().should('exist');
        workTrayPO.textPatches().should('contain.text', 'Patches');
        workTrayPO.textProcesses().should('exist');
        workTrayPO.checkboxSoleToJoint().should('exist');
        workTrayPO.processesSelectAll().should('be.visible').click();
        cy.contains('Remove All');
        workTrayPO.applyFilters().should('exist');
        workTrayPO.clearFilters().should('exist');
        workTrayPO.filterShowDays().should('exist');
        workTrayPO.filterShowDays().should('contain', 'Last 30 days');
        workTrayPO.filterShowItems().should('exist');
        workTrayPO.filterShowItems().should('contain', '10 items');
        workTrayPO.pagination().should('contain', 'Showing');
        workTrayPO.personLink().should('exist');
        workTrayPO.propertyLink().should('exist');
        workTrayPO.headerProcess().should('exist');
        workTrayPO.headerPatch().should('exist'); 
        workTrayPO.headerState().should('exist');
        workTrayPO.headerTimeLeftFullProcess().should('exist');
        workTrayPO.headerProcessStatus().should('exist');
        workTrayPO.iconProcessStatus().should('exist');
        workTrayPO.iconProcessStatus().trigger('mouseover');
        cy.get('#process-status-info').should('exist');
    })

    it('should filter by process', ()=> {
        workTrayPO.filterBy().click();
        workTrayPO.checkboxSoleToJoint().click();
        workTrayPO.checkboxChangeOfName().click();

        workTrayPO.applyFilters().click();
        workTrayPO.personLink().should('exist');
        workTrayPO.propertyLink().should('exist');

        cy.contains('Remove All').click();
        workTrayPO.applyFilters().click();
        workTrayPO.personLink().should('exist');
        workTrayPO.propertyLink().should('exist');  
    })

    it('should hyperlink to the right page', ()=> {
        //person page
        cy.get('[data-testid="person-link"]').first().invoke('removeAttr', 'target').click();
        cy.url().should('contain', '/person');
        cy.contains('Correspondence address 1:');
        cy.go('back');

        //property page
        cy.get('[data-testid="property-link"]').first().invoke('removeAttr', 'target').click();
        cy.url().should('contain', '/property');
        cy.contains('Payment ref.');
        cy.go('back');

        //continue process page
        cy.get(':nth-child(1) > .--processName > .govuk-link').invoke('removeAttr', 'target').click();
        cy.url().should('contain', '/processes/soletojoint/');
        cy.go('back');
    })

    it('should sort by correctly', ()=> {
        //sort by name/address
        cy.contains('Name / Address').click()

        //sort by state

        //sort by time

        //sort by process state
    })
})