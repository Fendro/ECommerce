import appConfig from "../configs/appConfig";
import requestHandler from "./requestHandler";
import {
  BadRequest,
  FailedDependency,
  ForbiddenRequest,
  NotFound,
  ServiceError,
  Unauthorized,
} from "../models";
import { BSONError } from "bson";
import { MongoError } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types";
import { outgoingResponse } from "./logger";

/**
 * Custom error handling middleware which sends responses
 * associated to the errors caught. Stops the server on
 * untrusted errors.
 * @param error
 * @param req
 * @param res
 * @param next
 * @constructor
 */
export const ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    error instanceof BadRequest ||
    error instanceof ForbiddenRequest ||
    error instanceof FailedDependency ||
    error instanceof NotFound ||
    error instanceof ServiceError ||
    error instanceof Unauthorized
  ) {
    outgoingResponse(req, error.response);
    return requestHandler.sendError(res, error.status, error.response);
  }
  if (error instanceof BSONError) {
    const response: ResponseData = {
      message: "Invalid data format.",
      success: false,
    };
    if (appConfig.env === "development") {
      response.dev = {
        error: error,
        stack: error.stack,
      };
    }
    outgoingResponse(req, response);
    return requestHandler.sendError(res, 503, response);
  }
  if (error instanceof MongoError) {
    console.error(error);
    const response: ResponseData = {
      message: "Database error.",
      success: false,
    };
    if (appConfig.env === "development") {
      response.dev = {
        error: error,
        stack: error.stack,
      };
    }
    outgoingResponse(req, response);
    return requestHandler.sendError(res, 503, response);
  }
  const response: ResponseData = {
    message: "Internal Server Error.",
    success: false,
  };

  requestHandler.sendError(res, 503, response);

  // @ts-ignore
  response.error = error;

  outgoingResponse(req, response);
  console.error(error);
  process.exit(1);
};
