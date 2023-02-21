output "public_ip_address" {
  value = google_sql_database_instance.database_instance.public_ip_address
}

output "connection_name" {
  value = google_sql_database_instance.database_instance.connection_name
}