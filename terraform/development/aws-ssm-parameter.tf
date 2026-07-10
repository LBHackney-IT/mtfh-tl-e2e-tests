locals {
  e2e_credentials = jsondecode(
    data.aws_secretsmanager_secret_version.e2e_credentials_value.secret_string
  )
}

data "aws_secretsmanager_secret" "e2e_credentials" {
  provider = aws.developmentapis
  name     = "/hackney-google-auth-service/mfe-e2e-pipeline-credentials"
}

data "aws_secretsmanager_secret_version" "e2e_credentials_value" {
  provider  = aws.developmentapis
  secret_id = data.aws_secretsmanager_secret.e2e_credentials.id
}

resource "aws_ssm_parameter" "e2e_client_id" {
  provider = aws.housing-development
  name     = "/housing-tl/development/e2e-cognito-client-id"
  type     = "SecureString"
  value    = local.e2e_credentials.client_id
}
