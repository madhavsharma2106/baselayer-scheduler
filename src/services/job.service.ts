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
    `JobExecution.create response is: ${JSON.stringify({
      JobExecutionResponse,
    })}`
  );

  try {
    LOGGER.info(`Executing Job ${JSON.stringify(jobExecution)}`);
    const { data: jobExecutionAPIResponse } = await axios(
      jobExecution.taskExecutionAPIConfig
    );
    LOGGER.info(
      `Request responded with ${JSON.stringify(jobExecutionAPIResponse)}`
    );

    // Save response against job Exectution
    const JobExecutionResponse1 = await JobExecution.findByIdAndUpdate(
      JobExecutionResponse.id,
      { executionResponse: jobExecutionAPIResponse }
    );
    LOGGER.info(
      `JobExecution.findByIdAndUpdate responded with ${JSON.stringify(
        JobExecutionResponse1
      )}`
    );
  } catch (error) {
    // Stringifying an error could cause problems as we could get an error
    LOGGER.info(`Request responded with ${JSON.stringify(error)}`);
  }
};
