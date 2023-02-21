export interface Practitioner {
  firstnames: string;
  lastname: string;
  education: string;
  id?: PractitionerId;
}

export interface EncryptedPractitioner extends Practitioner {
  data_key: string;
}

export type PractitionerId = number;
