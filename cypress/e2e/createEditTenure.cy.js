import CreateTenurePageObjects from "../pageObjects/createTenurePage";
import { seedDatabase } from "../helpers/DbHelpers";


const createTenurePage = new CreateTenurePageObjects();
const tags = ['@tenure', '@authentication', '@common', '@root', '@search', '@worktray', '@personal-details']

describe('create and edit tenure', {'tags': tags}, ()=>{
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should create a new tenure', ()=> {

        cy.getAssetFixture().then(({ id: tenureId }) => {
            createTenurePage.createTenure(tenureId);

            cy.url().should("contain", `tenure/${tenureId}/add`);
            createTenurePage.addPropertyHeading().should('be.visible')
            createTenurePage.propertyAddress().should('be.visible')

            createTenurePage.tenureTypeSelection().select("Non-Secure")
            createTenurePage.tenureStartDateDayContainer().clear().type("01")
            createTenurePage.tenureStartDateMonthContainer().clear().type("01")
            createTenurePage.tenureStartDateYearContainer().clear().type("2090")
            cy.contains("Next").click();
            createTenurePage.searchContainer().should('be.visible')
            createTenurePage.searchButton().should('be.visible')
            
            const searchTerm = "tre"
            createTenurePage.searchContainer().clear().type(searchTerm);
            createTenurePage.searchButton().click();
            createTenurePage.searchResults().contains(searchTerm.replace(/\*/g, ""), { matchCase: false });});
            cy.wait(10000) // Allows enough time to retrieve tenure with the latest version
            for (let i = 0; i < 1; i++) {
                createTenurePage.addAsNamedTenureHolderButton().eq(i).click()
            }
            createTenurePage.pageAnnouncementContainer().should('contain', 'Person added to tenure');
    })
})
