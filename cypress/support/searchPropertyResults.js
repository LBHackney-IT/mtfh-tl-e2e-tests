import {gssoTestKey} from "../../environment-config";

const propertySearchEndpoint = Cypress.env('HOUSE_SEARCH_ENDPOINT');

export const searchPropertyResults = (searchProperty) => {
    cy.request({
        method:"GET",
        url:`${propertySearchEndpoint}/search/assets?assetTypes=Dwelling,LettableNonDwelling&isDesc=false&page=1&pageSize=12&searchText=${searchProperty}`,

        failOnStatusCode: false,
        headers:{
            Authorization: `Bearer ${gssoTestKey}`
        }
    }).then(result=> {
        expect(result.status).to.equal(200);
        cy.wrap(result.body).as('searchPropertyResult');
    })
}

