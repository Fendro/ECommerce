import fs from "fs";
import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import {
  FailedDependency,
  ImagesModel,
  NotFound,
  ServiceError,
} from "../models";
import { NextFunction, Request, Response } from "express";

let model: ImagesModel;
(async () => {
  model = new ImagesModel(await getCollection("articles"));
})();

const deleteImages = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  if (!(await model.deleteImages(_id)))
    throw new NotFound("No images found with the provided id.");

  requestHandler.sendResponse(res, {
    message: "Images deleted.",
    success: true,
  });
};

const doesArticleExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  if (!(await model.getArticle(_id)))
    throw new FailedDependency("No article found with the provided id.");

  const directory = `./images/${_id}`;
  if (!fs.existsSync(directory)) fs.mkdirSync(directory);

  next();
};

const editImages = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(["names"], req.body, false);

  const category = await model.editImages(_id, fieldsToUpdate);
  if (!category.value) throw new ServiceError("Database error.", category);

  requestHandler.sendResponse(res, {
    data: category.value,
    message: "Images edited.",
    success: true,
  });
};

const imagesStored = (req: Request, res: Response) => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  model.updateArticle(_id);

  requestHandler.sendResponse(res, {
    message: "Images stored.",
    success: true,
  });
};

export { deleteImages, doesArticleExist, editImages, imagesStored };
