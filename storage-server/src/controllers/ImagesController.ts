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
  const { images } = requestHandler.fetchParams(["images"], req.body, false);

  const category = await model.editImages(_id, images);
  if (!category) throw new ServiceError("Database error.", category);

  requestHandler.sendResponse(res, {
    message: "Images edited.",
    success: true,
  });
};

const imagesStored = async (req: Request, res: Response) => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const article = await model.updateArticle(_id);
  if (!article.value) throw new ServiceError("Database error", article);

  requestHandler.sendResponse(res, {
    data: article.value,
    message: "Images stored and article updated.",
    success: true,
  });
};

export { deleteImages, doesArticleExist, editImages, imagesStored };
