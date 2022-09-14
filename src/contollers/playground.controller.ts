import { Request, Response } from "express";
import { logger } from "../config";
import { Job, JobExecution } from "../models";
import { successResponse } from "../utils";
const Logger = logger("playground.controller");

export const deleteDataFromTable = async (req: Request, res: Response) => {
  const LOGGER = Logger("deleteDataFromTable");
  LOGGER.info(`Request received with query ${JSON.stringify(req.query)}`);
  const { tableName } = req.query;

  switch (tableName) {
    case "job": {
      console.log("job");
      await Job.deleteMany({}, {}, console.log);
      break;
    }
    case "jobExecution": {
      console.log("jobExecution");

      await JobExecution.deleteMany({}, {}, console.log);
      break;
    }
    case "all": {
      console.log("all");
      await Job.deleteMany({}, {}, console.log);
      await JobExecution.deleteMany({}, {}, console.log);
      break;
    }
  }

  return res.send(successResponse(`successfully deleted data in jobs`));
};
