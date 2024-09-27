#!/bin/bash

PROFILE=$1

# Check if profile is provided
if [ -z "$PROFILE" ]; then
  echo "Please provide an AWS SSO CLI profile name e.g: bash setEnv.sh housing-development"
  exit 1
fi

# login if token expired
if ! aws sts get-caller-identity --profile $PROFILE; then

  if ! aws sso login --profile $PROFILE; then
    echo "SSO login with profile $PROFILE failed"
    exit 1
  fi

fi

# Uncomment to fetch parameters and write to terminal for copying into cypress.env.json
# echo "ENVIRONMENT=development"
# echo "E2E_ACCESS_TOKEN_LOCAL=<<your hackney JWT>>"
# echo "E2E_ACCESS_TOKEN_DEV=<<your hackney JWT>>"
# echo "ASSET_ENDPOINT=$(aws ssm get-parameter --name /housing-tl/development/property-api-url --query Parameter.Value --output text --profile $PROFILE)"
# echo "HOUSE_SEARCH_ENDPOINT=$(aws ssm get-parameter --name /housing-tl/development/house-search-api-url --query Parameter.Value --output text --profile $PROFILE)"
# echo "CONTACT_DETAILS_ENDPOINT=$(aws ssm get-parameter --name /housing-tl/development/contact-details-api-url --query Parameter.Value --output text --profile $PROFILE)"
# echo "EQUALITY_DETAILS_ENDPOINT=$(aws ssm get-parameter --name /housing-tl/development/equality-information-api-url --query Parameter.Value --output text --profile $PROFILE)"
# echo "PERSON_ENDPOINT=$(aws ssm get-parameter --name /housing-tl/development/person-api-url --query Parameter.Value --output text --profile $PROFILE)"
# echo "TENURE_ENDPOINT=$(aws ssm get-parameter --name /housing-tl/development/tenure-api-url --query Parameter.Value --output text --profile $PROFILE)"
# echo "CAUTIONARY_ALERT_ENDPOINT=$(aws ssm get-parameter --name /housing-tl/development/cautionary-alerts-api-url --query Parameter.Value --output text --profile $PROFILE)"
# echo "FEATURE_TOGGLE_ENDPOINT=$(aws ssm get-parameter --name /housing-tl/development/configuration-api-url --query Parameter.Value --output text --profile $PROFILE)"

# Set AWS credentials for Cypress in the current terminal session
eval "$(aws configure export-credentials --profile $PROFILE --format env)" || echo "Failed to export credentials"
export CYPRESS_AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export CYPRESS_AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export CYPRESS_AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN

echo "AWS credentials for Cypress have been set in this terminal session"