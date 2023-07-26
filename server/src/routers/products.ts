import { Router } from "express";
const prodRouter: Router = Router();

prodRouter.get("/product");
prodRouter.get("/product/:id");

export default prodRouter;
