import { Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";
import * as Utils from "../utils/usersUtils";
import { BadRequest, ServiceError, Unauthorized } from "../models/Errors";

const collection: string = "users";

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["email", "password"]);
  if (!data) return;

  if (!(await dbCRUD.find(collection, data))) {
    requestHandler.sendResponse(res, {
      message: "No account found matching the provided credentials.",
      statusCode: 400,
    });

    return;
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

const editAccount = async (req: Request, res: Response): Promise<void> => {};

const login = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  if (req.session.user) {
    requestHandler.sendResponse(res, {
      // @ts-ignore
      data: req.session.user,
      message: "A user is already logged in.",
      statusCode: 400,
    });
    return;
  }

  const data = requestHandler.seekParams(["email", "password"], req.query);
  if (!data)
    throw new BadRequest(
      "Missing parameters",
      ["email", "password"],
      req.query,
    );

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
  // @ts-ignore
  req.session.user = user[0];
  console.log(req.session);
  requestHandler.sendResponse(res, {
    data: user,
    message: "Login succeeded.",
    statusCode: 200,
  });
};

const logout = (req: Request, res: Response): void => {
  // @ts-ignore
  if (!req.session.user) throw new Unauthorized("No user logged in.");

  req.session.destroy((error) => {
    if (error) throw new ServiceError("Session manager failure.", error);

    requestHandler.sendResponse(res, {
      message: "Logout succeeded.",
      statusCode: 200,
    });
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

export { deleteAccount, editAccount, login, logout, register };
