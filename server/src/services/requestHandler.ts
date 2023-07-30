import { Response } from "express";
import { ResponseData } from "../types";

function seekParams(
  soughtParams: string[],
  params: { [key: string]: any },
  strict: boolean = true,
): { [key: string]: any } | false {
  const data: { [key: string]: any } = {};
  for (const soughtParam of soughtParams) {
    if (soughtParam in params) {
      data[soughtParam] = params[soughtParam];
    } else if (strict) {
      return false;
    }
  }

  return data;
}

function sendResponse(res: Response, data: ResponseData): void {
  res.status(200).json(data);
}

export default {
  seekParams,
  sendResponse,
};
