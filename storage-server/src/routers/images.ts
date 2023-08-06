import { catchWrapper } from "../utils";
import { Router } from "express";
import { upload } from "../services";
import * as CategoryController from "../controllers/ImagesController";

const imagesRouter: Router = Router();

imagesRouter.delete(
  "/images/:_id",
  catchWrapper(CategoryController.deleteImages),
);
imagesRouter.post(
  "/images/:_id",
  catchWrapper(CategoryController.doesArticleExist),
  upload.array("images"),
  catchWrapper(CategoryController.imagesStored),
);
imagesRouter.put("/images/:_id", catchWrapper(CategoryController.editImages));

export default imagesRouter;
