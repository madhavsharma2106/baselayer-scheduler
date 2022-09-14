import { Router } from "express";
import { playgroundController } from "../../contollers";

export const playgroundRoutes = Router();

playgroundRoutes
  .route("/delete")
  .delete(playgroundController.deleteDataFromTable);
