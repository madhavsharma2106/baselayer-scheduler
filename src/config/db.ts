import mongoose from "mongoose";
import { config } from ".";

const connect = () =>
  mongoose.connect(config.mongoose.url, config.mongoose.options as any);

export const db = {
  connect,
};
