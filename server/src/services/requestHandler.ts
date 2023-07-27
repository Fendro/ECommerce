import { Request, Response } from "express";
import { ResponseData } from "../types";

function missingParams(
  req: Request,
  missingParams: string[],
  params: object,
): void {
  console.error(
    "req.body:",
    req.body,
    "req.params:",
    req.params,
    "req.query:",
    req.query,
    "\nSought request params: ",
    missingParams,
    "Params fetched:",
    params,
  );
}

function fetchParams(
  req: Request,
  res: Response,
  soughtParams: string[],
): { [key: string]: any } | false {
  const objects: { [key: string]: any }[] = [req.body, req.params, req.query];
  const fetchedParams: { [key: string]: any } = {};

  for (const object of objects) {
    for (const soughtParam of soughtParams) {
      if (soughtParam in object) {
        fetchedParams[soughtParam] = object[soughtParam];
      }
    }
  }

  if (Object.keys(fetchedParams).length !== soughtParams.length) {
    missingParams(req, soughtParams, fetchedParams);
    sendResponse(res, {
      message:
        "Parameters count mismatch, check the server console for details.",
      statusCode: 400,
    });
    return false;
  }

  return fetchedParams;
}

function sendResponse(res: Response, data: ResponseData): void {
  res.status(data.statusCode).send(JSON.stringify(data));
}

export default {
  fetchParams,
  sendResponse,
};
