import db from "../db";
import {
  decrypt,
  decryptDataKey,
  encrypt,
  encryptDataKey,
  generateDataKey,
} from "../encryption";
import { EncryptedPractitioner, Practitioner } from "./practitionerTypes";

const insertPractitioner = async (practitioner: Practitioner) => {
  const encryptedPractitioner = await encryptPractitioner(practitioner);

  return db.none(
    `INSERT INTO "Practitioner"(firstnames, lastname, education, data_key)
      VALUES($(firstnames), $(lastname), $(education), $(data_key));`,
    encryptedPractitioner
  );
};

const getPractitioners = async (): Promise<Practitioner[]> => {
  const practitioners = await db.manyOrNone<EncryptedPractitioner>(
    'SELECT * FROM "Practitioner"'
  );

  return practitioners.map(decryptPractitioner);
};

const getPractitioner = async (id: number): Promise<Practitioner | null> => {
  const practitioner = await db.oneOrNone<EncryptedPractitioner>(
    'SELECT * FROM "Practitioner" WHERE id=$1;',
    id
  );

  if (!practitioner) {
    return null;
  }

  return decryptPractitioner(practitioner);
};

const encryptPractitioner = (
  practitioner: Practitioner
): EncryptedPractitioner => {
  const key = generateDataKey();

  // Encrypt personal data with the data key
  const firstnames = encrypt(key, practitioner.firstnames);
  const lastname = encrypt(key, practitioner.lastname);
  const education = encrypt(key, practitioner.education);

  // Wrap the data key with the key encryption key
  const data_key = encryptDataKey(key);

  return { firstnames, lastname, education, data_key };
};

const decryptPractitioner = (
  practitioner: EncryptedPractitioner
): Practitioner => {
  const { data_key, id } = practitioner;

  if (!data_key) {
    throw new Error("Decrypt: dataKey is missing in Practitioner");
  }

  // Decrypt the data key with the key encryption key
  const key = decryptDataKey(data_key);

  // Use the data key to decrypt rest of the fields
  const firstnames = decrypt(key, practitioner.firstnames);
  const lastname = decrypt(key, practitioner.lastname);
  const education = decrypt(key, practitioner.education);

  return { firstnames, lastname, education, id };
};

export { insertPractitioner, getPractitioners, getPractitioner };
