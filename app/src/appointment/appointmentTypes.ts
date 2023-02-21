import { PractitionerId } from "../practitioner/practitionerTypes";

export interface Appointment {
  firstnames: string;
  lastname: string;
  ssn: string;
  location: string;
  time: string;
  practitioner_id: PractitionerId;
  id?: number;
}

export interface EncryptedAppointment extends Appointment {
  data_key: string;
}
