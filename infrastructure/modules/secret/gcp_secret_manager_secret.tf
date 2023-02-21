# Secret Manager secret

# Create a secret
resource "google_secret_manager_secret" "secret" {
  secret_id = var.id

  replication {
    automatic = true
  }
}

# Attaches secret data for the secret
resource "google_secret_manager_secret_version" "secret_data" {
  secret      = google_secret_manager_secret.secret.id
  secret_data = var.value # Stores secret as a plain txt in state
}

data "google_project" "project" {}

# Allow the project's compute service account to access the secret
resource "google_secret_manager_secret_iam_member" "secretaccess_compute" {
  secret_id = google_secret_manager_secret.secret.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${
    data.google_project.project.number
  }-compute@developer.gserviceaccount.com"
}
