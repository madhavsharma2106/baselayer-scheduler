import * as express from "express";
import { Request, Response } from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as xss from "xss-clean";
import { config, logger } from "./config";
import helmet from "helmet";
import httpStatus = require("http-status");
import { errorConverter, errorHandler, rateLimiter } from "./middlewares";
import { ApiError } from "./utils";
import { v1Routes } from "./routes/v1";

const Logger = logger("src/app.ts");

export const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(xss());
app.use(cors());
app.options("*", cors());
if (config.env === "production") app.use("/v1", rateLimiter);

app.get("/", (req: Request, res: Response) => {
  Logger("/").info("rnequest recieved");
  res.send("Coming soon. Eating treats right now.");
});

app.use("/v1", v1Routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
