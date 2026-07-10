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
    bucket  = var.s3_backend_bucket
    encrypt = true
    region  = var.aws_region
    key     = "services/t-and-l-e2e-tests/state"
  }
}
