import { Request, Response } from "express";
import { logger } from "../config";
import { Job, JobExecution } from "../models";
import { successResponse } from "../utils";
const Logger = logger("playground.controller");

export const deleteDataFromTable = (req: Request, res: Response) => {
  const LOGGER = Logger("deleteDataFromTable");
  LOGGER.info(`Request received with query ${JSON.stringify(req.query)}`);
  const { tableName } = req.query;

  switch (tableName) {
    case "job":
      Job.deleteMany({}, {}, console.log);
      res.send(successResponse(`successfully deleted data in jobs`));
      break;
    case "jobExecution":
      JobExecution.deleteMany({}, {}, console.log);
      res.send(successResponse(`successfully deleted data in jobs`));
      break;
    case "all":
      JobExecution.deleteMany({}, {}, console.log);
      Job.deleteMany({}, {}, console.log);
      res.send(successResponse(`successfully deleted data in all tables`));
      break;
    default:
      break;
  }
};
