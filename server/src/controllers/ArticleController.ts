import axios from "axios";
import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { ArticleModel, NotFound, ServiceError } from "../models";
import { Request, Response } from "express";

const editableFields = [
  "categories",
  "description",
  "images",
  "name",
  "price",
  "quantity",
  "specs",
];
let model: ArticleModel;
(async () => {
  model = new ArticleModel(await getCollection("articles"));
})();

const addArticle = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(editableFields, req.body);

  await model.addArticle(data);

  requestHandler.sendResponse(res, {
    message: "Article registered.",
    success: true,
  });
};

const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  if (!(await model.deleteArticle(_id)))
    throw new NotFound("No article found with the provided id.");

  axios.delete(`http://localhost:8484/images/${_id}`).catch(() => {
    console.error("Remote storage server error.");
  });

  requestHandler.sendResponse(res, {
    message: "Article deleted.",
    success: true,
  });
};

const editArticle = async (req: Request, res: Response) => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const article = await model.editArticle(_id, fieldsToUpdate);
  if (!article.value) throw new ServiceError("Database error.", article);

  if ("images" in fieldsToUpdate) {
    const images = article.value.images.map((image: string) =>
      image.split("/").pop(),
    );
    axios
      .put(`http://localhost:8484/images/${article.value._id}`, {
        images: images,
      })
      .catch(() => {
        console.error("Remote storage server error.");
      });
  }

  requestHandler.sendResponse(res, {
    data: article.value,
    message: "Article edited.",
    success: true,
  });
};

const getArticle = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const article = await model.getArticle(_id);
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

  const products = await model.getArticles(search.find, search.options);
  if (!products.length) throw new NotFound("No article found.");

  requestHandler.sendResponse(res, {
    data: products,
    message: "Articles retrieved.",
    success: true,
  });
};

export { addArticle, deleteArticle, editArticle, getArticle, getArticles };
