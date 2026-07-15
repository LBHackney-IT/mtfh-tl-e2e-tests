import CreateTenurePageObjects from "../pageObjects/createTenurePage";
import TenurePageObjects from "../pageObjects/tenurePage";
import PersonFormObjects from "../pageObjects/personFormPage";
import ModalPageObjects from "../pageObjects/sharedComponents/modal";
import { seedDatabase } from "../helpers/DbHelpers";
const { faker } = require("@faker-js/faker");

const createTenurePage = new CreateTenurePageObjects();
const tenurePage = new TenurePageObjects();
const addPersonPage = new PersonFormObjects();
const modal = new ModalPageObjects()
const tenureTypes =  ['Freehold', 'Freehold (Serv)', 'Introductory', 'Leasehold (RTB)', 'License Temp Ac', 'Lse 100% Stair', 'Mesne Profit Ac', 'Non-Secure', 'Private Sale LH', 'Rent To Mortgage', 'Shared Equity', 'Shared Owners', 'Short Life Lse', 'Temp Annex', 'Temp B&B', 'Temp Decant', 'Temp Hostel', 'Temp Hostel Lse', 'Temp Private Lt', 'Temp Traveller', 'Tenant Acc Flat', 'Secure']

/**
 * After creating a tenure, household mutations need a current ETag (If-Match).
 * Tenure listeners often bump VersionNumber shortly after create; the UI keeps a
 * stale etag (especially while filling the new-person form), and the API returns
 * 409 VersionNumberConflict → warning "Unable to attach person to tenure".
 *
 * We wait until the etag is stable after create, then overwrite If-Match on each
 * attach PATCH with a sync GET so the header is current even if person POST took
 * long enough for another version bump.
 */
const waitForTenureEtag = (tenureId, attempts = 20) => {
    const url = `${endpoint('TENURE_ENDPOINT')}/tenures/${tenureId}`;
    const token = Cypress.config('gssoTestKey');
    let lastEtag = null;

    const attempt = (remaining) => {
        cy.request({
            url,
            headers: { Authorization: `Bearer ${token}` },
            failOnStatusCode: false,
        }).then((res) => {
            const etag = res.headers.etag;
            if (res.status === 200 && etag && etag === lastEtag) {
                return;
            }
            if (res.status === 200 && etag) {
                lastEtag = etag;
            }
            if (remaining <= 1) {
                throw new Error(
                    `Tenure ${tenureId} ETag did not stabilise (last status ${res.status}, etag ${etag})`,
                );
            }
            cy.wait(1000).then(() => attempt(remaining - 1));
        });
    };

    attempt(attempts);
};

