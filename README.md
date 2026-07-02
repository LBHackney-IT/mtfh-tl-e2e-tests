# MTFH E2E Tests

## Important - About this repository:
The purpose of this repository is to store all E2E tests for Manage My Home (MMH).

The tests run based of the mfes that relate to the tests. At the top of each file there are tags that relate to the mfe. 

Part of writing a new feature for MMH, regardless of the specific microfrontend that's being changed, involves ensuring the that relative tests within this repository will pass. This applies even if you do not modify existing tests, or add new tests accordingly (which you should). 

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

#### Prerequisites

This project requires **Node 24.17.x** (pinned to `24.17.0`). Use [nvm](https://github.com/nvm-sh/nvm) or your preferred version manager:

```bash
nvm use          # reads .nvmrc (24.17.0)
node -v          # should print v24.17.x
```

#### Installation

Install dependencies with:

```bash
npm ci
```

Use `npm install` only when intentionally updating `package-lock.json`.

#### Environment variables

Secrets (auth tokens, AWS credentials, Cognito passwords) must **never** be committed. Set them as OS environment variables with the `CYPRESS_` prefix.

**Local setup (recommended):**

```bash
source setEnv.sh <aws-sso-profile> development
export CYPRESS_E2E_ACCESS_TOKEN_DEVELOPMENT='<<your hackney JWT>>'
```

`setEnv.sh` fetches API endpoints from AWS SSM and exports short-lived AWS credentials for DynamoDB seeding tasks. Credentials stay in the Node process and are not exposed to the browser.

**Optional non-secret config:** copy `cypress.env.example.json` to `cypress.env.json` for endpoint URLs only if you are not using `setEnv.sh`. Do not put tokens or AWS keys in this file.

The CircleCI pipeline uses the same `CYPRESS_*` variable names from the `mtfh-mfe-e2e-tests` context — no context changes are required.

#### Starting the tests
Start a local test run by using `npm run test:cypress:run`
Open the Cypress runner console by using `npm run test:cypress:open`

#### Feature tags
The e2e tests use feature tags in order to run scoped tests. They can be set within a feature file using `@featureTag` and then ran using `cypress run -e grepTags='@featureTag'` more detailed documents can be found [here](https://www.npmjs.com/package/@cypress/grep#filter-with-tags).

## Running the tests in the pipeline
The tests are configured to run in the pipeline as per the CircleCi config.yml

Every test not tagged `@GoogleLighthouse`, `@Accessibility`, `@ignore` or `@device` will run on a CI run of the e2e pipeline (i.e. when a change is made to this repository on any of its branches). Because each feature is ran in parallel within separate containers, you will need to ensure that each of CircleCi's jobs' `parallelism` properties are correctly set to the number of feature files, or parallelism is disabled (by removing the key and property from the job), otherwise the tests won't run correctly.

When triggered externally by the MTFH micro frontends as part of that particular CI workflow, it will  run tests related to that mfe, again without the aforementioned tags, in both `development` and `staging` environments. This works by utilising cucumber's built-in tagging system. When creating new feature files, make sure to tag them with the correct microfrontend name. For example, `mtfh-frontend-personal-details` would become `@personal-details`. Once these tests have ran (and passed) they will trigger a downstream deployment of the parent micro frontend to an elevated environment (successful tests that ran against `development` will trigger a deployment to `staging` etc.). In `production` it will only run tests that have been explicitly tagged with `@Production`. 

#### Further testing resources
Further resources around creating tests can be found [here](https://drive.google.com/drive/folders/1XRqzngDYWvpfeJov1hbyJ_vBa88Ex2R4)