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

The e2e tests use tags to scope which tests run in a given pipeline or local command. Tags are set on `describe` or `it` blocks in `.cy.js` files, for example:

```js
describe('Person page', { tags: ['@personal-details', '@cognito-authentication', '@common', '@root'] }, () => {
  it('should view person details page', { tags: '@SmokeTest' }, () => { /* ... */ });
});
```

#### How tag filtering works (Cypress 15 + `@cypress/grep` v6)

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

#### Further testing resources
Further resources around creating tests can be found [here](https://drive.google.com/drive/folders/1XRqzngDYWvpfeJov1hbyJ_vBa88Ex2R4)