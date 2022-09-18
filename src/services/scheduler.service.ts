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
    async (date: Date) => {
      const LOGGER = Logger("jobExecutionCallBack");

      LOGGER.info(`Execting job ${job.name} at ${date} `);
      const jobServiceResponse = await jobService.executeJob({
        job: job.name,
        status: "success",
        name: job.name,
        taskExecutionAPIConfig: job.taskExecutionAPIConfig,
      });
      LOGGER.info(
        `jobServiceResponse is ${JSON.stringify({ jobServiceResponse })}`
      );
    }
  );

  return nodeScheduleResponse;
};
