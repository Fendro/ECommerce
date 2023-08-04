import appConfig from "../configs/appConfig";
import requestHandler from "./requestHandler";
import {
  BadRequest,
  ForbiddenRequest,
  NotFound,
  ServiceError,
  Unauthorized,
} from "../models";
import { BSONError } from "bson";
import { MongoError } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types";

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
  if (error instanceof BadRequest) {
    return requestHandler.sendError(res, 400, error.response);
  }
  if (error instanceof Unauthorized) {
    return requestHandler.sendError(res, 401, error.response);
  }
  if (error instanceof ForbiddenRequest) {
    return requestHandler.sendError(res, 403, error.response);
  }
  if (error instanceof NotFound) {
    return requestHandler.sendError(res, 404, error.response);
  }
  if (error instanceof ServiceError) {
    return requestHandler.sendError(res, 503, error.response);
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

    return requestHandler.sendError(res, 503, response);
  }

  requestHandler.sendError(res, 503, {
    message: "Internal Server Error.",
    success: false,
  });
  console.error(error);
  process.exit(1);
};
