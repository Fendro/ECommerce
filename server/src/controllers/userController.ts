import { Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";

const collection: string = "users";

const register = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, [
    "username",
    "email",
    "password",
  ]);

  if (!data) return;

  (await dbCRUD.insert(collection, data))
    ? requestHandler.sendResponse(res, 200, {
        message: "Registration succeeded",
      })
    : requestHandler.sendResponse(res, 400, {
        message: "Registration failed.",
      });
};

const login = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["email", "password"]);

  if (!data) return;

  const user = await dbCRUD.find(collection, data);
  user
    ? requestHandler.sendResponse(res, 200, { message: "Login succeeded." })
    : requestHandler.sendResponse(res, 400, { message: "Login failed." });
};

const editAccount = () => {};

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["email", "password"]);

  if (!data) return;

  if (!(await dbCRUD.find(collection, data))) {
    requestHandler.sendResponse(res, 400, {
      message: "No account found matching the provided credentials.",
    });
  }

  (await dbCRUD.remove(collection, data))
    ? requestHandler.sendResponse(res, 200, {
        message: "Account deletion succeeded.",
      })
    : requestHandler.sendResponse(res, 400, {
        message: "Account deletion failed.",
      });
};

export { register, login, editAccount, deleteAccount };
