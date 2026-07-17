
class EditPersonContactDetailsPageObjects {
    visit(record) {
        cy.visit(`${Cypress.config("baseUrl")}/person/${record}`);
        cy.injectAxe();
    }

    editPersonContactDetails(record) {
        cy.visit(`${Cypress.config("baseUrl")}/person/${record}/edit-contact-details`);
        cy.location("pathname").should("include", "/edit-contact-details");
        cy.contains("Add a phone number", { timeout: 30000 }).should("be.visible");
    }

    mainContent() {
        return cy.get('#main-content');
    }
}

export default EditPersonContactDetailsPageObjects;
