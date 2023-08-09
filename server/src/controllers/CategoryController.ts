import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { CategoryModel, NotFound, ServiceError } from "../models";
import { Request, Response } from "express";

const editableFields = ["name"];
let model: CategoryModel;
(async () => {
  model = new CategoryModel(await getCollection("categories"));
})();

const addCategory = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(editableFields, req.body);

  const { insertedId } = await model.addCategory(data);

  requestHandler.sendResponse(res, {
    data: { _id: insertedId },
    message: "Category registered.",
    success: true,
  });
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = requestHandler.fetchParams(["name"], req.params);

  if (!(await model.deleteCategory(name)))
    throw new NotFound("No category found with the provided name.");

  requestHandler.sendResponse(res, {
    message: "Category deleted.",
    success: true,
  });
};

const editCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = requestHandler.fetchParams(["name"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const category = await model.editCategory(name, fieldsToUpdate);
  if (!category.value) throw new ServiceError("Database error.", category);

  requestHandler.sendResponse(res, {
    data: category.value,
    message: "Category edited.",
    success: true,
  });
};

const getCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = requestHandler.fetchParams(["name"], req.params);

  const category = await model.getCategory(name);
  if (!category)
    throw new NotFound("No category found with the provided name.");

  requestHandler.sendResponse(res, {
    data: category,
    message: "Category retrieved.",
    success: true,
  });
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
  const categories = await model.getCategories();
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
