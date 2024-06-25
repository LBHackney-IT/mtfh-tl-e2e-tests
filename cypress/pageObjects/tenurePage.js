
class TenurePageObjects {
  visit(record) {
    cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("tenureUrl")}/${record}`);
    cy.injectAxe();
  }

  editTenure(record) {
    cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("tenureUrl")}/${record}/edit`)
  }

  paymentReference() {
    return cy.get("h1");
  }

  tenureViewSidebar() {
    return cy.get("#tenure-view-sidebar");
  }

  tenureDetailsContainer() {
    return cy.get("#tenure-details");
  }

  newTenureCompleted() {
    return cy.findAllByText('New tenure completed');
  }

  tenureResidentsContainer() {
    return cy.get("#resident-details");
  }

  tenureComment(){
    return cy.get("#comments")
  }

  viewResidentButton() {
    return cy.get('[class="govuk-button lbh-button govuk-button--secondary lbh-button--secondary view-person-button"]');
  };
  viewResidentButtonforPerson() {
    return cy.get('.lbh-heading-h4 > .govuk-link');
  }

  otherHouseholdMembersContainer() {
    return cy.get('[class="lbh-heading-h3"]');
  }

  householdMemberLink() {
    //return cy.get('.govuk-link lbh-link lbh-link--no-visited-state');
    return cy.get(':nth-child(4) > .govuk-link');
  }

  tenureDetailsAccordion() {
    return cy.get("#accordion-heading-tenure-details");
  }

  residentDetailsAccordion() {
    return cy.get("#accordion-heading-resident-details");
  }

  editTenureButton() {
    return cy.contains('Edit Tenure')
  }

  addNewPersonToTenureButton() {
    return cy.contains('Add new person to tenure')
  }

  commentDateTime (){
    return cy.get('[class="comment__date-time"]')
  }

  comment(){
    return cy.get('[class="comment__item --center"]')
  }

  scannedHistoricTenureRecords(){
    return cy.contains('Scanned historic tenure records')
  }
  
  residentDetails(){
    return cy.get ('[class="mtfh-resident-details"]')
  }
  
  newProcess(){
    return cy.contains('New Process');
  }

  tenureDetailsAccordionInformation() {
      this.tenureViewSidebar().contains('Start date')
      this.tenureViewSidebar().contains('End date')
      this.tenureViewSidebar().contains('Type')
      this.tenureViewSidebar().contains('Property ID')
      this.tenureViewSidebar().contains('Status')
      this.tenureViewSidebar().contains('UPRN')
  }

  residentDetailsAccordionInformation() {
    this.tenureViewSidebar().contains("Residents");
    this.tenureViewSidebar().contains("Other household members");
  }

  residentsDetailsAreDisplayed() {
    this.tenureResidentsContainer().should("be.visible");
    this.tenureResidentsContainer().contains("Date of birth");
    this.tenureResidentsContainer().contains("Type");
  }
  tenureAlert() {
    return cy.get('.lbh-heading-h2 > .mtfh-icon');
  }
}
export default TenurePageObjects;
