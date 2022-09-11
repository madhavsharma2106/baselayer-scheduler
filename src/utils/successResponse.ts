import { HttpStatus } from "http-status";
import httpStatus = require("http-status");

export const successResponse = (data: any, statusCode?: HttpStatus) => {
  return {
    code: statusCode || httpStatus.OK,
    success: true,
    data,
  };
};
