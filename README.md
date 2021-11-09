# MTFH e2e Tests

#### Getting started:
Install the local dependencies using `npm install`

### Environment variables
Create a `cypress.env.json` file with the following keys. You can get the endpoints from the AWS parameter store.
>"Environment":

This sets the environment context. It can be set to `local`, `development`, `staging` and `production`

>"E2E_ACCESS_TOKEN_${environment}":

This sets the access token depending upon the environment, you can create one for `local`, `dev`, `staging` and `prod` and set their properties accordingly
>"ASSET_ENDPOINT":
>"CONTACT_DETAILS_ENDPOINT":
>"PERSON_ENDPOINT":
>"TENURE_ENDPOINT":

These are the API gateways as taken from the AWS parameter store. The properties can be set as follows: `https://${apiGateway}.execute-api.eu-west-2.amazonaws.com/${environment}/api/${apiVersion}`

This list is subject to change as the tests start to leverage more of the API's maturing functionality. If in doubt, check the [circleci config](https://github.com/LBHackney-IT/mtfh-tl-e2e-tests/blob/ddf2d8b754b35a267c7ca862fdb22ffab2a2fbdd/.circleci/config.yml#L105) to see exactly what endpoints the tests need to run.

You will need the API gateway url and environment path for the feature toggles `export FEATURE_TOGGLE_ENDPOINT=${https://${api_gateway}.execute-api.eu-west-2.amazonaws.com/${environment}`

#### Starting the tests
Start a local test run by using `npm run test:cypress:run`
Open the Cypress runner console by using `npm run test:cypress:open`

#### Feature tags
The e2e tests use feature tags in order to run scoped tests. They can be set within a feature file using `@featureTag` and then ran using `cypress run -e tags='@featureTag'` more detailed documents can be found [here](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#running-tagged-tests)
