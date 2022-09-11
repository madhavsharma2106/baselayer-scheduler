import httpStatus = require("http-status");
import { config, logger } from "../config";
import { ApiError } from "../utils";
const Logger = logger("middlewares/error.ts");

export const errorConverter = (err, req, res, next) => {
  let error = err;
  Logger("errorConverter").error(JSON.stringify(err));

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    success: false,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    Logger("errorHandler").error(err);
  }

  res.status(statusCode).send(response);
};
