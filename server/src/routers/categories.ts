import * as AdminController from "../controllers/AdminController";
import * as CategoryController from "../controllers/CategoryController";
import { catchWrapper } from "../utils/catchWrapper";
import { Router } from "express";
const catRouter: Router = Router();

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
catRouter.delete(
  "/categories/:_id",
  AdminController.isAdmin,
  catchWrapper(CategoryController.deleteCategory),
);

export default catRouter;
