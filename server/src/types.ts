import { SessionData } from "express-session";

export type ResponseData = {
  data?: { [key: string]: any };
  message: string;
  statusCode: number;
};
