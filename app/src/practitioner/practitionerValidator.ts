import { Practitioner } from "./practitionerTypes";

const validatePractitioner = (body: Practitioner): body is Practitioner => {
  if (typeof body !== "object") {
    return false;
  }

  const { id, firstnames, lastname, education } = body;

  if (id && typeof id !== "number") {
    return false;
  }

  return (
    typeof firstnames === "string" &&
    typeof lastname === "string" &&
    typeof education === "string"
  );
};

export { validatePractitioner };
