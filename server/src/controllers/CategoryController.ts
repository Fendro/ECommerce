import { Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";
import { BadRequest, NotFound, ServiceError } from "../models/Errors";
import { ObjectId } from "mongodb";

const collection: string = "categories";

const addCategory = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["name"], req.body);

  await dbCRUD.insert(collection, data);

  requestHandler.sendResponse(res, {
    message: "Category registered.",
    success: true,
  });
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);

  const category = await dbCRUD.findOne(collection, data);
  if (!category) throw new NotFound("No category found with the provided id.");

  await dbCRUD.remove(collection, data);

  requestHandler.sendResponse(res, {
    message: "Category deletion succeeded.",
    success: true,
  });
};

const editCategory = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const category = await dbCRUD.findOne(collection, data);
  if (!category) throw new NotFound("No category found with the provided id.");

  const keys = Object.keys(category).filter((key) => key !== "_id");
  const fieldsToUpdate = requestHandler.fetchParams(keys, req.body, false);

  if (!fieldsToUpdate)
    throw new BadRequest("No fields to update were provided.", keys, req.body);

  const updatedCategory = await dbCRUD.update(collection, data, fieldsToUpdate);
  if (
    !(updatedCategory.lastErrorObject?.updatedExisting && updatedCategory.value)
  )
    throw new ServiceError("Database error.", updatedCategory);

  requestHandler.sendResponse(res, {
    data: updatedCategory.value,
    message: "Information edited.",
    success: true,
  });
};

const getCategory = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const category = await dbCRUD.findOne(collection, data);
  if (!category) throw new NotFound("No category found with the provided id.");

  requestHandler.sendResponse(res, {
    data: category,
    message: "Category retrieved.",
    success: true,
  });
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
  const categories = await dbCRUD.find(collection, {});

  if (!categories.length) {
    requestHandler.sendResponse(res, {
      message: "No Categories found.",
      success: false,
    });
    return;
  }

  requestHandler.sendResponse(res, {
    data: categories,
    message: "Categories retrieved.",
    success: true,
  });
};

export {
  addCategory,
  deleteCategory,
  editCategory,
  getCategory,
  getCategories,
};
