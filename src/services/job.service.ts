import axios from "axios";
import { logger } from "../config";
import { Job, JobExecution } from "../models";
import { IJobExecutionProps, IJobProps } from "../types";
const Logger = logger("job.service");

export const saveJob = async (job: IJobProps) => {
  const LOGGER = Logger("saveJob");
  LOGGER.info(`Saving job ${JSON.stringify(job)}`);
  return await Job.create({ ...job });
};

export const executeJob = async (jobExecution: IJobExecutionProps) => {
  const LOGGER = Logger("executeJob");

  LOGGER.info(`Saving JobExecution ${JSON.stringify(jobExecution)}`);
  const JobExecutionResponse = await JobExecution.create({ ...jobExecution });
  LOGGER.info(
    `JobExecutionResponse is: ${JSON.stringify({ JobExecutionResponse })}`
  );

  // try {
  //   LOGGER.info(`Executing Job ${JSON.stringify(jobExecution)}`);
  //   const { data: res } = await axios(jobExecution.taskExecutionAPIConfig);

  //   LOGGER.info(`Request responded with ${res}`);
  // } catch (error) {
  //   // Stringifying an error could cause problems as we could get an error
  //   LOGGER.info(`Request responded with ${JSON.stringify(error)}`);
  // }
};
