import appConfig from "../configs/appConfig";
import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";
import {
  BadRequest,
  ForbiddenRequest,
  NotFound,
  ServiceError,
  Unauthorized,
} from "../models/Errors";
import { ResponseData } from "../types";
import { BSONError } from "bson";

export const ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof BadRequest) {
    return res.status(400).json(error.response);
  }
  if (error instanceof Unauthorized) {
    return res.status(401).json(error.response);
  }
  if (error instanceof ForbiddenRequest) {
    return res.status(403).json(error.response);
  }
  if (error instanceof NotFound) {
    return res.status(404).json(error.response);
  }
  if (error instanceof ServiceError) {
    return res.status(503).json(error.response);
  }
  if (error instanceof BSONError) {
    console.log(error);
    return res
      .status(503)
      .json({ message: "Invalid BSON data format.", success: false });
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

    return res.status(503).json(response);
  }

  res.status(500).json("Internal Server Error.");
  console.error(error);
  process.exit(1);
};
