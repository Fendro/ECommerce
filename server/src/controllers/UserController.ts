import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { ServiceError, Unauthorized } from "../models";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models";

const editableFields = ["email", "password", "username"];
let model: UserModel;
(async () => {
  model = new UserModel(await getCollection("users"));
})();

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["email", "password"], req.body);

  if (!(await model.deleteUser(data)))
    throw new Unauthorized("Invalid credentials.");

  req.session.destroy((error) => {
    if (error) throw new ServiceError("Session manager failure.", error);

    requestHandler.sendResponse(res, {
      message: "Account deletion succeeded.",
      success: true,
    });
  });
};

const editUser = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(
    ["email", "password", "edits"],
    req.body,
  );

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    data.edits,
    false,
  );

  const user = await model.editUser(data, fieldsToUpdate);
  if (!user.value) throw new ServiceError("Database error.", user);

  console.log(req.body. user);
  requestHandler.sendResponse(res, {
    data: user.value,
    message: "Account information edited.",
    success: true,
  });
};

const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  // @ts-ignore
  if (!req.session?.user) throw new Unauthorized("Authentication required.");
  else next();
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
  } else {
    const data = requestHandler.fetchParams(["email", "password"], req.body);

    const user = await model.getUser(data);
    if (!user) throw new Unauthorized("Invalid credentials.");

    // @ts-ignore
    req.session.user = user;

    requestHandler.sendResponse(res, {
      data: user,
      message: "Login succeeded.",
      success: true,
    });
  }
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
  const data = requestHandler.fetchParams(
    ["email", "password", "username"],
    req.body,
  );

  const user = await model.getUser({ email: data.email });
  if (user) throw new Unauthorized("Email already in use.");

  await model.addUser(data);

  requestHandler.sendResponse(res, {
    message: "Registration succeeded.",
    success: true,
  });
};

export { deleteUser, editUser, isLoggedIn, login, logout, register };
