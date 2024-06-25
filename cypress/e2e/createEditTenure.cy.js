import CreateTenurePageObjects from "../pageObjects/createTenurePage";
import TenurePageObjects from "../pageObjects/tenurePage";
import AddPersonPageObjects from "../pageObjects/addPersonPage";
import ModalPageObjects from "../pageObjects/sharedComponents/modal";
import { seedDatabase } from "../helpers/DbHelpers";


const createTenurePage = new CreateTenurePageObjects();
const tenurePage = new TenurePageObjects();
const addPersonPage = new AddPersonPageObjects();
const modal = new ModalPageObjects()
const tags = ['@tenure', '@authentication', '@common', '@root', '@search', '@worktray', '@personal-details']
const filterSearch = ['Last name A-Z', 'Last name Z-A', 'Best match']
const numberOfResults = ['40', '20', '12']
const tenureTypes =  ['Freehold', 'Freehold (Serv)', 'Introductory', 'Leasehold (RTB)', 'License Temp Ac', 'Lse 100% Stair', 'Mesne Profit Ac', 'Non-Secure', 'Private Sale LH', 'Rent To Mortgage', 'Shared Equity', 'Shared Owners', 'Short Life Lse', 'Temp Annex', 'Temp B&B', 'Temp Decant', 'Temp Hostel', 'Temp Hostel Lse', 'Temp Private Lt', 'Temp Traveller', 'Tenant Acc Flat', 'Secure']

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
            

            //select resident to add to new tenure
            const searchTerm = "tre"
            createTenurePage.searchContainer().clear().type(searchTerm);
            createTenurePage.searchButton().click();
            createTenurePage.searchResults().contains(searchTerm.replace(/\*/g, ""), { matchCase: false });});
            cy.wait(10000) // Allows enough time to retrieve tenure with the latest version
            for (let i = 0; i < 1; i++) {
                createTenurePage.addAsNamedTenureHolderButton().eq(i).click()
            }
            createTenurePage.pageAnnouncementContainer().should('contain', 'Person added to tenure');

            //add 2 household memebers
            for (let i = 0; i < 2; i++) {
                createTenurePage.addAsHouseholdMember().eq(i).click()
            }
            createTenurePage.pageAnnouncementContainer().should('contain', 'Person added to tenure');
            createTenurePage.doneButton().click()
            cy.findAllByText("New tenure completed");
            
            tenurePage.tenureDetailsContainer().should("be.visible");
            tenurePage.tenureDetailsContainer().contains("Status");
            tenurePage.tenureDetailsContainer().contains("Start date");
            tenurePage.tenureDetailsContainer().contains("End date");
            tenurePage.tenureDetailsContainer().contains("Type");
    })

    it('should create a new tenure and add a new person', ()=> {
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

            createTenurePage.createNewPersonButton().should('have.attr', 'aria-disabled').and('equal', 'true')

            const searchTerm = "tre"
            createTenurePage.searchContainer().clear().type(searchTerm);
            createTenurePage.searchButton().click();

            createTenurePage.createNewPersonButton().click();

            cy.url().should('include', '/person/new/')
            addPersonPage.tenureHolderRadioButton().click();
            addPersonPage.personTitleSelection().select("Mr");
            addPersonPage.firstNameContainer().clear().type("Test");
            addPersonPage.lastNameContainer().clear().type("Test");
            addPersonPage.dateOfBirthDayContainer().clear().type("08");
            addPersonPage.dateOfBirthMonthContainer().clear().type("05");
            addPersonPage.dateOfBirthYearContainer().clear().type("1969");
            addPersonPage.reasonForCreationContainer().type("This is a test");
            addPersonPage.addPersonButton().click();
            createTenurePage.pageAnnouncementContainer().should('contain', 'Person added to tenure');
            cy.url().should('include', '/person/new/add/')
            cy.url().should('include', '/contact')
            cy.contains("Next").click();
            addPersonPage.saveEqualityInformationButton().click()
            createTenurePage.addedHouseholdMembersContainer().contains(`Mr. Test Test`)
            createTenurePage.addedHouseholdMembersContainer().contains(`08/05/1969,`)

            createTenurePage.searchContainer().should('be.visible')
            createTenurePage.searchButton().should('be.visible')
            createTenurePage.main().contains('Property type')
            createTenurePage.main().contains('UPRN')
            createTenurePage.main().contains('Property reference')
        })

    })

    filterSearch.forEach((filter) => {
        it('should create new tenure and filter search', ()=> {
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
                createTenurePage.searchResults().contains(searchTerm.replace(/\*/g, ""), { matchCase: false });
                createTenurePage.sortByOption().contains("Best match");
                
                createTenurePage.sortByOption().select(filter);

                numberOfResults.forEach((results) => {
                    createTenurePage.numberOfResultsDisplayed(results);
                    createTenurePage.paginationSummary().contains(results);
                    createTenurePage.filterStatus().contains(results);
                })
                
            })
        })

    })

    it('should validate on create new tenure', ()=> {
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
            

            //select resident to add to new tenure
            const searchTerm = "brown"
            createTenurePage.searchContainer().clear().type(searchTerm);
            createTenurePage.searchButton().click();
            createTenurePage.searchResults().contains(searchTerm.replace(/\*/g, ""), { matchCase: false });
            cy.wait(10000) // Allows enough time to retrieve tenure with the latest version
            for (let i = 0; i < 1; i++) {
                createTenurePage.addAsNamedTenureHolderButton().eq(i).click()
            }
            createTenurePage.pageAnnouncementContainer().should('contain', 'Person added to tenure');

            for (let i = 0; i < 1; i++) {
                createTenurePage.addAsNamedTenureHolderButton().eq(i).click()
            }
            createTenurePage.pageAnnouncementContainer().should('be.visible')
            createTenurePage.pageAnnouncementContainer().contains("The person is already added")

            const searchTerm2 = "tre"
            createTenurePage.searchContainer().clear().type(searchTerm2);
            createTenurePage.searchButton().click();
            createTenurePage.searchResults().contains(searchTerm2.replace(/\*/g, ""), { matchCase: false });
            cy.wait(10000)
            for (let i = 0; i < 1; i++) {
                createTenurePage.addAsHouseholdMember().eq(i).click()
            }
            createTenurePage.pageAnnouncementContainer().should('contain', 'Person added to tenure');

            for (let i = 0; i < 1; i++) {
                createTenurePage.addAsHouseholdMember().eq(i).click()
            }
            createTenurePage.pageAnnouncementContainer().should('be.visible')
            createTenurePage.pageAnnouncementContainer().contains("The person is already added")
                  
            //To fix: not able to get to the next card
            // for (let i = 0; i < 5; i++) {
            //     createTenurePage.addAsNamedTenureHolderButtonTemp().eq(i).click()
            // }
            // createTenurePage.pageAnnouncementContainer().contains("Max. tenure holders added")

        }) 
    })

    it('should create a new tenure and cancel', ()=> {
        cy.getAssetFixture().then(({ id: tenureId }) => {
            createTenurePage.createTenure(tenureId);
            cy.url().should("contain", `tenure/${tenureId}/add`);
            createTenurePage.addPropertyHeading().should('be.visible')
            createTenurePage.propertyAddress().should('be.visible')

            createTenurePage.cancelButton().click({ force: true })
            modal.modalBody().should('be.visible')
            modal.confirmationButton().click({ force: true });
            

        })
    })

    it('should error when create new tenure that occurs before the end date of a previous tenure', ()=> {
        cy.getAssetFixture().then(({ id: tenureId }) => {
            createTenurePage.createTenure(tenureId);

            cy.url().should("contain", `tenure/${tenureId}/add`);
            createTenurePage.addPropertyHeading().should('be.visible')
            createTenurePage.propertyAddress().should('be.visible')

            createTenurePage.tenureTypeSelection().select("Non-Secure")
            createTenurePage.tenureStartDateDayContainer().clear().type("01")
            createTenurePage.tenureStartDateMonthContainer().clear().type("01")
            createTenurePage.tenureStartDateYearContainer().clear().type("2030")
            cy.contains("Next").click();

            createTenurePage.errorContainer().should('be.visible')
            createTenurePage.errorBody().contains("Start date must occur after the end date of the previous tenure")
        })
    })

    it('should error when create new tenure that with start date that occurs after end date', ()=> {
        cy.getAssetFixture().then(({ id: tenureId }) => {
            createTenurePage.createTenure(tenureId);

            cy.url().should("contain", `tenure/${tenureId}/add`);
            createTenurePage.addPropertyHeading().should('be.visible')
            createTenurePage.propertyAddress().should('be.visible')

            createTenurePage.tenureTypeSelection().select("Shared Owners")
            createTenurePage.tenureStartDateDayContainer().clear().type("01")
            createTenurePage.tenureStartDateMonthContainer().clear().type("01")
            createTenurePage.tenureStartDateYearContainer().clear().type("2090")
            createTenurePage.tenureEndDateDayContainer().clear().type("01")
            createTenurePage.tenureEndDateMonthContainer().clear().type("01")
            createTenurePage.tenureEndDateYearContainer().clear().type("2024")
            cy.contains("Next").click();

            createTenurePage.errorContainer().should('be.visible')
            createTenurePage.errorBody().contains("End date must occur after start date")
        })
    })

    it('should edit existing tenure', ()=> {
        const tenureId = "94690f7d-019e-d00c-21aa-d7a5791b1294"
        cy.getAssetFixture().then(() =>{
            createTenurePage.editTenure(tenureId);

            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateDayContainer().should('be.visible')
            createTenurePage.tenureStartDateMonthContainer().should('be.visible')
            createTenurePage.tenureStartDateYearContainer().should('be.visible')
            cy.getTenureFixture(({ id: tenureId }) => {
                cy.url().should('include', `tenure/${tenureId}/edit`)
            })
            createTenurePage.tenureTypeSelection().select("Freehold (Serv)")

            cy.contains("Next").click();
            createTenurePage.doneButton().click()
            createTenurePage.confirmTenureUpdatedText().should('contain', 'Tenure updated');            
        })
    })

    it('should cancel on edit tenure', ()=> {
        const tenureId = "94690f7d-019e-d00c-21aa-d7a5791b1294"
        cy.getAssetFixture().then(() =>{
            createTenurePage.editTenure(tenureId);

            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateDayContainer().should('be.visible')
            createTenurePage.tenureStartDateMonthContainer().should('be.visible')
            createTenurePage.tenureStartDateYearContainer().should('be.visible')
            cy.getTenureFixture(({ id: tenureId }) => {
                cy.url().should('include', `tenure/${tenureId}/edit`)
            })
            createTenurePage.tenureTypeSelection().select("Freehold")
            createTenurePage.cancelButton().click();
            modal.modalBody().should('be.visible')
            modal.confirmationButton().click({ force: true });

        })
    })

    it('should display confimation pop up when ending a tenure', ()=> {
        const tenureId = "94690f7d-019e-d00c-21aa-d7a5791b1294"
        cy.getAssetFixture().then(() =>{
            createTenurePage.editTenure(tenureId);

            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateDayContainer().should('be.visible')
            createTenurePage.tenureStartDateMonthContainer().should('be.visible')
            createTenurePage.tenureStartDateYearContainer().should('be.visible')
            cy.getTenureFixture(({ id: tenureId }) => {
                cy.url().should('include', `tenure/${tenureId}/edit`)
            })
            createTenurePage.tenureStartDateDayContainer().clear().type("20")
            createTenurePage.tenureStartDateMonthContainer().clear().type("05")
            createTenurePage.tenureStartDateYearContainer().clear().type("1985")
            createTenurePage.tenureEndDateDayContainer().clear().type("20")
            createTenurePage.tenureEndDateMonthContainer().clear().type("05")
            createTenurePage.tenureEndDateYearContainer().clear().type("2000")
            cy.contains("Next").click()

            modal.modalBody().should("be.visible");
            modal.modalBody().contains("Are you sure you want to change the status of the tenure to inactive?");
            modal.cancelButton().click({ force: true });
            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateDayContainer().should('be.visible')
            createTenurePage.tenureStartDateMonthContainer().should('be.visible')
            createTenurePage.tenureStartDateYearContainer().should('be.visible')

            cy.contains("Next").click()
            modal.modalBody().should("be.visible");
            modal.modalBody().contains("Are you sure you want to change the status of the tenure to inactive?");
            modal.confirmationButton().click();
            createTenurePage.confirmTenureUpdatedText().should('contain', 'Tenure updated');    
        })
    })

    it('should display confimation pop up when reactivating a tenure', ()=> {
        const tenureId = "94690f7d-019e-d00c-21aa-d7a5791b1294"
        cy.getAssetFixture().then(() =>{
            createTenurePage.editTenure(tenureId);

            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateDayContainer().should('be.visible')
            createTenurePage.tenureStartDateMonthContainer().should('be.visible')
            createTenurePage.tenureStartDateYearContainer().should('be.visible')
            cy.getTenureFixture(({ id: tenureId }) => {
                cy.url().should('include', `tenure/${tenureId}/edit`)
            })
            createTenurePage.tenureStartDateDayContainer().clear().type("20")
            createTenurePage.tenureStartDateMonthContainer().clear().type("05")
            createTenurePage.tenureStartDateYearContainer().clear().type("1985")
            createTenurePage.tenureEndDateDayContainer().clear().type("20")
            createTenurePage.tenureEndDateMonthContainer().clear().type("05")
            createTenurePage.tenureEndDateYearContainer().clear().type("3000")
            cy.contains("Next").click()

            modal.modalBody().should("be.visible");
            modal.modalBody().contains("Are you sure you want to change the status of the tenure to active?");
            modal.cancelButton().click({ force: true });
            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateDayContainer().should('be.visible')
            createTenurePage.tenureStartDateMonthContainer().should('be.visible')
            createTenurePage.tenureStartDateYearContainer().should('be.visible')

            cy.contains("Next").click()
            modal.modalBody().should("be.visible");
            modal.modalBody().contains("Are you sure you want to change the status of the tenure to active?");
            modal.confirmationButton().click();
            createTenurePage.doneButton().click()
            createTenurePage.confirmTenureUpdatedText().should('contain', 'Tenure updated');    
        })
    })

    tenureTypes.forEach((tenureType) => {
        it('should allow edit to end date for all tenure types', ()=> {
            const tenureId = "94690f7d-019e-d00c-21aa-d7a5791b1294"
            cy.getAssetFixture().then(() =>{
                createTenurePage.editTenure(tenureId);

                createTenurePage.tenureTypeSelection().should('be.visible')
                createTenurePage.tenureStartDateDayContainer().should('be.visible')
                createTenurePage.tenureStartDateMonthContainer().should('be.visible')
                createTenurePage.tenureStartDateYearContainer().should('be.visible')
                cy.getTenureFixture(({ id: tenureId }) => {
                    cy.url().should('include', `tenure/${tenureId}/edit`)
                })
                createTenurePage.tenureTypeSelection().select(tenureType)
                
                createTenurePage.tenureEndDateDayContainer().should('be.enabled')
                createTenurePage.tenureEndDateMonthContainer().should('be.enabled')
                createTenurePage.tenureEndDateYearContainer().should('be.enabled')
            })
        })
    }) 


    
})
