variable "environment" {
  description = "The environment to deploy the terraform configuration to"
  type        = string
  default     = "development"
}

variable "apis_aws_profile" {
  description = "AWS profile name for APIs account. Must much CircleCi configuration."
  type        = string
  default     = "apis"
}

variable "housing_aws_profile" {
  description = "AWS profile name for Housing account. Must much CircleCi configuration."
  type        = string
  default     = "default"
}

variable "aws_region" {
  description = "AWS region to deploy the terraform configuration to"
  type        = string
  default     = "eu-west-2"
}

variable "e2e_cognito_flow_enabled" {
  description = "Whether the Cognito flow is enabled for the environment. Falls back to legacy flow if set to false"
  type        = bool
  default     = false
}

variable "e2e_base_url" {
  description = "Manage My Home base URL for Cypress e2e tests (CYPRESS_BASE_URL)"
  type        = string
  default     = "https://manage-my-home-development.hackney.gov.uk"
}
