import * as ArticleController from "../controllers/ArticleController";
import * as AdminController from "../controllers/AdminController";
import { catchWrapper } from "../utils/catchWrapper";
import { Router } from "express";
const articleRouter: Router = Router();

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
  catchWrapper(ArticleController.editProduct),
);
articleRouter.delete(
  "/articles/:_id",
  AdminController.isAdmin,
  catchWrapper(ArticleController.deleteArticle),
);

export default articleRouter;
