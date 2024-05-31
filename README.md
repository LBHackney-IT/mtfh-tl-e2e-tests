# MTFH E2E Tests

## Important - About this repository:
The purpose of this repository is to store all E2E tests for Manage My Home (MMH).

The tests run based of the mfes that relate to the tests. At the top of each file there are tags that relate to the mfe. 

Part of writing a new feature for MMH, regardless of the specific microfrontend that's being changed, involves ensuring the that all tests within this repository will pass. This applies even if you do not modify existing tests, or add new tests accordingly (which you should). 

Failure to do this result in:
- less test coverage for MMH, adding tech debt, and all other disadvantages that come with untested code; 
- the pipeline may end up being **BLOCKED** by the changes to MMH, which could affect for ALL future releases on ALL frontends;

### Adding new tests - Guidelines
When adding new tests, please:
- Avoid using hardcoded GUID's in any of the `.feature` files, use `faker` to generate random ones instead, when you need to add any test data to the database.
- If test records are added to the database, these also become 'dynamic fixtures' and, if required, their properties can be accessed them using methods such as `getAssetFixture()`, `getTenureFixture()` etc. Often, these methods are used to obtain the GUID of the record, randomly generated when the record was created.
- Do **not** create tests that rely on data existing in the database. This could lead to tests "suddenly" failing if such data is then erased from the database.
- In those cases where very specific data is required, for a particular test/assertion, the use of 'static' fixtures is recommended (if possible).
- Tag each test or feature file with the name of the related microfrontend. For example, `mtfh-frontend-personal-details` would become `@personal-details`. This ensures that it runs during that mfe's deployment workflow.

## Running instructions
#### Installation:
Install the local dependencies using `npm install`

#### Environment variables
Create a `cypress.env.json` file from `cypress.env.example.json` from  with the following keys. You can get the endpoints from the AWS parameter store.
>"Environment":

This sets the environment context. It can be set to `local`, `development`, `staging` and `production`

>"E2E_ACCESS_TOKEN_${environment}":

This sets the access token depending upon the environment, you can create one for `local`, `dev`, `staging` and `prod` and set their properties accordingly.

>"ASSET_ENDPOINT": ${assetEndpoint}

>"HOUSE_SEARCH_ENDPOINT": ${housingSearchEndpoint}

>"CONTACT_DETAILS_ENDPOINT": ${contactDetailsEndpoint}

>"EQUALITY_DETAILS_ENDPOINT": ${equalityDetailsEndpoint}

>"PERSON_ENDPOINT": ${personEndpoint}

>"TENURE_ENDPOINT": ${tenureEndpoint}

>"CAUTIONARY_ALERT_ENDPOINT": ${cautionaryAlertEndpoint}

These are the API gateways as taken from the AWS parameter store. The properties can be set as follows: `https://${apiGateway}.execute-api.eu-west-2.amazonaws.com/${environment}/api/${apiVersion}`
This list is subject to change as the tests start to leverage more of the API's maturing functionality. If in doubt, check the [CircleCI config](https://github.com/LBHackney-IT/mtfh-tl-e2e-tests/blob/83f7a7c8b13124a7d7ecac845ed5a235abe87fd9/.circleci/config.yml#L87) to see exactly what endpoints the tests need to run.

>"AWS_SECRET_ACCESS_KEY": ${yourAWSCredentials}

>"AWS_ACCESS_KEY_ID": ${yourAWSCredentials}

>"AWS_SESSION_TOKEN": ${yourAWSCredentials}

These are your AWS credentials. Please set them in your CLI rather than in your `cypress.env.json`. All env var names have to have the prefix `CYPRESS_` to be picked up by the test runner if they are not in the json file, so make sure you update the names accordingly. An easy way to do this is:

```bash
// paste in your AWS credentials first
// ...
export CYPRESS_AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export CYPRESS_AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export CYPRESS_AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN
```

#### Starting the tests
Start a local test run by using `npm run test:cypress:run`
Open the Cypress runner console by using `npm run test:cypress:open`

#### Feature tags
The e2e tests use feature tags in order to run scoped tests. They can be set within a feature file using `@featureTag` and then ran using `cypress run -e tags='@featureTag'` more detailed documents can be found [here](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#running-tagged-tests).

## Running the tests in the pipeline
The tests are configured to run in the pipeline as per the CircleCi config.yml

Every test not tagged `@GoogleLighthouse`, `@Accessibility`, `@ignore` or `@device` will run on a CI run of the e2e pipeline (i.e. when a change is made to this repository on any of its branches). Because each feature is ran in parallel within separate containers, you will need to ensure that each of CircleCi's jobs' `parallelism` properties are correctly set to the number of feature files, or parallelism is disabled (by removing the key and property from the job), otherwise the tests won't run correctly.

When triggered externally by the MTFH micro frontends as part of that particular CI workflow, it will  run tests related to that mfe, again without the aforementioned tags, in both `development` and `staging` environments. This works by utilising cucumber's built-in tagging system. When creating new feature files, make sure to tag them with the correct microfrontend name. For example, `mtfh-frontend-personal-details` would become `@personal-details`. Once these tests have ran (and passed) they will trigger a downstream deployment of the parent micro frontend to an elevated environment (successful tests that ran against `development` will trigger a deployment to `staging` etc.). In `production` it will only run tests that have been explicitly tagged with `@Production`. 

#### Further testing resources
Further resources around creating tests can be found [here](https://drive.google.com/drive/folders/1XRqzngDYWvpfeJov1hbyJ_vBa88Ex2R4)