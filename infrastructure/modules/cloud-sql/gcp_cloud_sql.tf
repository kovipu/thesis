# Cloud SQL

# Fire up a database instance
resource "google_sql_database_instance" "database_instance" {
  name             = var.name
  database_version = "POSTGRES_14"
  region           = "europe-north1"

  settings {
    tier = "db-g1-small"
  }
}

# Create a database in the instance
resource "google_sql_database" "database" {
  name     = var.database
  instance = google_sql_database_instance.database_instance.name

  # Run init.sql script on the new database instance
  provisioner "local-exec" {
    command = <<-EOT
      gcloud sql instances patch ${var.name} --authorized-networks=`curl checkip.amazonaws.com`
      PGPASSWORD=${var.password} psql -f ../app/sql/init.sql -h ${google_sql_database_instance.database_instance.public_ip_address} -U ${var.user} ${var.database}
      gcloud sql instances patch ${var.name} --clear-authorized-networks
    EOT
  }
}

# Create a user for the db
resource "google_sql_user" "db_user" {
  name     = var.user
  password = var.password
  instance = google_sql_database_instance.database_instance.name
}
