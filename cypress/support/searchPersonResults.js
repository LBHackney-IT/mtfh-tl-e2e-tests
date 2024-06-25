
const personSearchEndpoint = Cypress.env('HOUSE_SEARCH_ENDPOINT');

export const searchPersonResults = (searchPerson) => {
    cy.request({
        method:"GET",
        url:`${personSearchEndpoint}/search/persons?isDesc=true&page=1&pageSize=40&searchText=${searchPerson}`,

        failOnStatusCode: false,
        headers:{
            Authorization: `Bearer ${Cypress.config("gssoTestKey")}`
        }
    }).then(result=> {
        expect(result.status).to.equal(200);
        cy.wrap(result.body).as('searchPersonResult');
    })
}

