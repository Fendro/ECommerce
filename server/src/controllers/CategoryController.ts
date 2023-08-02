import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { BadRequest, NotFound, ServiceError } from "../models";
import { Collection, ObjectId } from "mongodb";
import { Request, Response } from "express";

const editableFields = ["name"];
let collection: Collection;
(async () => {
  collection = await getCollection("categories");
})();

const addCategory = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(editableFields, req.body);

  await collection.insertOne(data);

  requestHandler.sendResponse(res, {
    message: "Category registered.",
    success: true,
  });
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const { deletedCount } = await collection.deleteOne(data);
  if (!deletedCount)
    throw new NotFound("No category found with the provided id");

  requestHandler.sendResponse(res, {
    message: "Category deleted.",
    success: true,
  });
};

const editCategory = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );
  if (!fieldsToUpdate)
    throw new BadRequest(
      "No fields to update were provided.",
      editableFields,
      req.body,
    );

  const category = await collection.findOneAndUpdate(
    data,
    {
      $set: fieldsToUpdate,
    },
    { returnDocument: "after" },
  );
  if (!category.value) throw new ServiceError("Database error.", category);

  requestHandler.sendResponse(res, {
    data: category.value,
    message: "Information edited.",
    success: true,
  });
};

const getCategory = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const category = await collection.findOne(data);
  if (!category) throw new NotFound("No category found with the provided id.");

  requestHandler.sendResponse(res, {
    data: category,
    message: "Category retrieved.",
    success: true,
  });
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
  const categories = await collection.find({}).toArray();
  if (!categories.length) throw new NotFound("No categories found.");

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
