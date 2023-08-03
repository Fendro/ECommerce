import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { passwordHashing } from "../utils";
import {
  ForbiddenRequest,
  NotFound,
  ServiceError,
  Unauthorized,
} from "../models";
import { Collection, ObjectId } from "mongodb";
import { NextFunction, Request, Response } from "express";

const editableFields = ["admin", "email", "password", "username"];
let collection: Collection;
(async () => {
  collection = await getCollection("users");
})();

const deleteAccountAsAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);

  // @ts-ignore
  if (data._id === req.session.user._id)
    throw new Unauthorized(
      "Admin account deletion can only be done from a different admin account.",
    );

  data._id = new ObjectId(data._id);

  const { deletedCount } = await collection.deleteOne(data);
  if (!deletedCount) throw new NotFound("No user found with the provided id.");

  requestHandler.sendResponse(res, {
    message: "Account deleted.",
    success: true,
  });
};

const editAccountAsAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
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
  delete user.value.password;

  requestHandler.sendResponse(res, {
    data: user.value,
    message: "Account information edited.",
    success: true,
  });
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const user = await collection.findOne(data);
  if (!user) throw new NotFound("No user found with the provided id.");
  delete user.password;

  requestHandler.sendResponse(res, {
    data: user,
    message: "User retrieved.",
    success: true,
  });
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await collection.find({}).toArray();

  if (!users.length) throw new NotFound("No user found.");

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
  if (!req.session.user?.admin) {
    throw new ForbiddenRequest(
      "This action requires administrator privileges.",
      // @ts-ignore
      req.session.user,
    );
  } else {
    next();
  }
};

export { deleteAccountAsAdmin, editAccountAsAdmin, getUser, getUsers, isAdmin };
