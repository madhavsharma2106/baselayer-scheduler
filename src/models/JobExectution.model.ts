import { Model, Schema, model, Document } from "mongoose";
const { toJSON, paginate } = require("./plugins");
import * as _ from "lodash";
import { IJobExecutionProps } from "../types";

export interface IJobExecution extends Document, IJobExecutionProps {
  createdAt?: Date;
  updatedAt?: Date;
}

interface IJobExecutionModel extends Model<IJobExecution> {}

const schema = new Schema<IJobExecution>(
  {
    name: { type: String, index: true, required: true },
    status: { type: String, required: true },
    job: { type: String, required: true },
  },
  { timestamps: true }
);

schema.plugin(toJSON);
schema.plugin(paginate);

export const JobExecution: IJobExecutionModel = model<
  IJobExecution,
  IJobExecutionModel
>("JobExecution", schema);
