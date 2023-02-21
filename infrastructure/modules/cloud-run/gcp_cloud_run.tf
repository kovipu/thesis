# Cloud Run

# Create the Cloud Run service
resource "google_cloud_run_service" "run_service" {
  name     = var.name
  location = "europe-north1"

  template {
    spec {
      containers {
        image = var.docker_image

        env {
          name  = "PGHOST"
          value = var.pghost
        }
        env {
          name  = "PGPORT"
          value = var.pgport
        }
        env {
          name  = "PGDATABASE"
          value = var.pgdatabase
        }
        env {
          name  = "PGUSER"
          value = var.pguser
        }
        env {
          name = "PGPASSWORD"
          value_from {
            secret_key_ref {
              name = var.secret_id_pgpassword
              key  = "latest"
            }
          }
        }
        env {
          name = "CRYPTO_INIT_VECTOR"
          value_from {
            secret_key_ref {
              name = var.secret_id_crypto_init_vector
              key  = "latest"
            }
          }
        }
        env {
          name = "KEY_ENCRYPTION_KEY"
          value_from {
            secret_key_ref {
              name = var.secret_id_key_encryption_key
              key  = "latest"
            }
          }
        }
        env {
          name  = "KMS_KEYRING"
          value = var.kms_keyring
        }
        env {
          name  = "KMS_KEY"
          value = var.kms_key
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "1"
        "run.googleapis.com/cloudsql-instances" = var.cloudsql_instances
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Allow unauthenticated users to invoke the service
resource "google_cloud_run_service_iam_member" "run_all_users" {
  service  = google_cloud_run_service.run_service.name
  location = google_cloud_run_service.run_service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
