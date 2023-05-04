const envConfig = require('../../environment-config');

class CautionaryAlertViewPageObject {
    // Actions
    visit(cautionaryAlertId) {
        cy.visit(`${envConfig.baseUrl}/${envConfig.alertPreviewUrl}/${cautionaryAlertId}`);
        cy.injectAxe();
    }

    // Specific UI items
    pageTitle = () => this.getByTestIdAttr("manage-ca-title");
    backLink = () => this.getByTestIdAttr("back-link");
    closeButton =() => this.getByTestIdAttr("close-link");

    // Details table items
    dateOfIncidentValue     = () => this.caTableItemValue("dateOfIncident");
    alertCodeValue          = () => this.caTableItemValue("code");
    cautionOnSystemValue    = () => this.caTableItemValue("cautionOnSystem");    
    personNameValue         = () => this.caTableItemValue("personName");
    reasonValue             = () => this.caTableItemValue("reason");
    assureReferenceValue    = () => this.caTableItemValue("assureReference");

    // Reuse purpose
    getByTestIdAttr  = (testName) => cy.getByTestId(testName)
    caTableItemValue = (itemName) => this.getByTestIdAttr(`${itemName}-value`);
}

export default CautionaryAlertViewPageObject;
