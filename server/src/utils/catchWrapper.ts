import { Request, Response, NextFunction } from "express";

/**
 * Takes an asynchronous middleware and wraps it in a try-catch.
 * Sends any error caught to the next middleware in the stack.
 * @param handler The middleware to wrap.
 */
export const catchWrapper = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
