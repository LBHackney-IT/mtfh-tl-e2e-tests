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

### Prerequisites

This project requires **Node 24.17.x** (pinned to `24.17.0`). Use [nvm](https://github.com/nvm-sh/nvm) or your preferred version manager:

```bash
nvm use          # reads .nvmrc (24.17.0)
node -v          # should print v24.17.x
```

### Installation

Install dependencies with:

```bash
npm ci
```

Use `npm install` only when intentionally updating `package-lock.json`.

### Environment variables

Cypress 15 is configured with `allowCypressEnv: false`, so **`cypress.env.json` is not used**. All configuration must be provided as OS environment variables with the `CYPRESS_` prefix. Cypress reads these into `config.env` at startup.

Secrets must **never** be committed. Cognito credentials live in AWS SSM (password is a `SecureString`).

#### Files

| File | Committed | Purpose |
|------|-----------|---------|
| `loadCypressEnvFromSsm.sh` | Yes | Single SSM → `CYPRESS_*` mapping shared by local and CircleCI |
| `setEnv.sh` | Yes | SSO login, sources shared loader, exports AWS credentials, `.env` overrides, verifies env |
| `verifyEnv.sh` | Yes | Verification logic used by `setEnv.sh`; can also be run standalone |
| `.env.example` | Yes | Optional overrides template (legacy JWT, Cognito toggle) |
| `.env` | No (gitignored) | Optional local overrides only — not required for Cognito |

#### Loading environment variables (every new terminal session)

Ensure you have used Common Fate to get the appropriate permisions to the AWS account you are targeting with the test, for example housing-development. If you forget you'll receive the following error:

```text
aws: [ERROR]: An error occurred (ForbiddenException) when calling the GetRoleCredentials operation: No access
```

`source` from the project root (not `./`) so exports apply to your current shell:

```bash
source setEnv.sh <aws-sso-profile> development
```

That loads API endpoints and Cognito credentials via `loadCypressEnvFromSsm.sh` from Parameter Store paths under `/housing-tl/<stage>/` (same script CircleCI uses):

| Parameter | Env var | Type |
|-----------|---------|------|
| `e2e-base-url` | `CYPRESS_E2E_BASE_URL` | String |
| `property-api-url`, … | `CYPRESS_*_ENDPOINT` | String |
| `e2e-cognito-client-id` | `CYPRESS_E2E_CLIENT_ID` | String |
| `e2e-cognito-username` | `CYPRESS_E2E_USERNAME` | String |
| `e2e-cognito-password` | `CYPRESS_E2E_PASSWORD` | SecureString (`--with-decryption`) |
| `e2e-cognito-flow-enabled` | `CYPRESS_COGNITO_FLOW_ENABLED` | String `true` / `false` |

Add new SSM-backed vars in one place: append a line to `CYPRESS_SSM_MAPPINGS` in `loadCypressEnvFromSsm.sh`.

`setEnv.sh` also sets short-lived `CYPRESS_AWS_*` credentials for DynamoDB seeding (CircleCI does the same from the assumed-role profile). Cognito on/off can be overridden in `.env` after the SSM load.

**Base URL:** use `CYPRESS_E2E_BASE_URL`, not `CYPRESS_BASE_URL`. Cypress treats `CYPRESS_BASE_URL` as a reserved config override (`config.baseUrl`) and does **not** put it in `config.env`. The shared loader sets `CYPRESS_E2E_BASE_URL` from SSM; `environment-config.js` then copies `config.env.E2E_BASE_URL` onto Cypress `config.baseUrl` for `cy.visit` / `cy.request`.

#### Authentication

**Cognito flow (when SSM / `.env` has `CYPRESS_COGNITO_FLOW_ENABLED=true`):** credentials come from SSM. On Cypress startup you should see:

```text
Tests are running using the Cognito flow.
```

**Legacy JWT flow:** set the toggle to `false` and export the stage token matching the pipeline (e.g. in `.env`):

```bash
export CYPRESS_COGNITO_FLOW_ENABLED=false
export CYPRESS_E2E_ACCESS_TOKEN_DEVELOPMENT='<<your hackney JWT>>'
# staging:  CYPRESS_E2E_ACCESS_TOKEN_STAGING
# production: CYPRESS_E2E_ACCESS_TOKEN_PRODUCTION
```

In CircleCI, Cognito on/off and the base URL both come from the same `loadCypressEnvFromSsm.sh` script (SSM `e2e-cognito-flow-enabled`, `e2e-base-url`), so they can be changed per stage without a code change. The job only keeps secrets for the **active** auth flow in the Cypress environment: Cognito credentials when enabled, or the stage legacy JWT when disabled.

#### Verify before running tests

`setEnv.sh` automatically runs `verifyEnv.sh` at the end. It prints `OK` or `MISSING` for each required variable (secrets are masked) and returns an error if anything is unset.

You can also re-run verification without calling AWS again:

```bash
source verifyEnv.sh && verify_cypress_env
```

**Example output (success)**

```text
Cypress environment configured for stage: development
API endpoints and Cognito credentials loaded from SSM.

Verifying environment variables...
OK       CYPRESS_ENVIRONMENT                    development
OK       CYPRESS_E2E_BASE_URL                   https://manage-my-home-development.hackney.gov.uk
OK       CYPRESS_ASSET_ENDPOINT                 https://xw8x2e7q06.execute-api.eu-west-2.amaz...
OK       CYPRESS_HOUSE_SEARCH_ENDPOINT          https://y1e46yws9c.execute-api.eu-west-2.amaz...
OK       CYPRESS_CONTACT_DETAILS_ENDPOINT       https://gos4l9my1a.execute-api.eu-west-2.amaz...
OK       CYPRESS_EQUALITY_DETAILS_ENDPOINT      https://rgq79ov75i.execute-api.eu-west-2.amaz...
OK       CYPRESS_PERSON_ENDPOINT                https://sr1g61wye9.execute-api.eu-west-2.amaz...
OK       CYPRESS_TENURE_ENDPOINT                https://2524go3mdg.execute-api.eu-west-2.amaz...
OK       CYPRESS_CAUTIONARY_ALERT_ENDPOINT      https://qhsg1gyqlj.execute-api.eu-west-2.amaz...
OK       CYPRESS_FEATURE_TOGGLE_ENDPOINT        https://a9nuohv61k.execute-api.eu-west-2.amaz...
OK       CYPRESS_AWS_ACCESS_KEY_ID              ASIA2J4Q...
OK       CYPRESS_AWS_SECRET_ACCESS_KEY          (set)
OK       CYPRESS_AWS_SESSION_TOKEN              (set)
OK       CYPRESS_COGNITO_FLOW_ENABLED           true
OK       CYPRESS_AWS_REGION                     eu-west-2
OK       CYPRESS_E2E_CLIENT_ID                  <<cognito-app-client-id>>
OK       CYPRESS_E2E_USERNAME                   e2e-testing-development-t-and-l@hackney.gov.uk
OK       CYPRESS_E2E_PASSWORD                   (set)

All required variables are set.
```

**Expected values (development + Cognito flow)** — all set by `setEnv.sh` from SSM / AWS SSO unless noted:

| Variable | Example / shape |
|----------|-----------------|
| `CYPRESS_ENVIRONMENT` | `development` |
| `CYPRESS_E2E_BASE_URL` | `https://manage-my-home-development.hackney.gov.uk` → copied to Cypress `baseUrl` |
| `CYPRESS_*_ENDPOINT` | API Gateway URLs under `/housing-tl/development/…` |
| `CYPRESS_AWS_ACCESS_KEY_ID` / `SECRET` / `SESSION_TOKEN` | short-lived SSO credentials |
| `CYPRESS_AWS_REGION` | `eu-west-2` |
| `CYPRESS_E2E_CLIENT_ID` | Cognito app client ID |
| `CYPRESS_E2E_USERNAME` | e2e test user email |
| `CYPRESS_E2E_PASSWORD` | `(set)` — from SecureString |
| `CYPRESS_COGNITO_FLOW_ENABLED` | from SSM `e2e-cognito-flow-enabled` (override in `.env`) |

**Legacy JWT flow:** if `CYPRESS_COGNITO_FLOW_ENABLED` is `false`, verification checks for the stage token (`CYPRESS_E2E_ACCESS_TOKEN_DEVELOPMENT` / `_STAGING` / `_PRODUCTION`) instead of the Cognito variables. There is no `*_LOCAL` or `*_DEV` alias.

### Run tests

```bash
npm run test:cypress:open    # interactive runner
npm run test:cypress:run     # headless
```

The CircleCI pipeline uses the same `CYPRESS_*` variable names from the `mtfh-mfe-e2e-tests` context — no context changes are required.

### Feature tags

The e2e tests use tags to scope which tests run in a given pipeline or local command. Tags are set on `describe` or `it` blocks in `.cy.js` files, for example:

```js
describe('Person page', { tags: ['@personal-details', '@cognito-authentication', '@common', '@root'] }, () => {
  it('should view person details page', { tags: '@SmokeTest' }, () => { /* ... */ });
});
```

### How tag filtering works (Cypress 15 + `@cypress/grep` v6)

`@cypress/grep` v6 reads tag filters from Cypress **`expose`**, not `env`. Do **not** use `-e grepTags=...` or `CYPRESS_grepTags` alone — they are ignored by grep v6.

Tag filters are passed via `--expose` as comma-separated key/value pairs:

```bash
npx cypress run --expose grepTags=@personal-details+-@ignore,grepFilterSpecs=true
```

| Setting | Purpose |
|---------|---------|
| `grepTags` | Which tests to include/exclude |
| `grepFilterSpecs=true` | Only load spec files that contain matching tests (avoids walking all 29 files) |
| `grepOmitFiltered=true` | Omit non-matching tests from output (set in `cypress.config.js` and CI) |

`cypress/plugins/grep-config.js` copies `--expose` values onto `config.expose` before the grep plugin runs. On startup you should see:

```text
@cypress/grep: configured grepTags="@Production+-@ignore+-@device"
@cypress/grep: filtering using tag(s) "..."
```

If those lines are **missing**, tag filtering is not active and the full suite will run.

**CLI tip:** use `+` between tags for AND/exclusions in npm scripts and CI. Spaces inside `grepTags` values can be split by the shell, which was the cause of production/smoke appearing to run the same full suite locally.

Convenience scripts in `package.json` already pass the correct tags:

| Script | `grepTags` | Spec scope | Purpose |
|--------|------------|------------|---------|
| `npm run test:cypress:run` | `-@GoogleLighthouse+-@Accessibility+-@ignore+-@device` | matching specs only | Default local/CI-style run |
| `npm run test:cypress:smoke` | `@SmokeTest+-@ignore` | matching specs only | Smoke tests only |
| `npm run test:cypress:production` | `@Production+-@ignore+-@device` | `home.cy.js` only | Production-safe home page tests |
| `npm run test:cypress:staging:devices` | `@device+-@ignore` | matching specs only | Device viewport tests |
| `npm run test:cypress:accessibility` | `@Accessibility` | matching specs only | Accessibility-tagged tests |
| `npm run test:cypress:GoogleLighthouse` | `@GoogleLighthouse` | matching specs only | Lighthouse tests (if wired) |

**Tag combination rules** (`@cypress/grep`):

- Space-separated tags use **OR** logic when passed as separate tokens (avoid in npm scripts; CI now uses `+` throughout).
- Use `+` for **AND** logic: `@SmokeTest+@personal-details` or `-@ignore+-@device+@personal-details`.
- Prefix with `-` to exclude: `@Production+-@ignore+-@device` means must have `@Production`, must not have `@ignore` or `@device`.

More detail: [@cypress/grep — filter with tags](https://www.npmjs.com/package/@cypress/grep#filter-with-tags).

## Running the tests in the pipeline

The tests are configured in `.circleci/config.yml`. Tag filters are passed to Cypress via `--expose` (comma-separated), with `grepFilterSpecs=true` on all runs. Production additionally passes `--spec cypress/e2e/home.cy.js`.

```bash
./node_modules/.bin/cypress run --expose "grepTags=${GREP_TAGS},grepFilterSpecs=true,grepOmitFiltered=true" --spec cypress/e2e/home.cy.js  # production only
```

### What runs where and when

| Workflow | Trigger | Environment | `grepTags` | What runs |
|----------|---------|-------------|------------|-----------|
| `run-ci-tests` | Push/PR to this repo (`run_workflow_ci: true`) | development | `-@GoogleLighthouse+-@Accessibility+-@ignore+-@device` | All tests except excluded tags |
| `e2e-tests-development` | External MFE pipeline (`external_trigger` + `development_environment`) | development | Above `+@<mfe>` or `+@SmokeTest`¹ | Tests for the triggering MFE only |
| `e2e-tests-staging` | External MFE pipeline after dev promotion | staging | Same as development | Tests for the triggering MFE only |
| `e2e-tests-production` | External MFE pipeline after staging promotion | production | `@Production+-@ignore+-@device` + `home.cy.js` | **Only** `@Production` tests — no MFE or smoke filter |
| `e2e-tests-devices` | Weekly schedule (Tuesdays, `master` branch) | staging | `-@GoogleLighthouse+-@Accessibility+-@ignore+@device` | Device viewport tests only |

¹ When the upstream MFE is `common`, `cognito-authentication`, or `root`, the filter is remapped to `@SmokeTest`.

### External MFE triggers (development & staging)

When an MTFH microfrontend pipeline triggers these tests, `upstream_pipeline_name` is used to derive an MFE tag (e.g. `mtfh-frontend-personal-details` → `@personal-details`). Matching tests run in **development** first; on success, the MFE is deployed to **staging** and the same scoped tests run again. On staging success, production deployment is triggered.

Tag each spec with the related microfrontend name (e.g. `@personal-details`) so it runs during that MFE's deployment workflow.

### Production

Production runs **only** tests explicitly tagged `@Production`. Today that is the home page spec (`home.cy.js`). The pipeline applies three safeguards:

1. **Tag filter only** — `@Production+-@ignore+-@device` (no `@SmokeTest` or MFE tag appended)
2. **Spec pre-filter** — `grepFilterSpecs=true`
3. **Hard spec pin** — `--spec cypress/e2e/home.cy.js`

Smoke tests (`@SmokeTest`) and MFE-scoped tags cannot leak into production.

### CI runs of this repository

Every test not tagged `@GoogleLighthouse`, `@Accessibility`, `@ignore`, or `@device` runs when a change is made to this repository. Parallelism in CircleCI jobs must match the number of spec files (or be disabled), otherwise tests may not run correctly across containers.

### Further testing resources
Further resources around creating tests can be found [here](https://drive.google.com/drive/folders/1XRqzngDYWvpfeJov1hbyJ_vBa88Ex2R4)