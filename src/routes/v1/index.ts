import { Router } from "express";
import { jobRoutes } from "./job.route";

export const v1Routes = Router();

v1Routes.use("/jobs", jobRoutes);
