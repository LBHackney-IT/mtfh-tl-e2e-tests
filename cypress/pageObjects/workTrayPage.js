class WorkTrayPageObjects {
    clearFilters() {
        return cy.get('.worktray-filters__clear-filters');
    };
    applyFilters() {
        return cy.get('.worktray-filters__actions > .govuk-button');
    };
    pagination() {
        return cy.get('.lbh-pagination');
    };

    filterBy() {
        cy.wait(1000);
        return cy.contains('Filter by');
    };
    filterShowDays() {
        return cy.get('[data-testid=mtfh-worktray-time-period]');
    };
    filterShowItems() {
        return cy.get('[data-testid=mtfh-worktray-limit]');
    };
    textProcesses() {
        return cy.get(':nth-child(1) > .filter-header > .lbh-body-m');
    };
    checkboxSoleToJoint(){
        return cy.get('[data-testid=filter-option-soletojoint]');
    }
    checkboxChangeOfName(){
        return cy.get('[data-testid=filter-option-changeofname]');
    }
    textPatches() {
        return cy.get(':nth-child(2) > .filter-header > .lbh-body-m');
    }
    // patchesSelectAll() {
    //     return cy.get(':nth-child(2) > .filter-header > [data-testid=filter-box-select-all]');
    // }
    textProcessStatus() {
        return cy.get(':nth-child(3) > .filter-header > .lbh-body-m');
    };
   headerProcess(){
        return cy.get('.govuk-table__row > :nth-child(2) > .select-all').should('contain.text', 'Process');
    };
    headerPatch(){
        return cy.get('.govuk-table__row > :nth-child(3) > .select-all').should('contain.text', 'Patch');
    };
    headerState(){
        return cy.get('.govuk-table__row > :nth-child(4) > .select-all').should('contain.text', 'State');
    };
    headerTimeLeftFullProcess() {
        return cy.get('.govuk-table__row > :nth-child(5) > .select-all');
    };
    headerProcessStatus(){
        return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(6)');
    };
    iconProcessStatus() {
        return cy.get('#process-status-info-icon');
    };
    popupIcon(){
        return cy.get('#process-status-info');
    }
    processCompleted() {
        return cy.get('#process-completed');
    };
    reqSuppDoc(){
        return cy.get('#request-supporting-documents');
    };
    submitForTenureInvest(){
        return cy.get('#submit-for-tenure-investigation');
    };

     processesSelectAll(){
        return cy.xpath('/html/body/main/div/div[2]/div/div[2]/div/details/div/div[1]/div[1]/div[1]/button');
    };
     processRemoveAll() {
         return cy.xpath('/html/body/main/div/div[2]/div/div[2]/div/details/div/div[1]/div[1]/div[1]/button');
     };

    processStatusSelectAll(){
        return cy.xpath('/html/body/main/div/div[2]/div/div[2]/div/details/div/div[1]/div[3]/div[1]/button');
    };
    personLink(){
        return cy.get('[data-testid="person-link"]');
    };
    propertyLink(){
        return cy.get('[data-testid="property-link"]');
    };
    dataProcess(){
        return cy.get(':nth-child(1) > .--processName > .govuk-link');
    };
    patchesShowAll(){
        return cy.get('#show-all');
    }
}
    export default WorkTrayPageObjects;