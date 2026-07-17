provider "aws" {
  alias   = "housing"
  region  = var.aws_region
  profile = var.housing_aws_profile
}

provider "aws" {
  alias   = "apis"
  region  = var.aws_region
  profile = var.apis_aws_profile
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket  = "terraform-state-housing-production"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/t-and-l-e2e-tests/state"
  }
}
