import { Router } from "express";
import { jobController } from "../../contollers";

export const jobRoutes = Router();

jobRoutes.route("/").post(jobController.createJob);
