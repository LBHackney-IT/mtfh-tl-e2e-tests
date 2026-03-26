const axios = require("axios");

async function fetchCognitoToken(env) {
    const region = env.AWS_REGION;
    const clientId = env.E2E_CLIENT_ID;
    const username = env.E2E_USERNAME;
    const password = env.E2E_PASSWORD;

    if (!clientId || !username || !password || !region) {
        throw new Error("Missing Cognito login environment variables.");
    }

    try {
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

        return response.data.AuthenticationResult.IdToken;
    } catch (error) {
        console.error('Cognito login failed:', error.message);
        throw error;
    }
}

module.exports = {
    fetchCognitoToken
}
