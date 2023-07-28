import { Router } from "express";
import * as ArticleController from "../controllers/ArticleController";
const articleRouter: Router = Router();

articleRouter.get("/articles", ArticleController.getProducts);
articleRouter.get("/articles/:_id", ArticleController.getProduct);
articleRouter.post("/articles/", ArticleController.addProduct);
articleRouter.put("/articles/:_id", ArticleController.editProduct);
articleRouter.delete("/articles/:_id", ArticleController.deleteProduct);

export default articleRouter;
