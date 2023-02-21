# Warning: don't store secrets like I do.
# I recommend Secret Manager without writing the secrets to Terraform state.
locals {
  db_name     = "dippapoc-db"
  db_database = "dippapoc"
  db_user     = "dbadmin"
  db_password = "kissa123"

  crypto_init_vector = "<secret>"
  key_encryption_key = "<secret>"
}

module "secret_db_password" {
  source = "./modules/secret"

  id    = "db_password"
  value = local.db_password
}

module "secret_crypto_init_vector" {
  source = "./modules/secret"

  id    = "crypto_init_vector"
  value = local.crypto_init_vector
}

module "secret_key_encryption_key" {
  source = "./modules/secret"

  id    = "key_encryption_key"
  value = local.key_encryption_key
}

# Run the Express app in Cloud Run
module "dippapoc-server" {
  source = "./modules/cloud-run"

  name               = "dippapoc-server"
  docker_image       = "europe-north1-docker.pkg.dev/dippapoc/dippapoc-docker-registry/app:1.0"
  cloudsql_instances = module.dippapoc-db.connection_name

  # environment variables
  pghost      = "/cloudsql/${module.dippapoc-db.connection_name}"
  pgport      = 5432
  pgdatabase  = local.db_database
  pguser      = local.db_user
  kms_keyring = module.encryption-key.keyring_name
  kms_key     = module.encryption-key.key_name

  # Secret Manager id's for our secrets
  secret_id_pgpassword         = module.secret_db_password.secret_id
  secret_id_crypto_init_vector = module.secret_crypto_init_vector.secret_id
  secret_id_key_encryption_key = module.secret_key_encryption_key.secret_id
}

output "server_url" {
  value = module.dippapoc-server.service_url
}

# Set up a PostgreSQL database for the application
module "dippapoc-db" {
  source = "./modules/cloud-sql"

  name     = local.db_name
  database = local.db_database
  user     = local.db_user
  password = local.db_password
}

# Set up an Artifact Registry for holding Docker images
module "docker-repository" {
  source = "./modules/artifact-registry"

  id          = "dippapoc-docker-registry"
  description = "Repository for storing Dippapoc Docker images."
}

# Create a symmetric encryption key in Cloud Key Management
module "encryption-key" {
  source = "./modules/key-management"

  keyring_name = "dippapoc-keyring"
  key_name     = "dippapoc-key"
}
