const setEnvironmentConfig = (on, config) => {
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
        baseUrl = "https://manage-my-home-development.hackney.gov.uk"
        gssoTestKey = config.env.E2E_ACCESS_TOKEN_DEV
    } else if (environment === 'staging') {
        baseUrl = "https://manage-my-home-staging.hackney.gov.uk"
        gssoTestKey = config.env.E2E_ACCESS_TOKEN_STAGING
    } else if (environment === 'production') {
        baseUrl = "https://manage-my-home.hackney.gov.uk"
        gssoTestKey = config.env.E2E_ACCESS_TOKEN_PRODUCTION
    }

    config.baseUrl = baseUrl
    config.gssoTestKey = gssoTestKey

    return config
}

module.exports = {
    setEnvironmentConfig
} 