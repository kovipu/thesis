CREATE TABLE IF NOT EXISTS "Practitioner" (
  id SERIAL PRIMARY KEY,
  firstnames TEXT NOT NULL,
  lastname TEXT NOT NULL,
  education TEXT NOT NULL,
  data_key TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "PatientAppointment" (
  id SERIAL PRIMARY KEY,
  firstnames TEXT NOT NULL,
  lastname TEXT NOT NULL,
  ssn TEXT NOT NULL,
  location TEXT NOT NULL,
  time TIMESTAMP NOT NULL,
  practitioner_id SERIAL NOT NULL,
  data_key TEXT NOT NULL,
  CONSTRAINT fk_practitioner_id FOREIGN KEY(practitioner_id) REFERENCES "Practitioner"(id)
);
