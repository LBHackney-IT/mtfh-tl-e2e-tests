import TenurePageObjects from "../pageObjects/tenurePage";
import { seedDatabaseWithTenure } from "../helpers/DbHelpers";

const tenure = new TenurePageObjects();
const tags = ['@tenure','@authentication', '@common', '@root', '@search', '@worktray', '@personal-details']

describe('tenure page', {tags: tags}, () => {
    beforeEach(() => {
        seedDatabaseWithTenure();
        cy.login();
    });

    it('should view resident details for new tenure', ()=> {
        cy.getTenureFixture().then(({ id: tenureId }) => {
            //Given & when
            tenurePage.visit(tenureId);
          });

        //then
        tenurePage.tenureDetailsContainer().should("be.visible");
        tenurePage.tenureDetailsContainer().contains("Status");
        tenurePage.tenureDetailsContainer().contains("Start date");
        tenurePage.tenureDetailsContainer().contains("End date");
        tenurePage.tenureDetailsContainer().contains("Type");  
        cy.url().should('include', '/person')
        
    })

    it('should navigate to old tenancy files', ()=>{
        cy.log("Creating new tenure record");
        createTenureWithStartDate(startOfTenureDate).then(response => {
            cy.log(`Status code ${response.status} returned`);
            cy.log('Start of Tenure Date: ', response.body.startOfTenureDate)
            cy.log(`Tenure Id for record ${response.body.id} created!`);
            tenureId = response.body.id
        });
        
    })


})