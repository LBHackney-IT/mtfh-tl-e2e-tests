const envConfig = require("../../environment-config");

class TenurePageObjects {
  visit(record) {
    cy.visit(`${envConfig.baseUrl}/${envConfig.tenureUrl}/${record}`);
    cy.injectAxe();
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

  tenureResidentsContainer() {
    return cy.get("#resident-details");
  }

  viewResidentButton() {
    return cy.get(
      '[class="govuk-button lbh-button govuk-button--secondary lbh-button--secondary view-person-button"]'
    );
  }

  otherHouseholdMembersContainer() {
    return cy.get('[class="lbh-heading-h3"]');
  }

  householdMemberLink() {
    return cy.get('[class="govuk-link lbh-link lbh-link--no-visited-state"]');
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

  comment(){
    return cy.get('[class="comment__item --center"]')
  }

  scannedHistoricTenureRecords(){
    return cy.contains('Scanned historic tenure records')
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
  


}
export default TenurePageObjects;
