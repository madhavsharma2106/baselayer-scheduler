import { config } from ".";
import * as winston from "winston";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const _logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  defaultMeta: { service: config.appName },
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.printf(
      ({ level, message, timestamp, moduleName, functionName, service }) => {
        return `${timestamp} ${service} ${level}: [${moduleName}][${functionName}] ${message}`;
      }
    )
  ),
  transports: [new winston.transports.Console({})],
});

export const logger = function (moduleName) {
  return (functionName) => _logger.child({ moduleName, functionName });
};
