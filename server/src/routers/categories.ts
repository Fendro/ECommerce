import { catchWrapper } from "../utils";
import { Router } from "express";
import * as AdminController from "../controllers/AdminController";
import * as CategoryController from "../controllers/CategoryController";

const catRouter: Router = Router();

catRouter.delete(
  "/categories/:_id",
  AdminController.isAdmin,
  catchWrapper(CategoryController.deleteCategory),
);
catRouter.get("/categories", catchWrapper(CategoryController.getCategories));
catRouter.get("/categories/:_id", catchWrapper(CategoryController.getCategory));
catRouter.post(
  "/categories/",
  AdminController.isAdmin,
  catchWrapper(CategoryController.addCategory),
);
catRouter.put(
  "/categories/:_id",
  AdminController.isAdmin,
  catchWrapper(CategoryController.editCategory),
);

export default catRouter;
