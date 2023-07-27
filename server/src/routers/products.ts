import { Router } from "express";
import * as ProductController from "../controllers/ProductController";
const prodRouter: Router = Router();

prodRouter.get("/product", ProductController.getProducts);
prodRouter.get("/product/:id", ProductController.getProduct);
prodRouter.post("/product/", ProductController.addProduct);
prodRouter.put("/product/:id", ProductController.editProduct);
prodRouter.delete("/product/:id", ProductController.deleteProduct);

export default prodRouter;
