import { Router } from "express";
import * as ProductController from "../controllers/ProductController";
const prodRouter: Router = Router();

prodRouter.get("/products", ProductController.getProducts);
prodRouter.get("/products/:id", ProductController.getProduct);
prodRouter.post("/products/", ProductController.addProduct);
prodRouter.put("/products/:id", ProductController.editProduct);
prodRouter.delete("/products/:id", ProductController.deleteProduct);

export default prodRouter;
