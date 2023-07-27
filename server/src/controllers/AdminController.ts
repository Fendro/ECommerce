import { NextFunction, Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";

const collection: string = "users";

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["email"]);
  if (!data) return;

  if (!(await dbCRUD.find(collection, data))) {
    requestHandler.sendResponse(res, {
      message: "No account found matching the provided email.",
      statusCode: 400,
    });
  }

  (await dbCRUD.remove(collection, data))
    ? requestHandler.sendResponse(res, {
        message: "Account deletion succeeded.",
        statusCode: 200,
      })
    : requestHandler.sendResponse(res, {
        message: "Account deletion failed.",
        statusCode: 400,
      });
};

const editAccount = () => {};

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
  next();
};

export { deleteAccount, editAccount, getUser, getUsers, isAdmin };
