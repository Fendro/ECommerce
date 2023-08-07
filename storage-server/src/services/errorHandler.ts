import appConfig from "../configs/appConfig";
import fs from "fs";
import requestHandler from "./requestHandler";
import { outgoingResponse } from "./logger";
import { BadRequest, FailedDependency } from "../models";
import { BSONError } from "bson";
import { MongoError } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types";

export const ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof BadRequest || error instanceof FailedDependency) {
    outgoingResponse(req, error.response);
    return requestHandler.sendError(res, error.status, error.response);
  }

  const response: ResponseData = {
    message: "",
    success: false,
  };

  if (appConfig.env === "development") {
    response.dev = {
      error: error,
      stack: error.stack,
    };
  }

  if ("status" in error && error.status === 400 && "body" in error) {
    response.message = error.message;
    outgoingResponse(req, response);
    return requestHandler.sendError(res, 400, response);
  }
  if (error instanceof BSONError) {
    response.message = "Invalid BSON data format.";
    outgoingResponse(req, response);
    return requestHandler.sendError(res, 400, response);
  }
  if (error instanceof MongoError) {
    console.error(error);
    response.message = "Database error.";
    outgoingResponse(req, response);
    return requestHandler.sendError(res, 503, response);
  }

  response.message = "Internal Server Error.";
  requestHandler.sendError(res, 500, response);
  response.dev ??= {
    error: error,
    stack: error.stack,
  };

  if (!fs.existsSync("./server logs")) {
    fs.mkdirSync("./server logs");
  }

  fs.writeFile(
    `./server logs/${new Date()}.json`,
    JSON.stringify(response, null, 2),
    (writeError) => {
      if (writeError)
        console.error("Could not log server error to file report.", writeError);

      console.error(error);
      process.exit(1);
    },
  );
};
