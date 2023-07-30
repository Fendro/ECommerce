import { Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";
import { BadRequest, NotFound } from "../models/Errors";
import { ObjectId } from "mongodb";
import * as Utils from "../utils/usersUtils";

const collection: string = "articles";

const addArticle = async (req: Request, res: Response): Promise<void> => {
  const soughtParams = [
    "name",
    "price",
    "description",
    "images",
    "specs",
    "quantity",
  ];
  const data = requestHandler.seekParams(soughtParams, req.body);
  if (!data)
    throw new BadRequest("Missing parameters.", soughtParams, req.body);
  data.views = 0;

  await dbCRUD.insert(collection, data);

  requestHandler.sendResponse(res, {
    message: "Article registered.",
    success: true,
  });
};

const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  const soughtParams = ["_id"];
  const data = requestHandler.seekParams(soughtParams, req.params);
  if (!data)
    throw new BadRequest("Missing parameters.", soughtParams, req.params);
  data._id = new ObjectId(data._id);

  const article = await dbCRUD.findOne(collection, data);
  if (!article) throw new NotFound("No article found with the provided id");

  await dbCRUD.remove(collection, data);

  requestHandler.sendResponse(res, {
    message: "Article deletion succeeded.",
    success: true,
  });
};

const editProduct = async (req: Request, res: Response) => {
  const soughtParams = ["_id"];
  const data = requestHandler.seekParams(soughtParams, req.params);
  if (!data)
    throw new BadRequest("Missing parameters", soughtParams, req.params);
  data._id = new ObjectId(data._id);

  const article = await dbCRUD.findOne(collection, data);
  if (!article) throw new NotFound("No article found with the provided id.");

  const keys = Object.keys(article);
  const fieldsToUpdate = requestHandler.seekParams(keys, req.body, false);

  if (!fieldsToUpdate)
    throw new BadRequest("No fields to update were provided.", keys, req.body);

  if (fieldsToUpdate.password)
    fieldsToUpdate.password = Utils.passwordHashing(fieldsToUpdate.password);

  const updatedUser = await dbCRUD.update(collection, data, fieldsToUpdate);

  requestHandler.sendResponse(res, {
    data: updatedUser,
    message: "Information edited.",
    success: true,
  });
};

const getArticle = async (req: Request, res: Response): Promise<void> => {
  const soughtParams = ["_id"];
  const data = requestHandler.seekParams(soughtParams, req.params);
  if (!data)
    throw new BadRequest("Missing parameters.", soughtParams, req.params);
  data._id = new ObjectId(data._id);

  const product = await dbCRUD.findOne(collection, data);

  if (!product) throw new NotFound("No article found with the provided id");

  requestHandler.sendResponse(res, {
    data: product,
    message: "Article retrieved.",
    success: true,
  });

  await dbCRUD.update(collection, data, { views: product.views + 1 });
};

const getArticles = async (req: Request, res: Response): Promise<void> => {
  const products = await dbCRUD.find(collection, {});

  products.length
    ? requestHandler.sendResponse(res, {
        data: products,
        message: "Articles retrieved.",
        success: true,
      })
    : requestHandler.sendResponse(res, {
        message: "No articles found.",
        success: false,
      });
};

export { addArticle, deleteArticle, editProduct, getArticle, getArticles };
