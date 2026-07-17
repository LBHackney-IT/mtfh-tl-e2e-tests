#!/usr/bin/env bash
#
# Shared Cypress env loader from housing Parameter Store.
# Used by setEnv.sh (local) and CircleCI so the SSM → CYPRESS_* mapping
# cannot drift between environments.
#
# Usage (must be sourced):
#   source loadCypressEnvFromSsm.sh <stage> [aws-profile]
#
#   stage        e.g. development | staging | production
#   aws-profile  optional; omit in CI to use the default credential chain
#
# To add a variable: append one line to CYPRESS_SSM_MAPPINGS below
# (ssm-parameter-name|CYPRESS_ENV_VAR|decrypt?).

# ssm-name|CYPRESS_VAR|optional "decrypt"
CYPRESS_SSM_MAPPINGS=(
  "e2e-base-url|CYPRESS_E2E_BASE_URL|"
  "e2e-cognito-flow-enabled|CYPRESS_COGNITO_FLOW_ENABLED|"
  "property-api-url|CYPRESS_ASSET_ENDPOINT|"
  "house-search-api-url|CYPRESS_HOUSE_SEARCH_ENDPOINT|"
  "contact-details-api-url|CYPRESS_CONTACT_DETAILS_ENDPOINT|"
  "equality-information-api-url|CYPRESS_EQUALITY_DETAILS_ENDPOINT|"
  "person-api-url|CYPRESS_PERSON_ENDPOINT|"
  "tenure-api-url|CYPRESS_TENURE_ENDPOINT|"
  "cautionary-alerts-api-url|CYPRESS_CAUTIONARY_ALERT_ENDPOINT|"
  "configuration-api-url|CYPRESS_FEATURE_TOGGLE_ENDPOINT|"
  "e2e-cognito-client-id|CYPRESS_E2E_CLIENT_ID|"
  "e2e-cognito-username|CYPRESS_E2E_USERNAME|"
  "e2e-cognito-password|CYPRESS_E2E_PASSWORD|decrypt"
)

load_cypress_env_from_ssm() {
  local stage="$1"
  local profile="${2:-}"
  local aws_profile_args=()
  local entry param var flags value

  if [ -z "$stage" ]; then
    echo "Usage: load_cypress_env_from_ssm <stage> [aws-profile]" >&2
    return 1
  fi

  if [ -n "$profile" ]; then
    aws_profile_args=(--profile "$profile")
  fi

  _ssm_get() {
    local name="$1"
    shift
    aws ssm get-parameter \
      --name "/housing-tl/${stage}/${name}" \
      --query Parameter.Value \
      --output text \
      "${aws_profile_args[@]}" \
      "$@"
  }

  export CYPRESS_ENVIRONMENT="$stage"
  export CYPRESS_AWS_REGION="eu-west-2"
  # Prefer CYPRESS_E2E_BASE_URL over reserved CYPRESS_BASE_URL (maps to
  # config.baseUrl, not config.env, and causes silent mis-reads).
  unset CYPRESS_BASE_URL

  for entry in "${CYPRESS_SSM_MAPPINGS[@]}"; do
    IFS='|' read -r param var flags <<< "$entry"
    if [ "$flags" = "decrypt" ]; then
      if ! value=$(_ssm_get "$param" --with-decryption); then
        echo "Failed to load SSM parameter: /housing-tl/${stage}/${param}" >&2
        return 1
      fi
    else
      if ! value=$(_ssm_get "$param"); then
        echo "Failed to load SSM parameter: /housing-tl/${stage}/${param}" >&2
        return 1
      fi
    fi
    printf -v "$var" '%s' "$value"
    export "$var"
  done

  echo "Loaded Cypress env from SSM for stage: ${stage}"
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "Source this script instead of executing it:" >&2
  echo "  source loadCypressEnvFromSsm.sh <stage> [aws-profile]" >&2
  exit 1
fi

if [ "$#" -ge 1 ]; then
  load_cypress_env_from_ssm "$@"
fi
