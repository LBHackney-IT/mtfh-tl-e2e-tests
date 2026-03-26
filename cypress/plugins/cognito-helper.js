const axios = require("axios");

async function fetchCognitoToken(env) {
    console.warn(">>>> Running 'fetchCognitoToken'");
    const region = env.AWS_REGION;
    const clientId = env.E2E_CLIENT_ID;
    const username = env.E2E_USERNAME;
    const password = env.E2E_PASSWORD;

    console.log(">>>> Checking cognito env vars emptiness");
    if (!clientId || !username || !password || !region) {
        throw new Error(">>>> Missing Cognito login environment variables.");
    }

    console.log(">>>> Env vars are not empty.");

    try {
        console.log(">>>> Making a request for cognito token.");
        const response = await axios.post(`https://cognito-idp.${region}.amazonaws.com/`, {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: clientId,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
        }, {
            headers: {
                'Content-Type': 'application/x-amz-json-1.1',
                'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
            },
        });
        console.log(">>>> Request done.");

        console.log(">>>> Keys 'data':", Object.keys(response.data));
        console.log(">>>> Keys 'auth result':", Object.keys(response.data.AuthenticationResult));
        console.log(">>>> Some number of chars of token", response.data.AuthenticationResult.IdToken.slice(0,10));
        console.log(">>>> End of 'fetchCognitoToken'.");

        return response.data.AuthenticationResult.IdToken;
    } catch (error) {
        console.error('>>>> Cognito login failed:', error.message);
        throw error;
    }
}

module.exports = {
    fetchCognitoToken
}
