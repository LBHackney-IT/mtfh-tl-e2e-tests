class WorkTrayPageObjects {
    headingYourTasks() {
        return cy.get('.lbh-heading-h1');
    };
    buttonClass() {
        return cy.get('.select-all lbh-link lbh-link--no-visited-state');
    }

    filterDetails() {
        return cy.get('#mtfh-details');
    };
    clearFilters() {
        return cy.get('.worktray-filters__clear-filters');
    };
    applyFilters() {
        return cy.get('.worktray-filters__actions > .govuk-button');
    };
    pagination() {
        return cy.get('.lbh-pagination__summary');
    };

    filterBy() {
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
    // processesSelectAll() {
    //     return cy.get(':nth-child(1) > .filter-header > [data-testid=filter-box-select-all]');
    // };
    checkboxSoleToJoint(){
        return cy.get('#soletojoint');
    }
    checkboxChangeOfName(){
        return cy.get('#changeofname');
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
    // processStatusSelectAll() {
    //     return cy.get(':nth-child(3) > .filter-header > [data-testid=filter-box-select-all]');
    // };
    headerNameAddress(){
        return cy.get('.govuk-table__cell govuk-table__header').should('contain.text', 'Name / Address');
    };

    headerProcess(){
        return cy.get('.govuk-table__cell govuk-table__header').should('contain.text', 'Name / Address');
    };
    headerPatch(){
        return cy.get('.govuk-table__cell govuk-table__header').should('contain.text', 'Name / Address');
    };
    headerState(){
        return cy.get('.govuk-table__cell govuk-table__header').should('contain.text', 'Name / Address');
    };
    headerTimeLeftFullProcess() {
        return cy.get(':nth-child(5) > .select-all');
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
     patchesSelectAll(){
         return cy.xpath('/html/body/main/div/div[2]/div/div[2]/div/details/div/div[1]/div[2]/div[1]/button');
     };
    patchesRemoveAll(){
       // return cy.
    };
    processStatusSelectAll(){
        return cy.xpath('/html/body/main/div/div[2]/div/div[2]/div/details/div/div[1]/div[3]/div[1]/button');
    };
    // processStatusRemoveAll(){
    //     return cy.xpath('/html/body/main/div/div[2]/div/div[2]/div/details/div/div[1]/div[3]/div[1]/button');
    // };
    personLink(){
        return cy.get('[data-testid="person-link"]');
    };
    propertyLink(){
        return cy.get('[data-testid="property-link"]');
    }

}


    export default WorkTrayPageObjects;