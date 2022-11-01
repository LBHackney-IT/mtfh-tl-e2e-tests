import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import TenurePageObjects from '../../pageObjects/tenurePage';
import tenure from "../../../api/tenure";

const tenurePage = new TenurePageObjects
let tenureId = ''

Given("the start date of the tenure is {string}", (startOfTenureDate) => {
    cy.log("Creating new tenure record");
    tenure.createTenureWithStartDate(startOfTenureDate).then(response => {
        cy.log(`11 Status code ${response.status} returned`);
        cy.log ('12 Start of Tenure Date: ',response.body.startOfTenureDate)
        cy.log(`13 Tenure Id for record ${response.body.id} created!`);
        tenureId = response.body.id
    });
});

Given('the start date for the selected tenure record is before 31 December 2013 {string}', async (tenureId) => {
    const getResponse = await tenure.getTenure(tenureId)
    cy.log(`Status code ${getResponse.status} returned`)
    var startDate =  new Date(getResponse.data.startOfTenureDate)
    var threshold =  new Date(2013, 12, 31)
    cy.log('startDate', startDate)
    cy.log('threshold', threshold)
    expect(startDate).to.lessThan(threshold)
})

Given('the start date for the tenure record is before 31 December 2013', async () => {
    tenure.getTenure(tenureId).then(response => {
        cy.log(`Status code ${response.status} returned`)
        const startDate =  new Date(response.body.startOfTenureDate)
        const threshold =  new Date(2013, 12, 31)
        cy.log('startDate', startDate)
        cy.log('threshold', threshold)
        expect(startDate).to.lessThan(threshold)
    })

})

Given("There are only responsible household members for the tenure", async () => {
    cy.log("Creating new tenure record");
    const response = await tenure.createTenureWithNoOtherResponsibleHouseholdMembers();

    cy.log(`Status code ${response.status} returned`);
    cy.log(`Tenure Id for record ${response.data.id} created!`);  
    tenureId = response.data.id
});

Given("There are household members for the tenure", async () => {
    cy.log("Creating new tenure record");
    tenure.createTenure().then(response => {
        cy.log(`Status code ${response.status} returned`);
        cy.log(`Tenure Id for record ${response.body.id} created!`);
        tenureId = response.body.id
    });
});

And('A message says this tenure has no household members', () => {
    tenurePage.tenureResidentsContainer().contains('This tenure has no household members')
})

When('I select a household member', () => {
    tenurePage.householdMemberLink().should('have.attr', 'href').and('include', '/person')
    tenurePage.householdMemberLink().eq(0).click()
})

When('I view this tenure', () => {
    tenurePage.visit(tenureId)
})

When('I view the Other household members section in the tenure page', () => {
    tenurePage.tenureResidentsContainer().should('exist')
})

When('I click the resident details accordion', () => {
    tenurePage.residentDetailsAccordion().click()
})

Then('the household member details are displayed', () => {
    cy.url().should('include', '/person')
})

And('I select a resident', () => {
    tenurePage.viewResidentButton().should('have.attr', 'href').and('include', '/person')
    tenurePage.viewResidentButton().eq(0).click()
})

Then('the resident details are displayed', () => {
    cy.url().should('include', '/person')
})

Then ('Then the Scanned historic tenure records button is displayed',() => {
    tenurePage.scannedHistoricTenureRecords().should(vis)
})

And('I click the tenure details accordion', () => {
    tenurePage.tenureDetailsAccordion().click()
})

And('there are no named tenure holders', () => {
    tenurePage.tenureResidentsContainer().contains('This tenure has no named tenure holders')
})

Then('the residents details accordion information is displayed', () => {
    tenurePage.residentDetailsAccordionInformation()
})

Then('the tenure details accordion information is displayed', () => {
    tenurePage.tenureDetailsAccordionInformation()
})

Then('the Scanned historic tenure records button is displayed', () => {
    tenurePage.scannedHistoricTenureRecords().should('be.visible')
})

Then('the Scanned historic tenure records button is not displayed', () => {
    tenurePage.scannedHistoricTenureRecords().should('not.exist')
})
