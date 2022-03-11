import "@testing-library/cypress/add-commands";
import "cypress-axe";
import "cypress-audit/commands";
import "cypress-localstorage-commands";

const environmentConfig = require("../../environment-config");

Cypress.Commands.add("login", () => {
  const gssoTestKey = environmentConfig.gssoTestKey;
  cy.log(gssoTestKey);
  cy.getCookies().should("be.empty");
  cy.setCookie("hackneyToken", gssoTestKey);
  cy.getCookie("hackneyToken").should("have.property", "value", gssoTestKey);
  cy.log(Cypress.config("featureToggles"));
  window.localStorage.setItem(
    "features",
    JSON.stringify(Cypress.config("featureToggles"))
  );
});

Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

Cypress.Commands.add("logout", () => {
  cy.clearCookies();
  cy.getCookies().should("be.empty");
});
