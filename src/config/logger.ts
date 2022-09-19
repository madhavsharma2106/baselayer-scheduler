const os = require("os");
import { config } from ".";
import * as winston from "winston";
require("winston-syslog");

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// @ts-ignore next-line
const papertrail = new winston.transports.Syslog({
  host: "logs2.papertrailapp.com",
  port: 12106,
  protocol: "tls4",
  localhost: os.hostname(),
  eol: "\n",
});

const transports = [];
if (config.env === "development")
  transports.push(new winston.transports.Console({}));
if (config.env === "production") transports.push(papertrail);

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
  transports: transports, // TODO: Update to run PT on prod later.
});

export const logger = function (moduleName) {
  return (functionName) => _logger.child({ moduleName, functionName });
};
