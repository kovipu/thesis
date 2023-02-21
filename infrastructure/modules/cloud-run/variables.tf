variable "name" {
  description = "Name of the Cloud Run service."
  type        = string
}

variable "docker_image" {
  description = "Docker container image for Cloud Run."
  type        = string
}

variable "cloudsql_instances" {
  description = "The Cloud SQL connection_name to connect from Cloud Run"
  type        = string
}

variable "pghost" {
  description = "Hostname for the PG database."
  type        = string
}

variable "pgport" {
  description = "Port for the PG database."
  type        = number
}

variable "pgdatabase" {
  description = "Name of the database"
  type        = string
}

variable "pguser" {
  description = "Username to connect to the database"
  type        = string
}

variable "kms_keyring" {
  description = "The KMS keyring to use for decrypting the KEK"
  type        = string
}

variable "kms_key" {
  description = "The KMS key to use for decrypting the KEK"
  type        = string
}

variable "secret_id_pgpassword" {
  description = "Secret id of the password to connect to the database"
  type        = string
  sensitive   = true
}

variable "secret_id_crypto_init_vector" {
  description = "Secret id of the crypto init vector for AES-256 encryption."
  type        = string
  sensitive   = true
}

variable "secret_id_key_encryption_key" {
  description = "Secret id of the key encryption key for the AES-256, encrypted via KMS."
  type        = string
  sensitive   = true
}