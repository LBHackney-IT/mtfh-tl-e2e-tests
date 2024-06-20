import TenurePageObjects from "../pageObjects/tenurePage";
import { seedDatabaseWithTenure } from "../helpers/DbHelpers";
import { createTenureWithStartDate } from "../../api/tenure";
import { generateAsset } from "../../api/models/requests/createAssetModel";
import { generateTenure } from "../../api/models/requests/addTenureModel";
import { person } from "../../api/models/requests/createPersonModel";
import { addTestRecordToDatabase } from "../helpers/DbHelpers";

const tenurePage = new TenurePageObjects();
const tags = ['@tenure','@authentication', '@common', '@root', '@search', '@worktray', '@personal-details'];
const smallDevice = ['iphone-3', 'iphone-4', 'iphone-5', 'iphone-6', 'iphone-6+', 'iphone-7', 'iphone-8', 'iphone-x', 'iphone-xr', 'iphone-se2', 'samsung-s10']
const bigDevice = ['ipad-2', 'ipad-mini', 'macbook-11', 'macbook-11', 'macbook-13', 'macbook-15', 'macbook-16', 'samsung-note9']
describe('tenure page', {'tags': tags}, () => {
    beforeEach(() => {
        cy.login();
        seedDatabaseWithTenure();
    });

    it('should view resident details for new tenure', ()=> {
        cy.getTenureFixture().then(({ id: tenureId }) => {
            //Given & when
            tenurePage.visit(tenureId);

            //then
            tenurePage.tenureDetailsContainer().should('be.visible');
            tenurePage.tenureDetailsContainer().contains('Status');
            tenurePage.tenureDetailsContainer().contains("Start date");
            tenurePage.tenureDetailsContainer().contains("End date");
            tenurePage.tenureDetailsContainer().contains("Type");  
            tenurePage.residentsDetailsAreDisplayed();
        });
        
    });

    it('should navigate to old tenancy files', ()=>{
        cy.log("Creating new tenure record");
        createTenureWithStartDate("2013-12-31").then(response => {
            cy.log(`Status code ${response.status} returned`);
            cy.log('Start of Tenure Date: ', response.body.startOfTenureDate)
            cy.log(`Tenure Id for record ${response.body.id} created!`);
            tenureId = response.body.id
        });
        //given & when
        cy.getTenureFixture().then(({id: tenureId})=> {
            
            tenurePage.visit(tenureId);
            //then
            tenurePage.scannedHistoricTenureRecords().should('be.visible')
        })
    });

    it('should navigate to old tenancy files - button not displayed', ()=>{
        cy.log("Creating new tenure record");
        const assetModel = generateAsset()
        const personModel1 = person();
        const personModel2 = person();
        const tenureModel = generateTenure({}, assetModel, [personModel1, { isResponsible: false, personTenureType: "Tenant", ...personModel2 }], undefined, "2014-12-31");
        tenureModel.householdMembers = [];

        addTestRecordToDatabase("TenureInformation", tenureModel)
        //given & when
        cy.getTenureFixture().then(({id: tenureId})=> {
            
            tenurePage.visit(tenureId);

            //then
            tenurePage.scannedHistoricTenureRecords().should('not.exist')
            tenurePage.tenureResidentsContainer().should('exist')
            tenurePage.tenureResidentsContainer().contains('This tenure has no household members')

        })

    });
    
    it('should view household memebers', ()=> {
        cy.getTenureFixture().then(({ id: tenureId }) => {
            //Given & when
            tenurePage.visit(tenureId);

            //then
            tenurePage.tenureResidentsContainer().should('exist')
            tenurePage.householdMemberLink().should('have.attr', 'href').and('include', '/person')
            tenurePage.householdMemberLink().eq(0).click()
            cy.url().should('include', '/person')

        });
    });

    it('should navigate to personal details', ()=>{
        cy.getTenureFixture().then(({ id: tenureId }) => {
            //Given & when
            tenurePage.visit(tenureId);

            tenurePage.viewResidentButtonforPerson().click();

            //then
            cy.url().should('include', '/person')
        });
    });

    it('Accessibility Testing', {'tags': '@Accessibility'}, ()=>{
        cy.getTenureFixture().then(({ id: tenureId }) => {
            //Given & when
            tenurePage.visit(tenureId);

            //then
            cy.checkA11y(null, null, axeTerminalLog, { skipFailures: true });

            function axeTerminalLog(violations) {
                cy.task(
                "log",
                `${violations.length} accessibility violation${
                    violations.length === 1 ? "" : "s"
                } ${violations.length === 1 ? "was" : "were"} detected`
                );

                const violationData = violations.map(
                ({ id, impact, description, nodes }) => ({
                    id,
                    impact,
                    description,
                    nodes: nodes.length,
                })
                );
                cy.task("table", violationData);
            }
        });
    })

    smallDevice.forEach((device) => {
        it('Mobile view - device with smaller screens', {'tags': '@device'}, ()=> {
            cy.getTenureFixture().then(({ id: tenureId }) => {
                //Given 
                tenurePage.visit(tenureId);
                //when
                cy.viewport(`${device}`);
                tenurePage.tenureDetailsAccordion().click({force: true})
                //then
                tenurePage.tenureDetailsAccordionInformation();
                //when
                tenurePage.residentDetailsAccordion().click({force: true})
                //then
                tenurePage.residentDetailsAccordionInformation();
            });
        })
    });

    bigDevice.forEach((device) => {
        it('Mobile view - device with bigger screens', {'tags': '@device'}, ()=> {
            cy.getTenureFixture().then(({ id: tenureId }) => {
                //Given 
                tenurePage.visit(tenureId);
                //when
                cy.viewport(`${device}`);
                //then
                tenurePage.tenureDetailsAccordionInformation();
                tenurePage.residentDetailsAccordionInformation();
            });
        })
    })

})