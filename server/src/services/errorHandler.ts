import { NextFunction, Request, Response } from "express";
import {
  BadRequest,
  ForbiddenRequest,
  ServiceError,
  Unauthorized,
} from "../models/Errors";

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
  if (error instanceof ServiceError) {
    return res.status(500).json(error.response);
  }

  res.status(500).json("Internal Server Error.");
};
