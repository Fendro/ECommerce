import { catchWrapper } from "../utils";
import { Router } from "express";
import * as AdminController from "../controllers/AdminController";
import * as ArticleController from "../controllers/ArticleController";

const articleRouter: Router = Router();

articleRouter.delete(
  "/articles/:_id",
  AdminController.isAdmin,
  catchWrapper(ArticleController.deleteArticle),
);
articleRouter.get("/articles", catchWrapper(ArticleController.getArticles));
articleRouter.get("/articles/:_id", catchWrapper(ArticleController.getArticle));
articleRouter.post(
  "/articles/",
  AdminController.isAdmin,
  catchWrapper(ArticleController.addArticle),
);
articleRouter.put(
  "/articles/:_id",
  AdminController.isAdmin,
  catchWrapper(ArticleController.editArticle),
);

export default articleRouter;
