import { NextFunction, Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";
import { BadRequest, ServiceError, Unauthorized } from "../models/Errors";
import * as Utils from "../utils/usersUtils";

const collection: string = "users";

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.seekParams(["email", "password"], req.body);
  data.password = Utils.passwordHashing(data.password);

  const user = await dbCRUD.findOne(collection, data);
  if (!user) throw new Unauthorized("Credentials don't match.");

  await dbCRUD.remove(collection, data);

  requestHandler.sendResponse(res, {
    message: "Account deletion succeeded.",
    success: true,
  });
};

const editAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.seekParams(["email", "password"], req.body);
  data.password = Utils.passwordHashing(data.password);

  const user = await dbCRUD.findOne(collection, data);
  if (!user) throw new Unauthorized("Credentials don't match.");

  const keys = Object.keys(user);
  const fieldsToUpdate = requestHandler.seekParams(
    keys,
    req.body["edits"],
    false,
  );

  if (!fieldsToUpdate)
    throw new BadRequest("No fields to update were provided.", keys, req.body);
  if (fieldsToUpdate.admin) throw new Unauthorized("Nice try.");
  if (fieldsToUpdate.password)
    fieldsToUpdate.password = Utils.passwordHashing(fieldsToUpdate.password);

  const updatedUser = await dbCRUD.update(collection, data, fieldsToUpdate);

  requestHandler.sendResponse(res, {
    data: updatedUser,
    message: "Information edited.",
    success: true,
  });
};

const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  // @ts-ignore
  if (!req.session?.user) throw new Unauthorized("Authentication required.");

  next();
};

const login = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  if (req.session.user) {
    requestHandler.sendResponse(res, {
      // @ts-ignore
      data: req.session.user,
      message: "A user is already logged in.",
      success: false,
    });
    return;
  }

  const data = requestHandler.seekParams(["email", "password"], req.query);
  data.password = Utils.passwordHashing(data.password);

  const user = await dbCRUD.findOne(collection, data);
  if (!user) throw new Unauthorized("Invalid credentials.");
  delete user.password;

  // @ts-ignore
  req.session.user = user;
  requestHandler.sendResponse(res, {
    data: user,
    message: "Login succeeded.",
    success: true,
  });
};

const logout = (req: Request, res: Response): void => {
  // @ts-ignore
  if (!req.session.user) throw new Unauthorized("No user logged in.");

  req.session.destroy((error) => {
    if (error) throw new ServiceError("Session manager failure.", error);

    requestHandler.sendResponse(res, {
      message: "Logout succeeded.",
      success: true,
    });
  });
};

const register = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.seekParams(
    ["username", "email", "password"],
    req.body,
  );

  const user = await dbCRUD.findOne(collection, { email: data.email });
  if (user) throw new Unauthorized("Email already in use.");

  data.password = Utils.passwordHashing(data.password);
  data.admin = false;

  await dbCRUD.insert(collection, data);

  requestHandler.sendResponse(res, {
    message: "Registration succeeded",
    success: true,
  });
};

export { deleteAccount, editAccount, isLoggedIn, login, logout, register };
