import { catchWrapper } from "../utils";
import { Router } from "express";
import * as AdminController from "../controllers/AdminController";

const adminRouter: Router = Router();

adminRouter.delete(
  "/admin/users/:_id",
  AdminController.isAdmin,
  catchWrapper(AdminController.deleteAccountAsAdmin),
);
adminRouter.get(
  "/admin/users",
  AdminController.isAdmin,
  catchWrapper(AdminController.getUsers),
);
adminRouter.get(
  "/admin/users/:_id",
  AdminController.isAdmin,
  catchWrapper(AdminController.getUser),
);
adminRouter.put(
  "/admin/users/:_id",
  AdminController.isAdmin,
  catchWrapper(AdminController.editAccountAsAdmin),
);

export default adminRouter;
