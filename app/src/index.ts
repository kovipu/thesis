import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import practitioners from "./practitioner/practitionerController";
import appointments from "./appointment/appointmentController";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hei maailma!");
});

app.use("/practitioners", practitioners);

app.use("/appointments", appointments);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
