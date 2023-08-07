import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { AdminModel } from "../models";
import {
  ForbiddenRequest,
  NotFound,
  ServiceError,
  Unauthorized,
} from "../models";
import { NextFunction, Request, Response } from "express";

const editableFields = ["admin", "email", "password", "username"];
let model: AdminModel;
(async () => {
  model = new AdminModel(await getCollection("users"));
})();

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  // @ts-ignore
  if (_id === req.session.user._id)
    throw new Unauthorized(
      "Admin account deletion can only be done from a different admin account.",
    );

  if (!(await model.deleteUser(_id)))
    throw new NotFound("No user found with the provided id.");

  requestHandler.sendResponse(res, {
    message: "Account deleted.",
    success: true,
  });
};

const editUser = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const user = await model.editUser(_id, fieldsToUpdate);
  if (!user.value) throw new ServiceError("Database error.", user);

  requestHandler.sendResponse(res, {
    data: user.value,
    message: "Account information edited.",
    success: true,
  });
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const user = await model.getUser(_id);
  if (!user) throw new NotFound("No user found with the provided id.");

  requestHandler.sendResponse(res, {
    data: user,
    message: "User retrieved.",
    success: true,
  });
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await model.getUsers();
  if (!users.length) throw new NotFound("No user found.");

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

export { deleteUser, editUser, getUser, getUsers, isAdmin };
