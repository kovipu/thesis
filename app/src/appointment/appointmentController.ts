import { Router } from "express";

import { getPractitioner } from "../practitioner/practitionerService";
import { getAppointments, insertNewAppointment } from "./appointmentService";
import { Appointment } from "./appointmentTypes";
import { validateAppointment } from "./appointmentValidator";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const appointments = await getAppointments();
    res.status(200).send(appointments);
  } catch (err) {
    console.error("Error getting appointments", err);
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  const appointment: Appointment = req.body;

  if (!validateAppointment(appointment)) {
    return res.status(400).send("Invalid request body");
  }

  // Check the practitioner exists.
  const practitioner = await getPractitioner(appointment.practitioner_id);
  if (practitioner === null) {
    return res.status(400).send("Practitioner does not exist.");
  }

  try {
    await insertNewAppointment(appointment);
    console.log("Successfully inserted new appointment.");
    res.status(200).send();
  } catch (err) {
    console.error("Error inserting appointment:", err);
    res.status(500).send();
  }
});

export default router;
