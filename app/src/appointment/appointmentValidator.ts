import { Appointment } from "./appointmentTypes";

const validateAppointment = (body: Appointment): body is Appointment => {
  if (typeof body !== "object") {
    return false;
  }

  const { id, firstnames, lastname, ssn, location, time, practitioner_id } =
    body;

  if (id && typeof id !== "number") {
    return false;
  }

  return (
    typeof firstnames === "string" &&
    typeof lastname === "string" &&
    typeof ssn === "string" &&
    typeof location === "string" &&
    typeof time === "string" &&
    typeof practitioner_id === "number"
  );
};

export { validateAppointment };
