import { Router } from "express";
import { jobRoutes } from "./job.route";
import { playgroundRoutes } from "./playground.route";

export const v1Routes = Router();

v1Routes.use("/jobs", jobRoutes);
v1Routes.use("/playground", playgroundRoutes);
