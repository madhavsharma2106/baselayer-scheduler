import { Model, Schema, model, Document } from "mongoose";
const { toJSON, paginate } = require("./plugins");
import * as _ from "lodash";
import { IJobProps } from "../types";

export interface IJob extends Document, IJobProps {
  createdAt?: Date;
  updatedAt?: Date;
}

interface IJobModel extends Model<IJob> {}

const schema = new Schema<IJob>(
  {
    name: { type: String, index: true, required: true },
    schedule: { type: Object, required: true },
    taskExecutionAPIConfig: { type: Object, required: true },
  },
  { timestamps: true }
);

schema.plugin(toJSON);
schema.plugin(paginate);

export const Job: IJobModel = model<IJob, IJobModel>("Job", schema);
