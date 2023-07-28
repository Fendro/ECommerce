import { NextFunction, Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";

const collection: string = "users";

const editAccount = async (req: Request, res: Response): Promise<void> => {};

const getUser = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["email"]);
  if (!data) return;

  const user = await dbCRUD.find(collection, data);

  if (!user.length) {
    requestHandler.sendResponse(res, {
      message: "No user matches the requested email.",
      statusCode: 400,
    });
    return;
  }

  delete user[0].password;

  requestHandler.sendResponse(res, {
    data: user,
    message: "User retrieved.",
    statusCode: 200,
  });
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await dbCRUD.getCollection(collection);

  if (!users.length) {
    requestHandler.sendResponse(res, {
      message: "No users found.",
      statusCode: 400,
    });
    return;
  }

  for (const user of users) {
    delete user.password;
  }

  requestHandler.sendResponse(res, {
    data: users,
    message: "Users retrieved.",
    statusCode: 200,
  });
};

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // @ts-ignore
  if (req.session.user?.admin) next();

  requestHandler.sendResponse(res, {
    message: "This action requires administrator privileges.",
    statusCode: 400,
  });
};

export { editAccount, getUser, getUsers, isAdmin };
