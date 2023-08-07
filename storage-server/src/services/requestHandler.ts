import { BadRequest } from "../models";
import { Request, Response } from "express";
import { ResponseData } from "../types";

const fetchParams = (
  soughtParams: string[],
  params: { [key: string]: any },
  strict: boolean = true,
): { [key: string]: any } => {
  if (!params)
    throw new BadRequest("No parameters received.", soughtParams, params);

  const data: { [key: string]: any } = {};
  for (const soughtParam of soughtParams) {
    if (soughtParam in params) {
      data[soughtParam] = params[soughtParam];
    } else if (strict) {
      throw new BadRequest("Missing parameters.", soughtParams, params);
    }
  }

  if (!Object.keys(data).length)
    throw new BadRequest(
      "No field to update was provided.",
      soughtParams,
      params,
    );

  return data;
};

const sendError = (
  res: Response,
  errStatus: number,
  data: ResponseData,
): void => {
  res.status(errStatus).json(data);
};

const sendResponse = (res: Response, data: ResponseData): void => {
  res.status(200).json(data);
};

export default {
  fetchParams,
  sendError,
  sendResponse,
};
