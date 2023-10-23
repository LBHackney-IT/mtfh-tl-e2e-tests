const envConfig = require('../../environment-config')

class ManagePatchesPageObjects {
    visit() {
        cy.visit(`${envConfig.baseUrl}/${envConfig.property}/manage-patches`)
        cy.injectAxe()
    }

    getAreaDropdown() {
        return cy.get('[data-testid="area-select"]')
    }

    getPatchRow(patchName) {
        return cy.get(`[data-testid="${patchName}-row"]`)
    }

    getPatchReassignmentMessage(patchName) {
        return cy.get(`[data-testid="reassign-message-${patchName}"]`)
    }
    
    confirmReassignment() {
        cy.get('[data-testid="confirm-reassignment-button"]').click()
    }

    getSuccessMessage() {
        return cy.contains('The patches have been updated successfully')
    }
    
    clickButtonForPatch(patchName, buttonType) {
        var validButtons = ["reassign", "assign", "cancel"]
        if (!validButtons.includes(buttonType)) {
            throw new Error(`Invalid button type ${buttonType}, must be one of ${validButtons}`)
        }
        return this.getPatchRow(patchName).within(() => {
            cy.get(`[data-testid="${buttonType}-button"]`).click()
        });
    }

    switchPatchAssignments(patch1Name, patch2Name) {
        this.clickButtonForPatch(patch1Name, "reassign")
        this.clickButtonForPatch(patch2Name, "assign")
    }
}

export default ManagePatchesPageObjects