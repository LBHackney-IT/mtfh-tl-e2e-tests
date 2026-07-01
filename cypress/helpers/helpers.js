export const getAssetViewUrlByGuid = (assetGuid) => {
    return `${Cypress.config("baseUrl")}/property/${assetGuid}`;
};

//had to do this because that API is in bad shape in Dev and I need to go live
export const shouldStubPropertyCautionaryAlerts = () => {
    const environment = Cypress.env('ENVIRONMENT');
    return environment !== 'staging' && environment !== 'production';
};

export const stubPropertyCautionaryAlertsIfNeeded = () => {
    if (shouldStubPropertyCautionaryAlerts()) {
        cy.intercept('GET', '**/api/v1/cautionary-alerts/properties-new/*', {
            statusCode: 200,
            body: [],
        }).as('getPropertyCautionaryAlerts');
    }
};
  
export const getAssetEditUrlByGuid = (assetGuid) => {
    return `${Cypress.config("baseUrl")}/property/edit/${assetGuid}/`
}

export const tenureToPersonTenure = (tenure) => ({
    id: tenure.id,
    startDate: tenure.startOfTenureDate,
    endDate: tenure.endOfTenureDate,
    assetFullAddress: tenure.tenuredAsset.fullAddress,
    assetId: tenure.tenuredAsset.id,
    uprn: tenure.tenuredAsset.uprn,
    isActive: false,
    type: tenure.tenureType.description,
    propertyReference: tenure.tenuredAsset.propertyReference,
});

export const tenureToAssetTenure = (tenure) => ({
    endOfTenureDate: tenure.endOfTenureDate,
    id: tenure.id,
    paymentReference: tenure.paymentReference,
    startOfTenureDate: tenure.startOfTenureDate,
    type: tenure.tenureType.description,
});