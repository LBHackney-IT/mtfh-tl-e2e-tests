provider "aws" {
  alias   = "housing-development"
  region  = "eu-west-2"
  profile = "default"
}

provider "aws" {
  alias   = "developmentapis"
  region  = "eu-west-2"
  profile = "developmentapis"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket  = "terraform-state-housing-development"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/t-and-l-e2e-tests/state"
  }
}
