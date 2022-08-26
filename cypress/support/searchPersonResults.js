
const personSearchEndpoint = Cypress.env('HOUSE_SEARCH_ENDPOINT');

const token = Cypress.env('E2E_ACCESS_TOKEN_STAGING' || 'E2E_ACCESS_TOKEN_DEVELOPMENT');

export const searchPersonResults = (searchPerson) => {
    cy.request({
        method:"GET",
        url:`${personSearchEndpoint}/search/persons?isDesc=true&page=1&pageSize=40&searchText=${searchPerson}`,

        failOnStatusCode: false,
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(result=> {
        expect(result.status).to.equal(200);
        cy.wrap(result.body).as('searchPersonResult');
    })
}

