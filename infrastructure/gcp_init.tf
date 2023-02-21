terraform {
  required_version = ">= 1.3.3"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.41.0"
    }
  }
}

provider "google" {
  credentials = file("gcp-key.json")

  project = "dippapoc"
  region  = "europe-north1"
  zone    = "europe-north1-c"
}

# Enable the APIs we need.

resource "google_project_service" "kms_api" {
  service            = "cloudkms.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "cloud_sql_api" {
  service            = "sqladmin.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "run_api" {
  service            = "run.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "artifact_registry_api" {
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "secretmanager_api" {
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}