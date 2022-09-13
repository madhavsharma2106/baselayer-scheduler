import * as schedule from "node-schedule";
import { jobService } from ".";
import { logger } from "../config";
import { IJobProps } from "../types";
const Logger = logger("scheduler.service");

export const scheduleJob = (job: IJobProps) => {
  const LOGGER = Logger("scheduleJob");
  LOGGER.info(`Creating a job with data: ${JSON.stringify(job)}`);

  const nodeScheduleResponse: schedule.Job = schedule.scheduleJob(
    job.name,
    job.schedule,
    function (date: Date) {
      LOGGER.info(`Execting job ${job.name} at ${date} `);
      jobService.saveJobExecution({
        job: job.name,
        status: "success",
        name: job.name,
      });
    }
  );

  return nodeScheduleResponse;
};
