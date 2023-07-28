import { Router } from "express";
import * as ProductController from "../controllers/ProductController";
const articleRouter: Router = Router();

articleRouter.get("/articles", ProductController.getProducts);
articleRouter.get("/articles/:name", ProductController.getProduct);
articleRouter.post("/articles/", ProductController.addProduct);
articleRouter.put("/articles/:name", ProductController.editProduct);
articleRouter.delete("/articles/:name", ProductController.deleteProduct);

export default articleRouter;
