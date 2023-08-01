import { NextFunction, Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";
import {
  BadRequest,
  ForbiddenRequest,
  NotFound,
  ServiceError,
} from "../models/Errors";
import { ObjectId } from "mongodb";
import * as Utils from "../utils/usersUtils";

const collection: string = "users";

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.seekParams(["_id"], req.params);

  const user = await dbCRUD.findOne(collection, data);
  if (!user) throw new NotFound("No user found with the provided id.");

  await dbCRUD.remove(collection, data);

  requestHandler.sendResponse(res, {
    message: "Account deletion succeeded.",
    success: true,
  });
};

const editAccount = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.seekParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const user = await dbCRUD.findOne(collection, data);
  if (!user) throw new NotFound("No user found with the provided id.");

  const keys = Object.keys(user).filter((key) => key !== "_id");

  const fieldsToUpdate = requestHandler.seekParams(keys, req.body, false);
  if (!fieldsToUpdate)
    throw new BadRequest("No fields to update were provided.", keys, req.body);
  if (fieldsToUpdate.password)
    fieldsToUpdate.password = Utils.passwordHashing(fieldsToUpdate.password);

  const updatedUser = await dbCRUD.update(collection, data, fieldsToUpdate);
  if (!(updatedUser.lastErrorObject?.updatedExisting && updatedUser.value))
    throw new ServiceError("Database error.", updatedUser);

  requestHandler.sendResponse(res, {
    data: updatedUser.value,
    message: "Information edited.",
    success: true,
  });
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.seekParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const user = await dbCRUD.findOne(collection, data);
  if (!user) throw new NotFound("No user found with the provided id.");

  delete user.password;

  requestHandler.sendResponse(res, {
    data: user,
    message: "User retrieved.",
    success: true,
  });
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await dbCRUD.find(collection, {});

  if (!users.length) {
    requestHandler.sendResponse(res, {
      message: "No users found.",
      success: false,
    });
    return;
  }

  for (const user of users) {
    delete user.password;
  }

  requestHandler.sendResponse(res, {
    data: users,
    message: "Users retrieved.",
    success: true,
  });
};

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // @ts-ignore
  if (!req.session.user?.admin)
    throw new ForbiddenRequest(
      "This action requires administrator privileges.",
      // @ts-ignore
      req.session.user,
    );

  next();
};

export { deleteAccount, editAccount, getUser, getUsers, isAdmin };
