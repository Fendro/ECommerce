import Express from "express";

export default interface Request extends Express.Request {
  user?: any;
}
