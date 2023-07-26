import { Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";

const collection: string = "products";

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, [
    "username",
    "email",
    "password",
  ]);

  if (!data) return;

  const user = await dbCRUD.find(collection, { email: data.email });
  if (user.length) {
    requestHandler.sendResponse(res, 400, {
      message: "This email is already in use.",
    });
    return;
  }

  (await dbCRUD.insert(collection, data))
    ? requestHandler.sendResponse(res, 200, {
        message: "Registration succeeded",
      })
    : requestHandler.sendResponse(res, 400, {
        message: "Registration failed.",
      });
};

const getProduct = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["email", "password"]);

  if (!data) return;

  const user = await dbCRUD.find(collection, data);
  user
    ? requestHandler.sendResponse(res, 200, { message: "Login succeeded." })
    : requestHandler.sendResponse(res, 400, { message: "Login failed." });
};

const editAccount = () => {};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
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

export { addProduct, getProduct, editAccount, deleteProduct };
