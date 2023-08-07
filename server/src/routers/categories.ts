import { catchWrapper } from "../utils";
import { isAdmin } from "../controllers/AdminController";
import { Router } from "express";
import * as CategoryController from "../controllers/CategoryController";

const categoriesRouter: Router = Router();

categoriesRouter.delete(
  "/categories/:_id",
  isAdmin,
  catchWrapper(CategoryController.deleteCategory),
);
categoriesRouter.get(
  "/categories",
  catchWrapper(CategoryController.getCategories),
);
categoriesRouter.get(
  "/categories/:_id",
  catchWrapper(CategoryController.getCategory),
);
categoriesRouter.post(
  "/categories/",
  isAdmin,
  catchWrapper(CategoryController.addCategory),
);
categoriesRouter.put(
  "/categories/:_id",
  isAdmin,
  catchWrapper(CategoryController.editCategory),
);

export default categoriesRouter;
