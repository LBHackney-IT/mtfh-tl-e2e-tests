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

export CYPRESS_ENVIRONMENT="$STAGE"
export CYPRESS_ASSET_ENDPOINT=$(aws ssm get-parameter --name "/housing-tl/$STAGE/property-api-url" --query Parameter.Value --output text --profile "$PROFILE")
export CYPRESS_HOUSE_SEARCH_ENDPOINT=$(aws ssm get-parameter --name "/housing-tl/$STAGE/house-search-api-url" --query Parameter.Value --output text --profile "$PROFILE")
export CYPRESS_CONTACT_DETAILS_ENDPOINT=$(aws ssm get-parameter --name "/housing-tl/$STAGE/contact-details-api-url" --query Parameter.Value --output text --profile "$PROFILE")
export CYPRESS_EQUALITY_DETAILS_ENDPOINT=$(aws ssm get-parameter --name "/housing-tl/$STAGE/equality-information-api-url" --query Parameter.Value --output text --profile "$PROFILE")
export CYPRESS_PERSON_ENDPOINT=$(aws ssm get-parameter --name "/housing-tl/$STAGE/person-api-url" --query Parameter.Value --output text --profile "$PROFILE")
export CYPRESS_TENURE_ENDPOINT=$(aws ssm get-parameter --name "/housing-tl/$STAGE/tenure-api-url" --query Parameter.Value --output text --profile "$PROFILE")
export CYPRESS_CAUTIONARY_ALERT_ENDPOINT=$(aws ssm get-parameter --name "/housing-tl/$STAGE/cautionary-alerts-api-url" --query Parameter.Value --output text --profile "$PROFILE")
export CYPRESS_FEATURE_TOGGLE_ENDPOINT=$(aws ssm get-parameter --name "/housing-tl/$STAGE/configuration-api-url" --query Parameter.Value --output text --profile "$PROFILE")

# Set AWS credentials for Cypress DynamoDB tasks in the current terminal session
eval "$(aws configure export-credentials --profile "$PROFILE" --format env)" || {
  echo "Failed to export credentials"
  exit 1
}
export CYPRESS_AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export CYPRESS_AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export CYPRESS_AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN

echo "Cypress environment configured for stage: $STAGE"
echo "Set your auth token separately, e.g.:"
echo "  export CYPRESS_E2E_ACCESS_TOKEN_DEVELOPMENT='<<your hackney JWT>>'"
