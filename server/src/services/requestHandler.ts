import { Request, Response } from "express";

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
        fetchedParams[soughtParam] = (object as { [key: string]: any })[
          soughtParam
        ];
      }
    }
  }

  if (Object.keys(fetchedParams).length !== soughtParams.length) {
    missingParams(req, soughtParams, fetchedParams);
    sendResponse(res, 400, {
      message:
        "Missing request parameters, check the server console for details.",
    });
    return false;
  }

  return fetchedParams;
}

function sendResponse(res: Response, code: number, data: {}): void {
  res.status(code).send(JSON.stringify(data));
}

export default {
  fetchParams,
  sendResponse,
};
