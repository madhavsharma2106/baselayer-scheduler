import { Request, Response } from "express";
import { logger } from "../config";
import { jobService, schedulerService } from "../services";
import { catchAsync, successResponse } from "../utils";

const Logger = logger("job.controller");

export const createJob = catchAsync(async (req: Request, res: Response) => {
  const LOGGER = Logger("createJob");
  LOGGER.info(
    `received req with body ${JSON.stringify(
      req.body
    )} and query ${JSON.stringify(req.query)} and params ${JSON.stringify(
      req.params
    )}`
  );

  // Save job
  const jobServiceResponse = await jobService.saveJob(req.body);
  LOGGER.info(`jobService responded with ${jobServiceResponse}`);

  // Schedule Job
  schedulerService.scheduleJob(req.body);

  res.send(successResponse(jobServiceResponse));
});
