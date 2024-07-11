
class ManagePatchesPageObjects {
    visit() {
        cy.visit(`${Cypress.config("baseUrl")}/${Cypress.config("property")}/all-patches-and-areas`)
        cy.injectAxe()
    }

    backLink() {
        return cy.get('[data-testid="back-link"]')
    }

    areaDropdown() {
        return cy.get('[data-testid="area-select"]')
    }

    patchRow(patchName) {
        return cy.get(`[data-testid="${patchName}-row"]`)
    }

    officerNameInput(patchName) {
        return cy.get(`[data-testid="officer-name-input-${patchName}"]`)
    }

    officerEmailInput(patchName) {
        return cy.get(`[data-testid="officer-email-input-${patchName}"]`)
    }

    getSuccessMessage() {
        return cy.contains('The update has completed successfully')
    }
    
    clickButtonForPatch(patchName, buttonType) {
        var validButtons = ["edit-assignment", "confirm-reassignment", "cancel"]
        if (!validButtons.includes(buttonType)) {
            throw new Error(`Invalid button type ${buttonType}, must be one of ${validButtons}`)
        }
        return this.patchRow(patchName).within(() => {
            cy.get(`[data-testid="${buttonType}-button"]`).click()
        });
    }

    unassignPatch(patchName) {
        this.clickButtonForPatch(patchName, "edit-assignment")
        this.officerNameInput(patchName).clear()
        this.officerEmailInput(patchName).clear()
        this.clickButtonForPatch(patchName, "confirm-reassignment")
    }

    reassignPatch(patchName, officerName, officerEmail) {
        this.clickButtonForPatch(patchName, "edit-assignment")
        this.officerNameInput(patchName).clear().type(officerName)
        this.officerEmailInput(patchName).clear().type(officerEmail)
        this.clickButtonForPatch(patchName, "confirm-reassignment")
    }
}

export default ManagePatchesPageObjects