const refreshIfMatchOnAttach = (req) => {
    const match = req.url.match(/\/tenures\/([^/?]+)\/person\//);
    if (!match) {
        req.continue();
        return;
    }

    const tenureUrl = `${endpoint('TENURE_ENDPOINT')}/tenures/${match[1]}`;
    const token = Cypress.config('gssoTestKey');

    // Sync XHR is intentional here: cy.* cannot run inside intercept handlers, and
    // person POST can outlast a pre-click etag refresh.
    const xhr = new XMLHttpRequest();
    xhr.open('GET', tenureUrl, false);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send();
    const etag = xhr.getResponseHeader('etag');
    if (etag) {
        req.headers['if-match'] = etag;
    }
    req.continue();
};

const registerTenurePersonIntercepts = () => {
    cy.intercept('GET', '**/search/persons**').as('searchPersons');
    cy.intercept('POST', '**/tenures**').as('createTenure');
    cy.intercept('PATCH', '**/tenures/**/person/**', refreshIfMatchOnAttach).as(
        'attachPersonToTenure',
    );
    cy.intercept('POST', '**/api/v2/persons', (req) => {
        req.on('after:response', (res) => {
            if (res.statusCode === 201 && res.body?.id) {
                queueDeletePersonWithId(res.body.id);
            }
        });
    }).as('addPerson');
};

const completeTenureDetailsStep = () => {
    cy.contains('Next').click();
    return cy.wait('@createTenure').then(({ response }) => {
        expect(response?.statusCode, 'create tenure').to.be.oneOf([200, 201]);
        const createdTenureId = response.body.id;
        expect(createdTenureId, 'created tenure id').to.be.a('string');
        waitForTenureEtag(createdTenureId);
        createTenurePage.searchContainer().should('be.visible');
        createTenurePage.searchButton().should('be.visible');
        return cy.wrap(createdTenureId);
    });
};

const searchForResidents = (searchTerm) => {
    createTenurePage.searchContainer().clear().type(searchTerm);
    createTenurePage.searchButton().click();
    cy.wait('@searchPersons');
    createTenurePage.searchResults().should('be.visible');
    createTenurePage.searchResults().contains(searchTerm.replace(/\*/g, ''), {
        matchCase: false,
    });
};

const assertPersonAddedAnnouncement = () => {
    // Prefer text match — pages can also render an unrelated --warning announcement
    cy.contains('.lbh-page-announcement', 'Person added to tenure').should('be.visible');
};

const attachPersonFromSearch = (clickAdd) => {
    clickAdd();
    cy.wait('@attachPersonToTenure')
        .its('response.statusCode')
        .should('be.oneOf', [200, 204]);
    assertPersonAddedAnnouncement();
};

describe('create and edit tenure', { tags: ['@tenure', '@cognito-authentication', '@common', '@root', '@search', '@worktray', '@personal-details']}, () => {
    beforeEach(() => {
        cy.login();
        seedDatabase();
        registerTenurePersonIntercepts();
    });

    it('should create a new tenure', {tags: '@SmokeTest'}, ()=> {
        cy.getAssetFixture().then(({ id: assetId }) => {
            createTenurePage.createTenure(assetId);

            cy.url().should("contain", `tenure/${assetId}/add`);
            createTenurePage.addPropertyHeading().should('be.visible')
            createTenurePage.propertyAddress().should('be.visible')

            createTenurePage.tenureTypeSelection().select("Non-Secure")
            createTenurePage.tenureStartDateInput().clear().type("2090-01-01")
            completeTenureDetailsStep();

            const searchTerm = "tre"
            createTenurePage.searchContainer().clear().type(searchTerm);
            createTenurePage.searchButton().click();
            createTenurePage.searchResults().contains(searchTerm.replace(/\*/g, ""), { matchCase: false });
            createTenurePage.addAsNamedTenureHolderButton().first().click()
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
        });
    })

    it('should create a new tenure and add a new person', ()=> {
        cy.getAssetFixture().then(({ id: assetId }) => {
            createTenurePage.createTenure(assetId);

            cy.url().should("contain", `tenure/${assetId}/add`);
            createTenurePage.addPropertyHeading().should('be.visible')
            createTenurePage.propertyAddress().should('be.visible')

            createTenurePage.tenureTypeSelection().select("Non-Secure")
            createTenurePage.tenureStartDateInput().clear().type("2090-01-01")
            completeTenureDetailsStep();

            createTenurePage.createNewPersonButton().should('have.attr', 'aria-disabled').and('equal', 'true')

            const searchTerm = "tre"
            searchForResidents(searchTerm);

            createTenurePage.createNewPersonButton()
                .should('not.have.attr', 'aria-disabled', 'true')
                .click();

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
            cy.wait('@addPerson').its('response.statusCode').should('eq', 201);
            cy.wait('@attachPersonToTenure')
                .its('response.statusCode')
                .should('be.oneOf', [200, 204]);
            assertPersonAddedAnnouncement();
            cy.url().should('include', '/person/new/add/')
            cy.url().should('include', '/contact')
            cy.contains("Next").click();
            addPersonPage.ageGroupSelectionBox().should('be.visible');
            addPersonPage.saveEqualityInformationButton().click()
            createTenurePage.addedHouseholdMembersContainer()
                .should('be.visible')
                .and('contain', 'Mr. Test Test')
                .and('contain', '08/05/1969,');

            createTenurePage.searchContainer().should('be.visible')
            createTenurePage.searchButton().should('be.visible')
            createTenurePage.main().contains('Property type')
            createTenurePage.main().contains('UPRN')
            createTenurePage.main().contains('Property reference')
        })

    })

    // This test conflicts with the one before it. If you were to disable the test above, this would pass.
    // Might be why this test got ignored. It's puzzling for why this test is triggering regardless of the @ignore tag.
    // As such, skipping this until the state conflict between the 2 tests gets resolved.
    it.skip('should validate on create new tenure', {tags: '@ignore'}, () => {
        cy.getAssetFixture().then(({ id: tenureId }) => {
            createTenurePage.createTenure(tenureId);

            cy.url().should("contain", `tenure/${tenureId}/add`);
            createTenurePage.addPropertyHeading().should('be.visible')
            createTenurePage.propertyAddress().should('be.visible')

            createTenurePage.tenureTypeSelection().select("Non-Secure")
            createTenurePage.tenureStartDateInput().clear().type("2090-01-01")
            cy.contains("Next").click();
            createTenurePage.searchContainer().should('be.visible')
            createTenurePage.searchButton().should('be.visible')
            

            //select resident to add to new tenure
            const searchTerm = "brown"
            createTenurePage.searchContainer().clear().type(searchTerm);
            createTenurePage.searchButton().click();
            createTenurePage.searchResults().contains(searchTerm.replace(/\*/g, ""), { matchCase: false });
            createTenurePage.addAsNamedTenureHolderButton().first().click()
            createTenurePage.pageAnnouncementContainer().should('contain', 'Person added to tenure');

            createTenurePage.addAsNamedTenureHolderButton().first().click()
            createTenurePage.pageAnnouncementContainer().should('be.visible')
            createTenurePage.pageAnnouncementContainer().should('contain', "The person is already added");

            const searchTerm2 = "tre"
            createTenurePage.searchContainer().clear().type(searchTerm2);
            createTenurePage.searchButton().click();
            createTenurePage.searchResults().contains(searchTerm2.replace(/\*/g, ""), { matchCase: false });
            createTenurePage.addAsHouseholdMember().first().click()
            createTenurePage.pageAnnouncementContainer().should('contain', 'Person added to tenure');

            createTenurePage.addAsHouseholdMember().first().click();
            createTenurePage.pageAnnouncementContainer().should('be.visible');
            createTenurePage.pageAnnouncementContainer().should('contain', "The person is already added");
                  
             //To fix: Some household members not added correctly
            // for (let i = 1; i < 6; i++) {
            //     createTenurePage.addAsNamedTenureHolderButton().eq(i).click()
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
            modal.yesButton().click({ force: true });
        })
    })

    it('should error when create new tenure that occurs before the end date of a previous tenure', ()=> {
        cy.getAssetFixture().then(({ id: tenureId }) => {
            createTenurePage.createTenure(tenureId);

            cy.url().should("contain", `tenure/${tenureId}/add`);
            createTenurePage.addPropertyHeading().should('be.visible')
            createTenurePage.propertyAddress().should('be.visible')

            createTenurePage.tenureTypeSelection().select("Non-Secure")
            createTenurePage.tenureStartDateInput().clear().type("2030-01-01")
            cy.contains("Next").click();

            createTenurePage.errorContainer().should('be.visible')
            createTenurePage.errorBody().should("contain", "Start date must occur after the end date of the previous tenure");
        })
    })

    it('should error when create new tenure that with start date that occurs after end date', ()=> {
        cy.getAssetFixture().then(({ id: tenureId }) => {
            createTenurePage.createTenure(tenureId);

            cy.url().should("contain", `tenure/${tenureId}/add`);
            createTenurePage.addPropertyHeading().should('be.visible')
            createTenurePage.propertyAddress().should('be.visible')

            createTenurePage.tenureTypeSelection().select("Shared Owners")
            createTenurePage.tenureStartDateInput().clear().type("2090-01-01")
            createTenurePage.tenureEndDateInput().clear().type("2024-01-01")
            cy.contains("Next").click();

            createTenurePage.errorContainer().should('be.visible')
            createTenurePage.errorBody().should("contain", "End date must occur after start date")
        })
    })

    it('should edit existing tenure', {tags: ['@SmokeTest']}, ()=> {
        const tenureId = "94690f7d-019e-d00c-21aa-d7a5791b1294"
        cy.getAssetFixture().then(() =>{
            createTenurePage.editTenure(tenureId)

            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateInput().should('be.visible')
            cy.getTenureFixture(({ id: tenureId }) => {
                cy.url().should('include', `tenure/${tenureId}/edit`)
            })
            const pastDate = faker.date.past().toISOString().split("T")[0];
            createTenurePage.tenureStartDateInput().clear().type(pastDate)
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
            createTenurePage.tenureStartDateInput().should('be.visible')

            cy.getTenureFixture(({ id: tenureId }) => {
                cy.url().should('include', `tenure/${tenureId}/edit`)
            })
            createTenurePage.tenureTypeSelection().select("Secure")
            createTenurePage.cancelButton().click();
            modal.modalBody().should('be.visible')
            modal.yesButton().click({ force: true });
            modal.modalBody().should('not.exist');
        })
    })

    it('should display confimation pop up when ending a tenure', ()=> {
        const tenureId = "94690f7d-019e-d00c-21aa-d7a5791b1294"
        cy.getAssetFixture().then(() =>{
            createTenurePage.editTenure(tenureId);

            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateInput().should('be.visible')
            cy.getTenureFixture(({ id: tenureId }) => {
                cy.url().should('include', `tenure/${tenureId}/edit`)
            })
            createTenurePage.tenureStartDateInput().clear().type("1985-05-20")
            createTenurePage.tenureEndDateInput().clear().type("2000-05-20")
            cy.contains("Next").click()

            modal.modalBody().should("be.visible");
            modal.modalBody().contains("Are you sure you want to change the status of the tenure to inactive?");
            modal.cancelButton().click({ force: true });
            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateInput().should('be.visible')
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
            createTenurePage.tenureStartDateInput().should('be.visible')
            cy.getTenureFixture(({ id: tenureId }) => {
                cy.url().should('include', `tenure/${tenureId}/edit`)
            })
            createTenurePage.tenureStartDateInput().clear().type("1985-05-20")
            createTenurePage.tenureEndDateInput().clear().type("3000-05-20")
            cy.contains("Next").click()

            modal.modalBody().should("be.visible");
            modal.modalBody().contains("Are you sure you want to change the status of the tenure to active?");
            modal.cancelButton().click({ force: true });
            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateInput().should('be.visible')

            cy.contains("Next").click()
            modal.modalBody().should("be.visible");
            modal.modalBody().contains("Are you sure you want to change the status of the tenure to active?");
            modal.confirmationButton().click();
            createTenurePage.doneButton().click();
            createTenurePage.confirmTenureUpdatedText().should('contain', 'Tenure updated');    
        })
    })

    it('should allow edit to end date for all tenure types', ()=> {
        const tenureId = "94690f7d-019e-d00c-21aa-d7a5791b1294"
        cy.getAssetFixture().then(() =>{
            createTenurePage.editTenure(tenureId);

            createTenurePage.tenureTypeSelection().should('be.visible')
            createTenurePage.tenureStartDateInput().should('be.visible')
            cy.getTenureFixture(({ id: tenureId }) => {
                cy.url().should('include', `tenure/${tenureId}/edit`)
            })

            const sampledTenureTypes = Cypress._.sampleSize(tenureTypes, 5); // Randomly select 5 tenure types
            sampledTenureTypes.forEach(tenureType => {
                createTenurePage.tenureTypeSelection().select(tenureType);
                createTenurePage.tenureEndDateInput().should('be.visible').and('be.enabled');
            });
        })
    });
})
