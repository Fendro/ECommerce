import { Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";

const collection: string = "users";

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["email"]);
  if (!data) return;

  if (!(await dbCRUD.findOne(collection, data))) {
    requestHandler.sendResponse(res, {
      message: "No account found matching the provided credentials.",
      statusCode: 400,
    });
  }

  (await dbCRUD.remove(collection, data))
    ? requestHandler.sendResponse(res, {
        message: "Account deletion succeeded.",
        statusCode: 400,
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

  const user = await dbCRUD.findOne(collection, data);
  user.length
    ? requestHandler.sendResponse(res, {
        data: user,
        message: "Product retrieved.",
        statusCode: 200,
      })
    : requestHandler.sendResponse(res, {
        message: "No product matches the requested id.",
        statusCode: 400,
      });
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await dbCRUD.getCollection(collection);
  users.length
    ? requestHandler.sendResponse(res, {
        data: users,
        message: "Products retrieved.",
        statusCode: 200,
      })
    : requestHandler.sendResponse(res, {
        message: "No products found.",
        statusCode: 400,
      });
};

const isAdmin = () => {};

export { deleteAccount, editAccount, getUser, getUsers, isAdmin };
