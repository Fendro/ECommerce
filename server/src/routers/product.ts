import { Router } from "express";
import * as ProductController from "../controllers/ProductController";
const prodRouter: Router = Router();

prodRouter.get("/product", ProductController.getProducts);
prodRouter.get("/product/:name", ProductController.getProduct);
prodRouter.post("/product/", ProductController.addProduct);
prodRouter.put("/product/:name", ProductController.editProduct);
prodRouter.delete("/product/:name", ProductController.deleteProduct);

export default prodRouter;
