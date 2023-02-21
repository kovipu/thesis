# Cloud Key Management

# Create an encryption key in KMS to encrypt our KEK
resource "google_kms_key_ring" "keyring" {
  name     = var.keyring_name
  location = "global"
}

resource "google_kms_crypto_key" "key" {
  name            = var.key_name
  key_ring        = google_kms_key_ring.keyring.id
  rotation_period = "2592000s" # 30 days
}

data "google_project" "project" {}

# Allow the project's compute service account to access the key
resource "google_kms_crypto_key_iam_member" "kms_compute" {
  crypto_key_id = google_kms_crypto_key.key.id
  role          = "roles/cloudkms.cryptoKeyDecrypter"
  member = "serviceAccount:${
    data.google_project.project.number
  }-compute@developer.gserviceaccount.com"
}