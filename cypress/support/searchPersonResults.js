
const personSearchEndpointStaging = Cypress.env('HOUSE_SEARCH_ENDPOINT')


export const searchPersonResults = (searchPerson) => {
    cy.request({
        method:"GET",
       // url:`https://y1e46yws9c.execute-api.eu-west-2.amazonaws.com/development/api/v1/search/persons?isDesc=true&page=1&pageSize=12&searchText=${searchPerson}`,
        url:`${personSearchEndpointStaging}/search/persons?isDesc=true&page=1&pageSize=12&searchText=${searchPerson}`,
       // url: `https://v4xprqejik.execute-api.eu-west-2.amazonaws.com/staging/api/v1/search/persons?isDesc=true&page=1&pageSize=12&searchText=${searchPerson}`,
        failOnStatusCode: false,
        headers:{
           // Authorization: `Bearer ${Cypress.env('E2E_ACCESS_TOKEN_DEV')}`
            Authorization: `Bearer ${Cypress.env('E2E_ACCESS_TOKEN_STAGING')}`
        }
    }).then(result=> {
        expect(result.status).to.equal(200);
        cy.wrap(result.body).as('searchPersonResult');
    })
}

