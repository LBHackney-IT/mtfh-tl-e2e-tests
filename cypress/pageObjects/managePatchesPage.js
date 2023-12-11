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
        return cy.contains('The patch has been updated successfully')
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

    reassignPatch(patch1Name, officerName, officerEmail) {
        this.clickButtonForPatch(patch1Name, "edit-assignment")
        this.getOfficerNameInput(patch1Name).clear().type(officerName)
        this.getOfficerEmailInput(patch1Name).clear().type(officerEmail)
        this.clickButtonForPatch(patch1Name, "confirm-reassignment")
    }
}

export default ManagePatchesPageObjects