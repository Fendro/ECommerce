import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types";

const directory = "./logs";

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
    session: req.session,
    url: req.url,
  };
  const response = {};

  // @ts-ignore
  req.logger = { times, client, server, response };

  next();
};

const outgoingResponse = (
  req: Request,
  data: ResponseData,
  stack?: string,
): void => {
  // @ts-ignore
  req.logger.times.responseTime = new Date();
  // @ts-ignore
  req.logger.times.executionTime =
    // @ts-ignore
    new Date(req.logger.times.responseTime).getMilliseconds() -
    // @ts-ignore
    new Date(req.logger.times.responseTime).getMilliseconds();

  // @ts-ignore
  req.logger.response.data = data;
  if (stack)
    // @ts-ignore
    req.logger.response.stack = stack;

  // @ts-ignore
  const filename = req.logger.times.responseTime.toDateString() + ".json";
  fs.access(`${directory}/${filename}`, (error) => {
    if (!error) {
      fs.readFile(`${directory}/${filename}`, "utf8", (error, data) => {
        if (error) {
          console.error("Logger reading failure:", error);
        } else {
          const content = data.trim();
          const comma = content ? "," : "";

          fs.appendFile(
            `${directory}/${filename}`,
            // @ts-ignore
            comma + JSON.stringify(req.logger, null, 2),
            (error) => {
              if (error) console.error("Logger append failure:", error);
            },
          );
        }
      });
    } else {
      fs.writeFile(
        `${directory}/${filename}`,
        // @ts-ignore
        JSON.stringify(req.logger, null, 2),
        (error) => {
          if (error) console.error("Logger write failure:", error);
        },
      );
    }
  });
};

export { incomingRequest, outgoingResponse };
