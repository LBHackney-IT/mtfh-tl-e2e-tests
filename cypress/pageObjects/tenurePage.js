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

  tenureDetailsAccordionInformation() {
    this.tenureViewSidebar().contains("Start date");
    this.tenureViewSidebar().contains("End date");
    this.tenureViewSidebar().contains("Type");
    // this.tenureViewSidebar().contains("UPRN");
    this.tenureViewSidebar().contains("Status");
  }

  residentDetailsAccordionInformation() {
    this.tenureViewSidebar().contains("Residents");
    this.tenureViewSidebar().contains("Other household members");
  }

  tenureDetailsAreDisplayed() {
    // this.paymentReference().should('be.visible')
    this.tenureDetailsContainer().should("be.visible");
    this.tenureDetailsContainer().contains("Status");
    this.tenureDetailsContainer().contains("Start date");
    this.tenureDetailsContainer().contains("End date");
    this.tenureDetailsContainer().contains("Type");
    // this.tenureDetailsContainer().contains("UPRN");
  }

  residentsDetailsAreDisplayed() {
    this.tenureResidentsContainer().should("be.visible");
    this.tenureResidentsContainer().contains("Date of birth");
    this.tenureResidentsContainer().contains("Type");
  }
}
export default TenurePageObjects;
