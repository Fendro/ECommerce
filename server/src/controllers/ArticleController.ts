import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { NotFound, ServiceError } from "../models";
import { Collection, ObjectId } from "mongodb";
import { Request, Response } from "express";

const editableFields = [
  "categories",
  "description",
  "images",
  "name",
  "price",
  "specs",
];
let collection: Collection;
(async () => {
  collection = await getCollection("articles");
})();

const addArticle = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(editableFields, req.body);
  data.views = 0;
  data.searches = 0;

  await collection.insertOne(data);

  requestHandler.sendResponse(res, {
    message: "Article registered.",
    success: true,
  });
};

const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const { deletedCount } = await collection.deleteOne(data);
  if (!deletedCount)
    throw new NotFound("No article found with the provided id.");

  requestHandler.sendResponse(res, {
    message: "Article deleted.",
    success: true,
  });
};

const editArticle = async (req: Request, res: Response) => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const article = await collection.findOneAndUpdate(
    data,
    {
      $set: fieldsToUpdate,
    },
    { returnDocument: "after" },
  );
  if (!article.value) throw new ServiceError("Database error.", article);

  requestHandler.sendResponse(res, {
    data: article.value,
    message: "Article edited.",
    success: true,
  });
};

const getArticle = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["_id"], req.params);
  data._id = new ObjectId(data._id);

  const article = await collection.findOneAndUpdate(data, {
    $inc: { views: 1 },
  });
  if (!article.value)
    throw new NotFound("No article found with the provided id.");

  requestHandler.sendResponse(res, {
    data: article.value,
    message: "Article retrieved.",
    success: true,
  });
};

const getArticles = async (req: Request, res: Response): Promise<void> => {
  const search = requestHandler.searchBuilder(req);

  const products = await collection.find(search.find, search.options).toArray();
  if (!products.length) throw new NotFound("No article found.");

  requestHandler.sendResponse(res, {
    data: products,
    message: "Articles retrieved.",
    success: true,
  });

  await collection.updateMany(
    search.find,
    { $inc: { searches: 1 } },
    search.options,
  );
};

export { addArticle, deleteArticle, editArticle, getArticle, getArticles };
