import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types";

const logDirectory = "./requests logs";

const incomingRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // @ts-ignore
  req.logger = {};

  const times = {
    requestTime: new Date(),
    responseTime: undefined,
    executionTime: undefined,
  };
  const client = {
    headers: req.headers,
    ip: req.ip,
  };
  const server = {
    method: req.method,
    "req.body": req.body,
    "req.params": req.params,
    "req.query": req.query,
    url: req.url,
  };
  const response = {};

  // @ts-ignore
  req.logger = { times, client, server, response };

  next();
};

const outgoingResponse = (req: Request, data: ResponseData): void => {
  // @ts-ignore
  req.logger.times.responseTime = new Date();
  // @ts-ignore
  req.logger.times.executionTime =
    // @ts-ignore
    new Date(req.logger.times.responseTime).getMilliseconds() -
    // @ts-ignore
    new Date(req.logger.times.responseTime).getMilliseconds() +
    "ms";

  // @ts-ignore
  req.logger.response.data = data;

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  // @ts-ignore
  const logFilename = req.logger.times.responseTime.toDateString() + ".json";
  const logPath = `${logDirectory}/${logFilename}`;

  let log: {}[] = [];
  if (fs.existsSync(logPath)) {
    const existingLogFileContent = fs.readFileSync(logPath, "utf8");
    try {
      log = JSON.parse(existingLogFileContent);
    } catch (error) {
      console.error("Error parsing existing log file content:", error);
    }
  }

  // @ts-ignore
  log.push(req.logger);

  fs.writeFile(logPath, JSON.stringify(log, null, 2), (error) => {
    if (error) {
      console.error("Error writing the log file:", error);
    }
  });
};

export { incomingRequest, outgoingResponse };
