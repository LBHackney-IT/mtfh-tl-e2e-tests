const { fetchCognitoToken } = require("./cognito-helper");

const setEnvironmentConfig = async (on, config) => {
    console.log("Enter: 'setEnvironmentConfig'.");
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

    if (environment === 'development') {
        console.log("Old token", gssoTestKey.slice(0,10));
        baseUrl = "https://manage-my-home-development.hackney.gov.uk";

        gssoTestKey = await fetchCognitoToken(config.env);
        console.log("New token", gssoTestKey.slice(0,10));
    } else if (environment === 'staging') {
        baseUrl = "https://manage-my-home-staging.hackney.gov.uk"
        gssoTestKey = config.env.E2E_ACCESS_TOKEN_STAGING
    } else if (environment === 'production') {
        baseUrl = "https://manage-my-home.hackney.gov.uk"
        gssoTestKey = config.env.E2E_ACCESS_TOKEN_PRODUCTION
    }

    config.baseUrl = baseUrl
    config.gssoTestKey = gssoTestKey
    console.log("Set config token", config.gssoTestKey.slice(0,10));
    console.log("Exit 'setEnvironmentConfig'.")
    return config
}

module.exports = {
    setEnvironmentConfig
} 