import * as AdminController from "../controllers/AdminController";
import * as UserController from "../controllers/UserController";
import { catchWrapper } from "../utils/catchWrapper";
import { Router } from "express";
const adminRouter: Router = Router();

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
  catchWrapper(AdminController.editAccount),
);
adminRouter.delete(
  "/admin/users/:_id",
  AdminController.isAdmin,
  catchWrapper(UserController.deleteAccount),
);

export default adminRouter;
