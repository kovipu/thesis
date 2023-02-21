import crypto from "crypto";
import { KeyManagementServiceClient } from "@google-cloud/kms";
import {
  KMS_KEYRING,
  KMS_KEY,
  KEY_ENCRYPTION_KEY,
  CRYPTO_INIT_VECTOR,
} from "./config";

const kms = new KeyManagementServiceClient();

let keyEncryptionKey: Buffer;
const algorithm = "aes-256-cbc";
const initVector = Buffer.from(CRYPTO_INIT_VECTOR, "hex");

const decryptKeyEncryptionKey = async () => {
  const ciphertextBuffer = Buffer.from(KEY_ENCRYPTION_KEY, "base64");

  const keyName = kms.cryptoKeyPath("dippapoc", "global", KMS_KEYRING, KMS_KEY);

  const [decryptResponse] = await kms.decrypt({
    name: keyName,
    ciphertext: ciphertextBuffer,
  });

  const { plaintext } = decryptResponse;

  if (!plaintext) {
    throw new Error("Failed to decrypt.");
  }

  keyEncryptionKey = Buffer.from(plaintext);
};
decryptKeyEncryptionKey();

const generateDataKey = (): Buffer => {
  return crypto.randomBytes(32);
};

const encrypt = (key: Buffer, plaintext: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, initVector);

  let ciphertext = cipher.update(plaintext, "utf-8", "base64");
  ciphertext += cipher.final("base64");

  return ciphertext;
};

const decrypt = (key: Buffer, ciphertext: string) => {
  const decipher = crypto.createDecipheriv(algorithm, key, initVector);

  let plaintext = decipher.update(ciphertext, "base64", "utf-8");
  plaintext += decipher.final("utf-8");

  return plaintext;
};

const encryptDataKey = (dataKey: Buffer): string => {
  const dataKeyString = dataKey.toString("hex");
  return encrypt(keyEncryptionKey, dataKeyString);
};

const decryptDataKey = (dataKey: string): Buffer => {
  const dataKeyString = decrypt(keyEncryptionKey, dataKey);
  return Buffer.from(dataKeyString, "hex");
};

export { generateDataKey, encrypt, decrypt, encryptDataKey, decryptDataKey };
