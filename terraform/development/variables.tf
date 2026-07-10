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

variable "s3_backend_bucket" {
  description = "S3 bucket to store the terraform state"
  type        = string
  default     = "terraform-state-housing-development"
}
