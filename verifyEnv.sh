#!/bin/bash

# Print a masked preview of a variable value for verification output.
_preview_value() {
  local var="$1"
  local value="${!var}"

  case "$var" in
    *PASSWORD*|*SECRET*|*SESSION_TOKEN*|*ACCESS_TOKEN*)
      if [ -n "$value" ]; then
        echo "(set)"
      fi
      ;;
    CYPRESS_AWS_ACCESS_KEY_ID)
      if [ -n "$value" ]; then
        echo "${value:0:8}..."
      fi
      ;;
    CYPRESS_*_ENDPOINT)
      if [ -n "$value" ]; then
        if [ "${#value}" -gt 48 ]; then
          echo "${value:0:48}..."
        else
          echo "$value"
        fi
      fi
      ;;
    *)
      echo "$value"
      ;;
  esac
}

_cognito_flow_enabled() {
  local value
  value="$(echo "${CYPRESS_COGNITO_FLOW_ENABLED:-}" | xargs | tr '[:upper:]' '[:lower:]')"
  [ "$value" = "true" ]
}

_has_legacy_token() {
  case "${CYPRESS_ENVIRONMENT:-}" in
    development)
      [ -n "${CYPRESS_E2E_ACCESS_TOKEN_DEVELOPMENT:-}" ]
      ;;
    staging)
      [ -n "${CYPRESS_E2E_ACCESS_TOKEN_STAGING:-}" ]
      ;;
    production)
      [ -n "${CYPRESS_E2E_ACCESS_TOKEN_PRODUCTION:-}" ]
      ;;
    *)
      false
      ;;
  esac
}

verify_cypress_env() {
  local missing=0
  local var
  local preview
  local -a required_vars=(
    CYPRESS_ENVIRONMENT
    CYPRESS_E2E_BASE_URL
    CYPRESS_ASSET_ENDPOINT
    CYPRESS_HOUSE_SEARCH_ENDPOINT
    CYPRESS_CONTACT_DETAILS_ENDPOINT
    CYPRESS_EQUALITY_DETAILS_ENDPOINT
    CYPRESS_PERSON_ENDPOINT
    CYPRESS_TENURE_ENDPOINT
    CYPRESS_CAUTIONARY_ALERT_ENDPOINT
    CYPRESS_FEATURE_TOGGLE_ENDPOINT
    CYPRESS_AWS_ACCESS_KEY_ID
    CYPRESS_AWS_SECRET_ACCESS_KEY
    CYPRESS_AWS_SESSION_TOKEN
  )

  required_vars+=(CYPRESS_COGNITO_FLOW_ENABLED)

  if _cognito_flow_enabled; then
    required_vars+=(
      CYPRESS_AWS_REGION
      CYPRESS_E2E_CLIENT_ID
      CYPRESS_E2E_USERNAME
      CYPRESS_E2E_PASSWORD
    )
  fi

  echo ""
  echo "Verifying environment variables..."

  for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
      printf "MISSING  %-36s\n" "$var"
      missing=$((missing + 1))
    else
      preview=$(_preview_value "$var")
      printf "OK       %-36s %s\n" "$var" "$preview"
    fi
  done

  if [ -n "${CYPRESS_COGNITO_FLOW_ENABLED:-}" ] && ! _cognito_flow_enabled; then
    if _has_legacy_token; then
      printf "OK       %-36s %s\n" "legacy auth token" "(set)"
    else
      printf "MISSING  %-36s\n" "legacy auth token"
      echo "         Set CYPRESS_E2E_ACCESS_TOKEN_${CYPRESS_ENVIRONMENT^^}"
      missing=$((missing + 1))
    fi
  fi

  echo ""

  if [ "$missing" -gt 0 ]; then
    echo "$missing required variable(s) missing."
    echo "Re-run: source setEnv.sh <aws-sso-profile> ${CYPRESS_ENVIRONMENT:-development}"
    return 1
  fi

  echo "All required variables are set."
  return 0
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  verify_cypress_env
  exit $?
fi
