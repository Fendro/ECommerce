import { Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";
import * as Utils from "../utils/usersUtils";

const collection: string = "users";

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["email", "password"]);
  if (!data) return;

  if (!(await dbCRUD.find(collection, data))) {
    requestHandler.sendResponse(res, {
      message: "No account found matching the provided credentials.",
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

const login = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["email", "password"]);
  if (!data) return;

  data.password = Utils.passwordHashing(data.password);

  const user = await dbCRUD.find(collection, data);

  if (!user.length) {
    requestHandler.sendResponse(res, {
      message: "Login failed.",
      statusCode: 400,
    });
    return;
  }

  delete user[0].password;

  requestHandler.sendResponse(res, {
    data: user,
    message: "Login succeeded.",
    statusCode: 200,
  });
};

const register = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, [
    "username",
    "email",
    "password",
  ]);
  if (!data) return;

  const user = await dbCRUD.find(collection, { email: data.email });
  if (user.length) {
    requestHandler.sendResponse(res, {
      message: "This email is already in use.",
      statusCode: 400,
    });
    return;
  }

  data.password = Utils.passwordHashing(data.password);
  data.admin = false;

  (await dbCRUD.insert(collection, data))
    ? requestHandler.sendResponse(res, {
        data: user,
        message: "Registration succeeded",
        statusCode: 200,
      })
    : requestHandler.sendResponse(res, {
        message: "Registration failed.",
        statusCode: 400,
      });
};

export { deleteAccount, editAccount, login, register };
