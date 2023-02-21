# Artifact registry

# Create an Artifact Registry for Docker images
resource "google_artifact_registry_repository" "docker_repository" {
  location      = "europe-north1"
  repository_id = var.id
  description   = var.description
  format        = "DOCKER"
}
