const { fetchCognitoToken, cognitoFlowEnabled } = require("./cognito-helper");

const setEnvironmentConfig = async (on, config) => {
    // setting page paths
    config.searchUrl = "search"
    config.personUrl = "person"
    config.personCommentsUrl = "comment/person"
    config.tenureCommentsUrl="comment/tenure"
    config.propertyCommentsUrl="comment/property"
    config.startSoleToJointProcessUrl="processes/soletojoint/start/tenure"
    config.alertPreviewUrl="cautionary-alerts/alert"
    config.relatedAssetUrl="property/related"
    config.tenureUrl = "tenure"
    config.property = "property"
    
    // Set baseUrl and gssoTestKey based on environment
    const environment = config.env.ENVIRONMENT
    let rootUrl = "http://local.hackney.gov.uk"
    let rootComponentPort = "9000"
    let gssoTestKey = config.env.E2E_ACCESS_TOKEN_LOCAL
    let baseUrl = `${rootUrl}:${rootComponentPort}`

    // WIP - will be properly refined upon integrating this with the last environment.
    // For now, only 1 environment is configured with cognito, and even then we want legacy
    // flow to remain primary until more flake gets shed from cognito flow.
    const isCognitoFlow = cognitoFlowEnabled(config.env);

    console.log(`Tests are running using the ${isCognitoFlow ? "Cognito" : "Legacy"} flow.`);

    if (environment === 'development') {
        baseUrl = "https://manage-my-home-development.hackney.gov.uk";
        gssoTestKey = isCognitoFlow
            ? await fetchCognitoToken(config.env)
            : config.env.E2E_ACCESS_TOKEN_DEV;
    } else if (environment === 'staging') {
        baseUrl = "https://manage-my-home-staging.hackney.gov.uk"
        gssoTestKey = config.env.E2E_ACCESS_TOKEN_STAGING
    } else if (environment === 'production') {
        baseUrl = "https://manage-my-home.hackney.gov.uk"
        gssoTestKey = config.env.E2E_ACCESS_TOKEN_PRODUCTION
    }

    config.baseUrl = baseUrl
    config.gssoTestKey = gssoTestKey
    config.isCognitoFlow = isCognitoFlow;

    return config
}

module.exports = {
    setEnvironmentConfig
} 