import SearchPageObjects from "../pageObjects/searchPage";

const searchPage = new SearchPageObjects();
const devices = [
    'ipad-2', // "tablet"
    'macbook-16', // "laptop"
    'samsung-s10' // "mobile"
]
const numberOfResults = ['40', '20', '12']


describe('Search Page',{tags: ['@search', '@authentication', '@common', '@root']}, ()=> {
    beforeEach(()=> {
        cy.login()
    })
    it('should search for a property, person and tenure', {tags: '@SmokeTest'}, ()=> {
        searchPage.visit();
        //property
        const searchTerm = "Avenue";
        searchPage.searchContainer().type(searchTerm);
        searchPage.searchButton().click();

        searchPage.searchResults().contains(searchTerm.replaceAll('*',''), { matchCase: false });
        searchPage.searchResults().contains("Property type")
        searchPage.searchResults().contains("Tenure")
        searchPage.searchResults().contains("UPRN")

        cy.get('[class*="govuk-back-link lbh-back-link"]').click();

        //tenure
        searchPage.tenureRadioButton().click();

        const searchTermTenure = "Avenue"
        searchPage.searchContainer().type(searchTermTenure);
        searchPage.searchButton().click();

        searchPage.searchResults().contains(searchTermTenure.replaceAll('*',''), { matchCase: false });
        searchPage.searchResults().contains("Tenure payment ref");

        cy.get('[class*="govuk-back-link lbh-back-link"]').click();

        //person    
        searchPage.personRadioButton().click();

        const searchTermPerson = "Test"
        searchPage.searchContainer().type(searchTermPerson);
        searchPage.searchButton().click();

        searchPage.searchResults().contains(searchTermPerson.replaceAll('*',''), { matchCase: false });
    })

    devices.forEach((device) => {
        it(`should search on ${device} device types`, () => {
            searchPage.visit();
            cy.viewport(`${device}`);
            searchPage.personRadioButton().click();
    
            const searchTerm = "Test"
            searchPage.searchContainer().type(searchTerm);
            searchPage.searchButton().click();
    
            searchPage.searchResults().contains(searchTerm.replaceAll('*',''), { matchCase: false });
    
            const breadCrumb = cy.get('[class*="govuk-back-link lbh-back-link"]');
            breadCrumb.should("be.visible");
        })
    })

    it('should not return any results', ()=> {
        searchPage.visit()
        //property
        const searchTerm = "XXXXXXXXXXXXXXXXXXXXXXX"
        searchPage.searchContainer().type(searchTerm);
        searchPage.searchButton().click();

        searchPage.searchComponent().contains("No matching search results found");

        cy.get('[class*="govuk-back-link lbh-back-link"]').click();

        //person
        searchPage.personRadioButton().click();
        const searchTermPerson = "XXXXXXXXXXXXXXXXXXXXXXX"
        searchPage.searchContainer().type(searchTermPerson);
        searchPage.searchButton().click();

        searchPage.searchComponent().contains("No matching search results found");

        cy.get('[class*="govuk-back-link lbh-back-link"]').click();
        
        //tenure
        const searchTermTenure = "XXXXXXXXXXXXXXXXXXXXXXX"
        searchPage.searchContainer().type(searchTermTenure);
        searchPage.searchButton().click();

        searchPage.searchComponent().contains("No matching search results found");
    })

    it('can do multiple search', ()=> {
        searchPage.visit();
        
        searchPage.personRadioButton().click();
        const searchTerm = "kingsland"   
        searchPage.searchContainer().type(searchTerm);
        searchPage.searchButton().click();

        searchPage.searchResults().contains(searchTerm.replace(/\s/g, ""), { matchCase: false });
    })

    it('should display error for insufficient characters', ()=> {
        searchPage.visit()
        //property
        const searchTerm = "1"
        searchPage.searchContainer().type(searchTerm);
        searchPage.searchButton().click();

        searchPage.searchTermError().should("be.visible");
        
        //tenure
        searchPage.tenureRadioButton().click();
        const searchTermTenure = "s"
        searchPage.searchContainer().clear().type(searchTermTenure);
        searchPage.searchButton().click();
        searchPage.searchTermError().should('be.visible')

        
        //person
        searchPage.personRadioButton().click();
        const searchTermPerson = "s"
        searchPage.searchContainer().clear().type(searchTermPerson);
        searchPage.searchButton().click();
        searchPage.searchTermError().should('be.visible')   
    })

    it('accessibility testing', ()=> {
        searchPage.visit();

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
        cy.checkA11y(null, null, axeTerminalLog, { skipFailures: true });   
    })

    it('should show correct number of results', ()=> {
        searchPage.visit()
        //tenure
        const searchTerm = "test"
        searchPage.tenureRadioButton().click();
        searchPage.searchContainer().type(searchTerm);
        searchPage.searchButton().click();

        searchPage.searchResults().contains(searchTerm.replaceAll('*',''), { matchCase: false });

        searchPage.sortByOption().should("not.exist");

        numberOfResults.forEach((results) => {
            searchPage.numberOfResultsDisplayed(results);
            searchPage.paginationSummary().contains(results);
            searchPage.filterStatus().contains(results);
        })

        cy.get('[class*="govuk-back-link lbh-back-link"]').click();

        //property
        const searchTermProp = "pitcairn"
        searchPage.searchContainer().type(searchTermProp);
        searchPage.searchButton().click();

        searchPage.searchResults().contains(searchTermProp.replaceAll('*',''), { matchCase: false });

        searchPage.sortByOption().should("not.exist");  

        numberOfResults.forEach((results) => {
            searchPage.numberOfResultsDisplayed(results);
            searchPage.paginationSummary().contains(results);
            searchPage.filterStatus().contains(results);
        })
    })
})