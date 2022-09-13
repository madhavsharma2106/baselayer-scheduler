import { AxiosRequestConfig } from "axios";
import {
  RecurrenceRule,
  RecurrenceSpecDateRange,
  RecurrenceSpecObjLit,
} from "node-schedule";

export interface IJobProps {
  name: string;
  schedule:
    | RecurrenceRule
    | RecurrenceSpecDateRange
    | RecurrenceSpecObjLit
    | Date
    | string
    | number;
  requestOptions: AxiosRequestConfig;
  isRecurring: boolean;
}

export interface IJobExecutionProps {
  name: string;
  status: "success" | "failed";
  job: string;
}
