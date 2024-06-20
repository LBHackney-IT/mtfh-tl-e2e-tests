#!/bin/bash

profile=$1

aws sso login --profile $profile
eval "$(aws configure export-credentials --profile $profile --format env)" || echo "Failed to export credentials"
export CYPRESS_AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export CYPRESS_AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export CYPRESS_AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN