import dotenv from "dotenv";

dotenv.config();

const required = (key: string) => {
  const env = process.env[key];
  if (!env) {
    throw Error(`Environment variable required: ${key}`);
  }
  return env;
};

const PGHOST = required("PGHOST");
const PGPORT = required("PGPORT");
const PGDATABASE = required("PGDATABASE");
const PGUSER = required("PGUSER");
const PGPASSWORD = required("PGPASSWORD");
const KMS_KEYRING = required("KMS_KEYRING");
const KMS_KEY = required("KMS_KEY");
const KEY_ENCRYPTION_KEY = required("KEY_ENCRYPTION_KEY");
const CRYPTO_INIT_VECTOR = required("CRYPTO_INIT_VECTOR");

export {
  PGHOST,
  PGPORT,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  KMS_KEYRING,
  KMS_KEY,
  KEY_ENCRYPTION_KEY,
  CRYPTO_INIT_VECTOR,
};
