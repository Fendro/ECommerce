import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { ResponseData } from "types";

const logDirectory = "../requests logs";

const incomingRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // @ts-ignore
  req.logger = {};

  const client = {
    ip: req.ip,
    headers: req.headers,
  };
  const server = {
    url: req.url,
    method: req.method,
  };
  const response = {};
  const times = {
    requestTime: new Date(),
  };

  // @ts-ignore
  req.logger = { client, response, server, times };

  next();
};

const logParsedPayloads = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // @ts-ignore
  req.logger.server.body = req.body;
  // @ts-ignore
  req.logger.server.params = req.params;
  // @ts-ignore
  req.logger.server.query = req.query;
  // @ts-ignore
  req.logger.server.session = req.session;

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

export { incomingRequest, logParsedPayloads, outgoingResponse };
