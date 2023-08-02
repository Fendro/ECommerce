import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { passwordHashing } from "../utils";
import { Collection } from "mongodb";
import { BadRequest, ServiceError, Unauthorized } from "../models";
import { NextFunction, Request, Response } from "express";

const editableFields = ["email", "password", "username"];
let collection: Collection;
(async () => {
  collection = await getCollection("users");
})();

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["email", "password"], req.body);
  data.password = passwordHashing(data.password);

  const { deletedCount } = await collection.deleteOne(data);
  if (!deletedCount) throw new Unauthorized("Invalid credentials.");

  requestHandler.sendResponse(res, {
    message: "Account deleted.",
    success: true,
  });
};

const editAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["email", "password"], req.body);
  data.password = passwordHashing(data.password);

  const edits = requestHandler.fetchParams(["edits"], req.body);
  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    edits,
    false,
  );
  if (!fieldsToUpdate)
    throw new BadRequest(
      "No fields to update were provided.",
      editableFields,
      edits,
    );
  if (fieldsToUpdate.password)
    fieldsToUpdate.password = passwordHashing(fieldsToUpdate.password);

  const user = await collection.findOneAndUpdate(
    data,
    {
      $set: fieldsToUpdate,
    },
    { returnDocument: "after" },
  );
  if (!user.value) throw new ServiceError("Database error.", user);

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
    const data = requestHandler.fetchParams(["email", "password"], req.query);
    data.password = passwordHashing(data.password);

    const user = await collection.findOne(data);
    if (!user) throw new Unauthorized("Invalid credentials.");
    delete user.password;

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

  const user = await collection.findOne({ email: data.email });
  if (user) throw new Unauthorized("Email already in use.");

  data.password = passwordHashing(data.password);
  data.admin = false;

  await collection.insertOne(data);

  requestHandler.sendResponse(res, {
    message: "Registration succeeded.",
    success: true,
  });
};

export { deleteAccount, editAccount, isLoggedIn, login, logout, register };
