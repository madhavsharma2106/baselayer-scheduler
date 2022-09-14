import { Router } from "express";
import { jobController } from "../../contollers";
import { validate } from "../../middlewares";
import { jobValidations } from "../../validations";

export const jobRoutes = Router();

jobRoutes
  .route("/")
  .post(validate(jobValidations.createJob), jobController.createJob);
