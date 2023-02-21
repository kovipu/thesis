output "keyring_name" {
  value = google_kms_key_ring.keyring.name
}

output "key_name" {
  value = google_kms_crypto_key.key.name
}