import * as schedule from "node-schedule";
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
      LOGGER.info(`Exectued job ${job.name} at ${date} `);
    }
  );

  return nodeScheduleResponse;
};
