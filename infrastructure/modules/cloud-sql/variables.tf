variable "name" {
  description = "Name of the database instance"
  type        = string
}

variable "database" {
  description = "Name of the database"
  type        = string
}

variable "user" {
  description = "Username for the database user"
  type        = string
}

variable "password" {
  description = "Password for the database user"
  type        = string
  sensitive   = true
}
