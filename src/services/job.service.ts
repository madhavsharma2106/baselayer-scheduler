import { logger } from "../config";
import { Job } from "../models";
import { IJobProps } from "../types";
const Logger = logger("job.service");

export const saveJob = async (job: IJobProps) => {
  const LOGGER = Logger("saveJob");
  LOGGER.info(`Saving job ${JSON.stringify(job)}`);
  return await Job.create({ ...job });
};
