import { seedDatabaseWithTenure, addTestRecordToDatabase } from "../helpers/DbHelpers";
import PersonPageObjects from '../pageObjects/personPage'
import { generateTenure } from "../../api/models/requests/addTenureModel";
import { generateAsset } from "../../api/models/requests/createAssetModel";
import { patch } from "../../api/models/requests/patchModel";
import { person } from "../../api/models/requests/createPersonModel";

const personPage = new PersonPageObjects();
const devices = ['ipad-2', 'ipad-mini', 'iphone-3', 'iphone-4', 'iphone-5', 'iphone-6', 'iphone-6+', 'iphone-7', 'iphone-8', 'iphone-xr', 'iphone-se2', 'macbook-11', 'macbook-13', 'macbook-15', 'macbook-16', 'samsung-note9', 'samsung-s10']


describe('Person page', {'tags': ['@personal-details', '@authentication', '@common', '@root', '@worktray']}, ()=> {
    beforeEach(() => {
        cy.login();
        seedDatabaseWithTenure(false);
    })

    it('should view person details page', {'tags': '@SmokeTest'}, ()=> {
        cy.getPersonFixture().then((person) => {
            personPage.visit(person.id);

            cy.intercept("GET", `*/api/v2/contactDetails?targetId=${person.id}`, {
                fixture: "contact-details.json",
                statusCode: 200,
            }).as("getContactDetails");

            personPage.sidebar().contains("Personal information");
            personPage.sidebar().contains("Date of birth");

            personPage.sidebar().contains("Contact details");
            personPage.sidebar().contains("Home");
            personPage.sidebar().contains("02072123456");

            personPage.sidebar().contains("Email addresses");
            personPage.sidebar().contains("Email 1");

            personPage.sidebar().contains("Correspondence addresses");
            personPage.sidebar().contains("Correspondence address 1");

            personPage.morePersonalDetailsAccordion().click({force: true})
            personPage.personDetails().contains('Place of birth')
            personPage.morePersonalDetailsAccordion().click({force: true})

            personPage.moreTenureDetailsAccordion().click({force: true})
            personPage.tenureDetails().contains('Address')
            personPage.tenureDetails().contains('Payment ref')
            personPage.tenureDetails().contains('Property ref')
            personPage.tenureDetails().contains('Tenure type')
            personPage.tenureDetails().contains('UPRN')
            personPage.moreTenureDetailsAccordion().click({force: true})

            personPage.equalityDetailsAccordion().click({force: true})
            personPage.equalityDetails().contains('Age group:')
            personPage.equalityDetails().contains('Caring for someone:')
            personPage.equalityDetails().contains('Disabled:')
            personPage.equalityDetails().contains('Ethnicity:')
            personPage.equalityDetails().contains('Gender:')
            personPage.equalityDetails().contains('Religion or belief:')
            personPage.equalityDetails().contains('Sexual orientation:')
            personPage.equalityDetails().contains('Pregnant or maternity leave (in the past 2 years):')
            personPage.equalityDetailsAccordion().click({force: true})
        });
    })

    devices.forEach((device) => {
        it('should work for all devices', ()=> {
            cy.getPersonFixture().then((person) => {
                personPage.visit(person.id);
    
                cy.intercept("GET", `*/api/v2/contactDetails?targetId=${person.id}`, {
                    fixture: "contact-details.json",
                    statusCode: 200,
                }).as("getContactDetails");

                cy.viewport(`${device}`);
                cy.wait(1000)
    
                personPage.morePersonalDetailsAccordion().click({force: true})
                personPage.personDetails().contains('Place of birth')
                personPage.morePersonalDetailsAccordion().click({force: true})
    
                personPage.moreTenureDetailsAccordion().click({force: true})
                personPage.tenureDetails().contains('Address')
                personPage.tenureDetails().contains('Payment ref')
                personPage.tenureDetails().contains('Property ref')
                personPage.tenureDetails().contains('Tenure type')
                personPage.tenureDetails().contains('UPRN')
                personPage.moreTenureDetailsAccordion().click({force: true})
    
                personPage.equalityDetailsAccordion().click({force: true})
                personPage.equalityDetails().contains('Age group:')
                personPage.equalityDetails().contains('Caring for someone:')
                personPage.equalityDetails().contains('Disabled:')
                personPage.equalityDetails().contains('Ethnicity:')
                personPage.equalityDetails().contains('Gender:')
                personPage.equalityDetails().contains('Religion or belief:')
                personPage.equalityDetails().contains('Sexual orientation:')
                personPage.equalityDetails().contains('Pregnant or maternity leave (in the past 2 years):')
                personPage.equalityDetailsAccordion().click({force: true})
            });
        })
    })

    it('should not load non existent person', ()=> {
        personPage.visit("dfkkkl")
        personPage.feedbackMessageContainer().should('be.visible')
        personPage.feedbackMessageContainer().contains('There was a problem retrieving the record')
    })

    it('should take me to comments page', ()=> {
        cy.getPersonFixture().then((person) => {
            personPage.visit(person.id);
            
            personPage.personDetails().contains('Place of birth')
            personPage.addCommentButton().click()
            cy.url().should('contain', `${Cypress.config("baseUrl")}/${Cypress.config("personCommentsUrl")}/${person.id}`)
        });
    })

    it('Accessibility testing', {'tags': '@Accessibility'}, ()=> {
        cy.getPersonFixture().then((person) => {
            personPage.visit(person.id);
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

    it('should go to property page', ()=> {
        const patchModel = patch;
        const assetModel = generateAsset(undefined, undefined, [patchModel]);
        const personModel1 = person();
        const personModel2 = person();
        const tenureModel = generateTenure({}, assetModel, [
            personModel1,
            { isResponsible: true, personTenureType: "Tenant", ...personModel2 },
        ]);

        const personTenure = {
            id: tenureModel.id,
            startDate: tenureModel.startOfTenureDate,
            endDate: tenureModel.endOfTenureDate,
            assetFullAddress: tenureModel.tenuredAsset.fullAddress,
            assetId: tenureModel.tenuredAsset.id,
            uprn: tenureModel.tenuredAsset.uprn,
            isActive: true,
            type: tenureModel.tenureType.description,
            propertyReference: tenureModel.tenuredAsset.propertyReference,
        };

        personModel1.tenures.push(personTenure);
        personModel2.tenures.push(personTenure);

        assetModel.tenure = {
            endOfTenureDate: tenureModel.endOfTenureDate,
            id: tenureModel.id,
            paymentReference: tenureModel.paymentReference,
            startOfTenureDate: tenureModel.startOfTenureDate,
            type: tenureModel.tenureType.description,
        };

        addTestRecordToDatabase("Assets", assetModel, { id: assetModel.id });
        addTestRecordToDatabase("PatchesAndAreas", patchModel, { id: patchModel.id });
        addTestRecordToDatabase("TenureInformation", tenureModel, { id: tenureModel.id });
        addTestRecordToDatabase("Persons", personModel1, { id: personModel1.id });
        addTestRecordToDatabase("Persons", personModel2, { id: personModel2.id });

        cy.getPersonFixture().then((person) => {
            personPage.visit(person.id);
            cy.get(":nth-child(1) > .govuk-link").click();
            cy.url().should('include', '/property')
        });
    })
})