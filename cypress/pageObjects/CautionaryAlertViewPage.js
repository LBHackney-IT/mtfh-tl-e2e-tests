const envConfig = require('../../environment-config');

class CautionaryAlertViewPageObject {
    // Actions
    visit(cautionaryAlertId) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.alertPreviewUrl}/${cautionaryAlertId}`);
        cy.injectAxe();
    }

    // Specific UI items
    pageTitle = () => cy.getByTestId("manage-ca-title");

    // Details table items
    dateOfIncidentValue     = () => this.caTableItemValue("dateOfIncident");
    alertCodeValue          = () => this.caTableItemValue("code");
    cautionOnSystemValue    = () => this.caTableItemValue("cautionOnSystem");    
    personNameValue         = () => this.caTableItemValue("personName");
    reasonValue             = () => this.caTableItemValue("reason");
    assureReferenceValue    = () => this.caTableItemValue("assureReference");

    // Reuse purpose
    caTableItemValue = (itemName) => cy.getByTestId(`${itemName}-value`);
}

export default CautionaryAlertViewPageObject;
