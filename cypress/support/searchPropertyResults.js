
import { endpoint } from './endpoints';

export const searchPropertyResults = (searchProperty) => {
    const propertySearchEndpoint = endpoint('HOUSE_SEARCH_ENDPOINT');
    cy.request({
        method:"GET",
        url:`${propertySearchEndpoint}/search/assets?assetTypes=Dwelling,LettableNonDwelling&isDesc=false&page=1&pageSize=12&searchText=${searchProperty}`,

        failOnStatusCode: false,
        headers:{
            Authorization: `Bearer ${Cypress.config("gssoTestKey")}`
        }
    }).then(result=> {
        expect(result.status).to.equal(200);
        cy.wrap(result.body).as('searchPropertyResult');
    })
}

