import { catchWrapper } from "utils";
import { isAdmin } from "controllers/AdminController";
import { Router } from "express";
import { CategoryController } from "controllers";

const categoriesRouter: Router = Router();

categoriesRouter.delete(
  "/categories/:name",
  isAdmin,
  catchWrapper(CategoryController.deleteCategory),
);
categoriesRouter.get(
  "/categories",
  catchWrapper(CategoryController.getCategories),
);
categoriesRouter.get(
  "/categories/:name",
  catchWrapper(CategoryController.getCategory),
);
categoriesRouter.post(
  "/categories/",
  isAdmin,
  catchWrapper(CategoryController.addCategory),
);
categoriesRouter.put(
  "/categories/:name",
  isAdmin,
  catchWrapper(CategoryController.editCategory),
);

export default categoriesRouter;
