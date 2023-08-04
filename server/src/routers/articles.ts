import { catchWrapper } from "../utils";
import { isAdmin } from "../controllers/AdminController";
import { Router } from "express";
import * as ArticleController from "../controllers/ArticleController";

const articlesRouter: Router = Router();

articlesRouter.delete(
  "/articles/:_id",
  isAdmin,
  catchWrapper(ArticleController.deleteArticle),
);
articlesRouter.get("/articles", catchWrapper(ArticleController.getArticles));
articlesRouter.get(
  "/articles/:_id",
  catchWrapper(ArticleController.getArticle),
);
articlesRouter.post(
  "/articles/",
  isAdmin,
  catchWrapper(ArticleController.addArticle),
);
articlesRouter.put(
  "/articles/:_id",
  isAdmin,
  catchWrapper(ArticleController.editArticle),
);

export default articlesRouter;
