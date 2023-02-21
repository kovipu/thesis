import { Router } from "express";

import { getPractitioners, insertPractitioner } from "./practitionerService";
import { Practitioner } from "./practitionerTypes";
import { validatePractitioner } from "./practitionerValidator";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const practitioners = await getPractitioners();
    res.status(200).send(practitioners);
  } catch (err) {
    console.error("Error finding practitioners", err);
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  const practitioner: Practitioner = req.body;

  if (!validatePractitioner(practitioner)) {
    return res.status(400).send("Invalid request body");
  }

  try {
    await insertPractitioner(practitioner);
    console.log("Successfully inserted practitioner.");
    res.status(200).send();
  } catch (err) {
    console.error("Error inserting practitioner:", err);
    res.status(500).send();
  }
});

export default router;
