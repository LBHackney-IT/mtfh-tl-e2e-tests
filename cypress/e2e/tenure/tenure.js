import { When, Then, Given, And } from "@badeball/cypress-cucumber-preprocessor";
import TenurePageObjects from '../../pageObjects/tenurePage';
import { getTenure, createTenureWithStartDate, createTenureWithNoOtherResponsibleHouseholdMembers } from "../../../api/tenure";
import { generateAsset } from "../../../api/models/requests/createAssetModel";
import { person } from "../../../api/models/requests/createPersonModel";
import { generateTenure } from "../../../api/models/requests/addTenureModel";
import { addTestRecordToDatabase } from "../common/common";

const tenurePage = new TenurePageObjects
let tenureId = ''

Then("a link to the property is displayed", () => {
    cy.getTenureFixture().then((tenure) => {
        cy.contains(tenure.tenuredAsset.fullAddress)
    })
})

Given("the start date of the tenure is {string}", (startOfTenureDate) => {
    cy.log("Creating new tenure record");
    createTenureWithStartDate(startOfTenureDate).then(response => {
        cy.log(`Status code ${response.status} returned`);
        cy.log('Start of Tenure Date: ', response.body.startOfTenureDate)
        cy.log(`Tenure Id for record ${response.body.id} created!`);
        tenureId = response.body.id
    });
});

Given('the start date for the selected tenure record is before 31 December 2013 {string}', async (tenureId) => {
    const getResponse = await getTenure(tenureId)
    cy.log(`Status code ${getResponse.status} returned`)
    var startDate = new Date(getResponse.data.startOfTenureDate)
    var threshold = new Date(2013, 12, 31)
    cy.log('startDate', startDate)
    cy.log('threshold', threshold)
    expect(startDate).to.lessThan(threshold)
})

And('the start date for the tenure record is before 31 December 2013', () => {
    cy.getTenureFixture().then((tenure) => {
        const startDate = new Date(tenure.startOfTenureDate)
        const threshold = new Date(2013, 12, 31)
        cy.log('startDate', startDate)
        cy.log('threshold', threshold)
        expect(startDate).to.lessThan(threshold)
      })
})

And('the start date for the tenure record is after 31 December 2013', () => {
    cy.getTenureFixture().then((tenure) => {
        const startDate = new Date(tenure.startOfTenureDate)
        const threshold = new Date(2013, 12, 31)
        cy.log('startDate', startDate)
        cy.log('threshold', threshold)
        expect(startDate).to.greaterThan(threshold)
      })
})

Given("There are only responsible household members for the tenure", async () => {
    cy.log("Creating new tenure record");
    const response = await createTenureWithNoOtherResponsibleHouseholdMembers();

    cy.log(`Status code ${response.status} returned`);
    cy.log(`Tenure Id for record ${response.data.id} created!`);
    tenureId = response.data.id
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
    tenurePage.residentDetailsAccordion().click({force: true})
})

Then('the household member details are displayed', () => {
    cy.url().should('include', '/person')
})

And('I select a resident', () => {
    // tenurePage.viewResidentButton().should('have.attr', 'href').and('include', '/person')
    // tenurePage.viewResidentButton().eq(0).click()
    tenurePage.viewResidentButtonforPerson().click();
})

Then('the resident details are displayed', () => {
    cy.url().should('include', '/person')
})

Then('Then the Scanned historic tenure records button is displayed', () => {
    tenurePage.scannedHistoricTenureRecords().should(vis)
})

And('I click the tenure details accordion', () => {
    tenurePage.tenureDetailsAccordion().click({force: true})
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

// Database seed methods

Given("I create a tenure that started on date {string}, with no responsible household members", (startOfTenureDate) => {
    const assetModel = generateAsset()
    const personModel1 = person();
    const personModel2 = person();
    const tenureModel = generateTenure({}, assetModel, [personModel1, { isResponsible: false, personTenureType: "Tenant", ...personModel2 }], undefined, startOfTenureDate);
    tenureModel.householdMembers = [];

    addTestRecordToDatabase("TenureInformation", tenureModel)
})