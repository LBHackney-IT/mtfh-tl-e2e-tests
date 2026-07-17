#!/bin/bash

PROFILE=$1
STAGE=$2
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Require both values because AWS profile names are user-defined.
if [ -z "$PROFILE" ] || [ -z "$STAGE" ]; then
  echo "Usage: source setEnv.sh <aws-sso-profile> <stage>"
  echo "Example: source setEnv.sh housing-development development"
  return 1 2>/dev/null || exit 1
fi

# login if token expired
if ! aws sts get-caller-identity --profile "$PROFILE" > /dev/null 2>&1; then
  if ! aws sso login --profile "$PROFILE"; then
    echo "SSO login with profile $PROFILE failed"
    return 1 2>/dev/null || exit 1
  fi
fi

# SC1091: path is built at runtime; shellcheck cannot resolve it statically.
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/loadCypressEnvFromSsm.sh" "$STAGE" "$PROFILE" || return 1

# Set AWS credentials for Cypress DynamoDB tasks in the current terminal session
eval "$(aws configure export-credentials --profile "$PROFILE" --format env)" || {
  echo "Failed to export credentials"
  return 1
}
export CYPRESS_AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export CYPRESS_AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export CYPRESS_AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN

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
source "${SCRIPT_DIR}/verifyEnv.sh"
verify_cypress_env || return 1
