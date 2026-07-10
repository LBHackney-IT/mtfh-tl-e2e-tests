locals {
  e2e_credentials = jsondecode(
    data.aws_secretsmanager_secret_version.e2e_credentials_value.secret_string
  )
}

data "aws_secretsmanager_secret" "e2e_credentials" {
  provider = aws.apis
  name     = "/hackney-google-auth-service/mfe-e2e-pipeline-credentials"
}

data "aws_secretsmanager_secret_version" "e2e_credentials_value" {
  provider  = aws.apis
  secret_id = data.aws_secretsmanager_secret.e2e_credentials.id
}

resource "aws_ssm_parameter" "e2e_client_id" {
  provider = aws.housing
  name     = "/housing-tl/${var.environment}/e2e-cognito-client-id"
  type     = "String"
  value    = local.e2e_credentials.client_id
}

resource "aws_ssm_parameter" "e2e_username" {
  provider = aws.housing
  name     = "/housing-tl/${var.environment}/e2e-cognito-username"
  type     = "String"
  value    = local.e2e_credentials.email
}

resource "aws_ssm_parameter" "e2e_password" {
  provider = aws.housing
  name     = "/housing-tl/${var.environment}/e2e-cognito-password"
  type     = "SecureString"
  value    = local.e2e_credentials.password
}

