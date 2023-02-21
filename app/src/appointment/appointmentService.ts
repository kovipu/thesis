import db from "../db";
import {
  decrypt,
  decryptDataKey,
  encrypt,
  encryptDataKey,
  generateDataKey,
} from "../encryption";
import { Appointment, EncryptedAppointment } from "./appointmentTypes";

const insertNewAppointment = (appointment: Appointment): Promise<null> => {
  const encryptedAppointment = encryptAppointment(appointment);

  return db.none(
    `INSERT INTO "PatientAppointment"(firstnames, lastname, ssn, location, time, practitioner_id, data_key)
      VALUES($(firstnames), $(lastname), $(ssn), $(location), $(time), $(practitioner_id), $(data_key));`,
    encryptedAppointment
  );
};

const getAppointments = async (): Promise<Appointment[]> => {
  const appointments = await db.manyOrNone<EncryptedAppointment>(
    'SELECT * FROM "PatientAppointment";'
  );

  return appointments.map(decryptAppointment);
};

const encryptAppointment = (appointment: Appointment): EncryptedAppointment => {
  const key = generateDataKey();

  // Encrypt personal data with the data key
  const firstnames = encrypt(key, appointment.firstnames);
  const lastname = encrypt(key, appointment.lastname);
  const ssn = encrypt(key, appointment.ssn);
  const location = encrypt(key, appointment.location);

  // Wrap the data key with the key encryption key
  const data_key = encryptDataKey(key);

  return {
    ...appointment,
    firstnames,
    lastname,
    ssn,
    location,
    data_key,
  };
};

const decryptAppointment = (appointment: EncryptedAppointment): Appointment => {
  const { id, time, practitioner_id, data_key } = appointment;

  if (!data_key) {
    throw new Error("Decrypt: dataKey is missing in Appointment");
  }

  // Decrypt the data key with the key encryption key
  const key = decryptDataKey(data_key);

  // Decrypt encrypted fields with the data key
  const firstnames = decrypt(key, appointment.firstnames);
  const lastname = decrypt(key, appointment.lastname);
  const ssn = decrypt(key, appointment.ssn);
  const location = decrypt(key, appointment.location);

  return {
    id,
    time,
    practitioner_id,
    firstnames,
    lastname,
    ssn,
    location,
  };
};

export { insertNewAppointment, getAppointments };
