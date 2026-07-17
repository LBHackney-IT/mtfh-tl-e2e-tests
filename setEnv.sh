#!/bin/bash

PROFILE=$1
STAGE=${2:-development}

# Check if profile is provided
if [ -z "$PROFILE" ]; then
  echo "Usage: source setEnv.sh <aws-sso-profile> [stage]"
  echo "Example: source setEnv.sh housing-development development"
  exit 1
fi

# login if token expired
if ! aws sts get-caller-identity --profile "$PROFILE" > /dev/null 2>&1; then
  if ! aws sso login --profile "$PROFILE"; then
    echo "SSO login with profile $PROFILE failed"
    exit 1
  fi
fi

ssm_get() {
  aws ssm get-parameter \
    --name "/housing-tl/$STAGE/$1" \
    --query Parameter.Value \
    --output text \
    --profile "$PROFILE" \
    "${@:2}"
}

export CYPRESS_ENVIRONMENT="$STAGE"
export CYPRESS_AWS_REGION="eu-west-2"
# Prefer CYPRESS_E2E_BASE_URL over reserved CYPRESS_BASE_URL (which maps to
# Cypress config.baseUrl instead of config.env and causes silent mis-reads).
unset CYPRESS_BASE_URL
export CYPRESS_E2E_BASE_URL=$(ssm_get "e2e-base-url")
# Same SSM toggle as CircleCI; override in .env if needed.
export CYPRESS_COGNITO_FLOW_ENABLED=$(ssm_get "e2e-cognito-flow-enabled")

export CYPRESS_ASSET_ENDPOINT=$(ssm_get "property-api-url")
export CYPRESS_HOUSE_SEARCH_ENDPOINT=$(ssm_get "house-search-api-url")
export CYPRESS_CONTACT_DETAILS_ENDPOINT=$(ssm_get "contact-details-api-url")
export CYPRESS_EQUALITY_DETAILS_ENDPOINT=$(ssm_get "equality-information-api-url")
export CYPRESS_PERSON_ENDPOINT=$(ssm_get "person-api-url")
export CYPRESS_TENURE_ENDPOINT=$(ssm_get "tenure-api-url")
export CYPRESS_CAUTIONARY_ALERT_ENDPOINT=$(ssm_get "cautionary-alerts-api-url")
export CYPRESS_FEATURE_TOGGLE_ENDPOINT=$(ssm_get "configuration-api-url")

export CYPRESS_E2E_CLIENT_ID=$(ssm_get "e2e-cognito-client-id")
export CYPRESS_E2E_USERNAME=$(ssm_get "e2e-cognito-username")
export CYPRESS_E2E_PASSWORD=$(ssm_get "e2e-cognito-password" --with-decryption)

# Set AWS credentials for Cypress DynamoDB tasks in the current terminal session
eval "$(aws configure export-credentials --profile "$PROFILE" --format env)" || {
  echo "Failed to export credentials"
  exit 1
}
export CYPRESS_AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export CYPRESS_AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export CYPRESS_AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN

echo "Cypress environment configured for stage: $STAGE"
echo "API endpoints and Cognito credentials loaded from SSM."

# Optional overrides (e.g. legacy JWT, or CYPRESS_COGNITO_FLOW_ENABLED=false)
if [ -f .env ]; then
  # SC1091: shellcheck cannot follow a non-constant / optional path (.env is gitignored
  # and may be absent), so it warns on `source`. Safe to ignore here.
  # shellcheck disable=SC1091
  source .env
  echo "Optional overrides loaded from .env"
fi

# SC1091: path is built at runtime via BASH_SOURCE; shellcheck cannot resolve it statically.
# shellcheck disable=SC1091
source "$(dirname "${BASH_SOURCE[0]}")/verifyEnv.sh"
verify_cypress_env || return 1
