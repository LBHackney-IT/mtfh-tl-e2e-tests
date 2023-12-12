const envConfig = require('../../environment-config')

class ManagePatchesPageObjects {
    visit() {
        cy.visit(`${envConfig.baseUrl}/${envConfig.property}/all-patches-and-areas`)
        cy.injectAxe()
    }

    backLink() {
        return cy.get('[data-testid="back-link"]')
    }

    getAreaDropdown() {
        return cy.get('[data-testid="area-select"]')
    }

    getPatchRow(patchName) {
        return cy.get(`[data-testid="${patchName}-row"]`)
    }

    getOfficerNameInput(patchName) {
        return cy.get(`[data-testid="officer-name-input-${patchName}"]`)
    }

    getOfficerEmailInput(patchName) {
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
        return this.getPatchRow(patchName).within(() => {
            cy.get(`[data-testid="${buttonType}-button"]`).click()
        });
    }

    unassignPatch(patchName) {
        this.clickButtonForPatch(patchName, "edit-assignment")
        this.getOfficerNameInput(patchName).clear()
        this.getOfficerEmailInput(patchName).clear()
        this.clickButtonForPatch(patchName, "confirm-reassignment")
    }

    reassignPatch(patchName, officerName, officerEmail) {
        this.clickButtonForPatch(patchName, "edit-assignment")
        this.getOfficerNameInput(patchName).clear().type(officerName)
        this.getOfficerEmailInput(patchName).clear().type(officerEmail)
        this.clickButtonForPatch(patchName, "confirm-reassignment")
    }
}

export default ManagePatchesPageObjects